// components/admin/responsesList.tsx

import axios from "axios";
import React, { useEffect, useState } from "react";

import { Response } from "../../types"; // Assuming you have a type for Response

const ResponsesList: React.FC = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.get("/api/responses"); // Your API route to fetch responses
        setResponses(response.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  if (loading) {
    return <div>Loading responses...</div>;
  }

  return (
    <div>
      <h2>User Responses</h2>
      <ul>
        {responses.map((response) => (
          <li key={response._id}>
            <p>User: {response.user}</p>
            <p>Feedback: {response.feedback}</p>
            {/* Add other fields as per your Response schema */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponsesList;
