"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { questions } from "@/constants/questions";

type Responses = Record<number, string[] | string | undefined>;

const Page = () => {
  const [responses, setResponses] = useState<Responses>({});
  const [otherResponses, setOtherResponses] = useState<Record<number, string>>(
    {}
  );
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
  const [hasIPSubmitted, setHasIPSubmitted] = useState(false); // Track if IP has submitted
  const router = useRouter();

  useEffect(() => {
    // Check if the submission flag exists in localStorage
    const hasSubmitted = localStorage.getItem("hasSubmitted");

    if (hasSubmitted) {
      setHasIPSubmitted(true); // Set state if the user has submitted already
      router.push("/response-submitted"); // Redirect to thank-you page
    }
  }, [router]);

  const handleChange = (id: number, value: string) => {
    setResponses({ ...responses, [id]: value });
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
        body: JSON.stringify(finalResponses),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }

      // Save the submission flag in localStorage
      localStorage.setItem("hasSubmitted", "true");

      setFormSubmitted(true);
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

    if (question.type === "dropdown" || question.type === "radio") {
      return typeof response === "string" && response.trim() !== "";
    }

    return response && response !== "";
  });

  // Render a message if IP has already submitted
  if (hasIPSubmitted) {
    return (
      <div>You have already submitted your feedback from this device.</div>
    );
  }

  return (
    <form className="mt-14 space-y-4 p-8 lg:p-16" onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id}>
          <label className="mb-4 block text-lg font-bold text-red-500">
            {question.text}
          </label>

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
              name={`question-${question.id}`}
              className="w-full rounded border-b-2 border-gray-400 p-2 outline-none hover:border-black"
              onChange={(e) => handleChange(question.id, e.target.value)}
            >
              <option value="">Select an option</option>
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
        className={`${!isFormValid ? "cursor-not-allowed bg-gray-400" : "bg-gradient-to-r from-red-400 to-red-800"} mt-6 rounded px-4 py-3 font-bold text-white shadow-xl hover:bg-yellow-400 hover:bg-none hover:text-black`}
      >
        Submit
      </button>
    </form>
  );
};

export default Page;
