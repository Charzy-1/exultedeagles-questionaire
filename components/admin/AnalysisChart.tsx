// components/admin/AnalysisChart.tsx

import axios from "axios";
import React, { useEffect, useState } from "react";

import BarChart from "../Barchart"; // Assuming your BarChart component is in the same folder or adjust the path

const AnalysisChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get("/api/analysis"); // Your API to get the data for the bar chart
        const data = response.data;

        // Transform your data for the chart
        const transformedData = {
          labels: data.labels, // Array of categories or time periods (e.g., months)
          datasets: [
            {
              label: "User Responses", // Customize the label
              data: data.values, // Values to plot (e.g., response counts per category)
              backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar color
              borderColor: "rgba(75, 192, 192, 1)", // Bar border color
              borderWidth: 1, // Width of the bar borders
            },
          ],
        };

        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    };

    fetchAnalysisData();
  }, []);

  return (
    <div>
      <h2>Analysis Chart</h2>
      {chartData ? (
        <BarChart data={chartData} /> // Passing the transformed data to the BarChart component
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default AnalysisChart;
