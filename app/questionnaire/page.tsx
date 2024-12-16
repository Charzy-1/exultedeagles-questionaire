"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/constants/questions";

// Define the type for responses state
type Responses = Record<number, string[] | string | undefined>;

const Page = () => {
  const [responses, setResponses] = useState<Responses>({}); // Add typing to responses state
  const [otherResponses, setOtherResponses] = useState<Record<number, string>>(
    {}
  );
  const router = useRouter();

  const handleChange = (id: number, value: string) => {
    // For the first question (id: 1), validate that only English alphabets are allowed
    if (id === 1) {
      // Regex to allow only letters (both lowercase and uppercase)
      const regex = /^[A-Za-z\s]*$/;

      // Only update if value matches the regex
      if (regex.test(value) || value === "") {
        setResponses({ ...responses, [id]: value });
      }
    } else {
      // For other questions, update the responses without additional validation
      setResponses({ ...responses, [id]: value });
    }
  };

  const handleCheckboxChange = (id: number, option: string) => {
    const currentSelections = responses[id] || [];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalResponses = { ...responses };

    Object.keys(otherResponses).forEach((id) => {
      if (responses[parseInt(id)]?.includes("Other (please specify)")) {
        finalResponses[parseInt(id)] = [
          ...responses[parseInt(id)].filter(
            (option) => option !== "Other (please specify)"
          ),
          `Other: ${otherResponses[parseInt(id)]}`,
        ];
      }
    });

    console.log(finalResponses); // Replace with API call
    router.push("/thank-you");
  };

  // Check if all questions have been answered
  const isFormValid = questions.every((question) => {
    const response = responses[question.id];
    if (question.type === "checkbox") {
      return Array.isArray(response) && response.length > 0; // For checkboxes, ensure at least one option is selected
    }
    return response && response !== "";
  });

  return (
    <form className="space-y-4 p-8 lg:p-16 mt-14" onSubmit={handleSubmit}>
      {questions.map((question) => (
        <div key={question.id}>
          <label className="block text-lg font-medium">{question.text}</label>

          {question.type === "text" && (
            <input
              type="text"
              className="w-full border-b-2 border-gray-400 outline-none hover:border-black p-2 rounded"
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
                    } // Disable other options if "Other" is selected
                    onChange={() => handleCheckboxChange(question.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}

              {/* Text box for "Other (please specify)" */}
              {responses[question.id]?.includes("Other (please specify)") && (
                <input
                  type="text"
                  placeholder="Please specify"
                  className="w-full border p-2 rounded mt-2"
                  onChange={(e) =>
                    handleOtherChange(question.id, e.target.value)
                  }
                />
              )}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={!isFormValid} // Disable button if form is invalid
        className={`${
          !isFormValid
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-red-400 to-red-800"
        } text-white px-4 font-bold py-3 rounded hover:bg-yellow-400 hover:text-black hover:bg-none shadow-xl mt-6`}
      >
        Submit
      </button>
    </form>
  );
};

export default Page;
