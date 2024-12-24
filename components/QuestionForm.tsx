type QuestionProps = {
  id: number;
  text: string;
  type: "text" | "radio" | "checkbox" | "dropdown"; // Added "dropdown" type.
  options?: string[]; // Options for radio, checkbox, or dropdown questions.
  onChange: (id: number, value: string) => void;
};

const QuestionForm = ({ id, text, type, options, onChange }: QuestionProps) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-lg font-medium">{text}</label>
      {type === "text" && (
        <input
          type="text"
          name={`question-${id}`}
          className="w-full rounded border p-2"
          onChange={(e) => onChange(id, e.target.value)}
        />
      )}
      {type === "radio" &&
        options?.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${id}`}
              value={option}
              onChange={(e) => onChange(id, e.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      {type === "dropdown" && (
        <select
          name={`question-${id}`}
          className="w-full rounded border p-2"
          onChange={(e) => onChange(id, e.target.value)}
        >
          <option value="">Select an option</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default QuestionForm;
