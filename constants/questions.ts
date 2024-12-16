export const questions = [
  { id: 1, text: "What branch is your survey from?", type: "text" },
  {
    id: 2,
    text: "Was the feedback on product knowledge, quotation and overall sales within the hour?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 3,
    text: "We are delighted to hear your experience was great. Which aspect of our service stood out the most to you? (Select all that apply)",
    type: "checkbox",
    options: [
      "Timeliness of service",
      "Customer support",
      "Pricing",
      "Product quality",
      "An organised and tidy environment",
      "Good staff attitude",
      "Good communication skill",
      "Short queying time",
      "Issues solved effectively",
      "Other (please specify)",
    ],
  },
  {
    id: 4,
    text: "How would you rate your overall experience with Exulted Eagles technical services?",
    type: "radio",
    options: ["Excellent", "Good", "Average", "Poor"],
  },
];
