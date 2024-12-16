"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/constants/questions";

const Page = () => {
  const [responses, setResponses] = useState({});
  const router = useRouter();

  const handleChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleCheckboxChange = (id, option) => {
    const currentSelections = responses[id] || [];
    const updatedSelections = currentSelections.includes(option)
      ? currentSelections.filter((item) => item !== option)
      : [...currentSelections, option];
    setResponses({ ...responses, [id]: updatedSelections });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(responses); // Replace with API call
    router.push("/thank-you");
  };

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
                    onChange={() => handleCheckboxChange(question.id, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="bg-gradient-to-r from-red-400 to-red-800 text-white px-4 font-bold py-3 rounded hover:bg-yellow-400 hover:text-black hover:bg-none shadow-xl mt-6"
      >
        Submit
      </button>
    </form>
  );
};

export default Page;
