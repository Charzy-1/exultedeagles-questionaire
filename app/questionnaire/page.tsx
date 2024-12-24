"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { questions } from "@/constants/questions";

type Responses = Record<number, string[] | string | undefined>;

const Page = () => {
  const [responses, setResponses] = useState<Responses>({});
  const [otherResponses, setOtherResponses] = useState<Record<number, string>>(
    {}
  );
  const router = useRouter();

  const handleChange = (id: number, value: string) => {
    if (id === 1) {
      const regex = /^[A-Za-z\s]*$/;
      if (regex.test(value) || value === "") {
        setResponses({ ...responses, [id]: value });
      }
    } else {
      setResponses({ ...responses, [id]: value });
    }
  };

  const handleCheckboxChange = (id: number, option: string) => {
    const currentSelections = Array.isArray(responses[id])
      ? (responses[id] as string[])
      : [];

    if (option === "Other (please specify)") {
      const updatedSelections = currentSelections.includes(option)
        ? []
        : [option];
      setResponses({ ...responses, [id]: updatedSelections });
    } else {
      const updatedSelections = currentSelections.includes(option)
        ? currentSelections.filter((item) => item !== option)
        : [...currentSelections, option];
      setResponses({ ...responses, [id]: updatedSelections });
    }
  };

  const handleOtherChange = (id: number, value: string) => {
    setOtherResponses({ ...otherResponses, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Include "Other" responses in the final responses
    const finalResponses = { ...responses };
    Object.keys(otherResponses).forEach((id) => {
      if (responses[Number(id)]?.includes("Other (please specify)")) {
        finalResponses[Number(id)] = [
          ...((responses[Number(id)] as string[]) || []),
          otherResponses[Number(id)],
        ];
      }
    });

    try {
      const response = await fetch("/api/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalResponses), // Send the final responses directly
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      // Redirect after successful submission
      router.push("/thank-you");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const isFormValid = questions.every((question) => {
    const response = responses[question.id];
    if (question.type === "checkbox") {
      return Array.isArray(response) && response.length > 0;
    }
    return response && response !== "";
  });

  return (
    <form className="mt-14 space-y-4 p-8 lg:p-16" onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id}>
          <label className="block text-lg font-medium">{question.text}</label>

          {question.type === "text" && (
            <input
              type="text"
              className="w-full rounded border-b-2 border-gray-400 p-2 outline-none hover:border-black"
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
          )}

          {question.type === "radio" && (
            <div className="space-x-4">
              {question.options?.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {question.type === "checkbox" && (
            <div className="space-y-2">
              {question.options?.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={`question-${question.id}`}
                    value={option}
                    disabled={
                      responses[question.id]?.includes(
                        "Other (please specify)"
                      ) && option !== "Other (please specify)"
                    }
                    onChange={() => handleCheckboxChange(question.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
              {responses[question.id]?.includes("Other (please specify)") && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="mt-2 w-full rounded border p-2"
                  onChange={(e) =>
                    handleOtherChange(question.id, e.target.value)
                  }
                />
              )}
            </div>
          )}

          {question.type === "dropdown" && (
            <select
              className="w-full rounded border p-2"
              onChange={(e) => handleChange(question.id, e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              {question.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={!isFormValid}
        className={`${
          !isFormValid
            ? "cursor-not-allowed bg-gray-400"
            : "bg-gradient-to-r from-red-400 to-red-800"
        } mt-6 rounded px-4 py-3 font-bold text-white shadow-xl hover:bg-yellow-400 hover:bg-none hover:text-black`}
      >
        Submit
      </button>
    </form>
  );
};

export default Page;
