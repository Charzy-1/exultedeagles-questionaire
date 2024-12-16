type QuestionProps = {
  id: number;
  text: string;
  type: "text" | "radio" | "checkbox";
  options?: string[];
  onChange: (id: number, value: string) => void;
};

const QuestionForm = ({ id, text, type, options, onChange }: QuestionProps) => {
  return (
    <div>
      <label className="block text-lg font-medium">{text}</label>
      {type === "text" && (
        <input
          type="text"
          name={`question-${id}`}
          className="w-full p-2 rounded"
          onChange={(e) => onChange(id, e.target.value)}
        />
      )}
      {type === "radio" &&
        options?.map((option) => (
          <label key={option} className="space-x-4">
            <input
              type="radio"
              name={`question-${id}`}
              value={option}
              onChange={(e) => onChange(id, e.target.value)}
            />
            {option}
          </label>
        ))}
    </div>
  );
};

export default QuestionForm;
