"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { id: 1, text: "How satisfied are you with our products?", type: "text" },
  {
    id: 2,
    text: "Would you recommend us to others?",
    type: "radio",
    options: ["Yes", "No"],
  },
];

const page = () => {
  const [responses, setResponses] = useState({});
  const router = useRouter();

  const handleChange = (id: number, value: string) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
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
              className="w-full border p-2 rounded"
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
        </div>
      ))}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default page;
