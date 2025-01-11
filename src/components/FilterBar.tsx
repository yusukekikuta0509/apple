import React, { useState } from "react";
import axios from "axios";

interface FilterBarProps {
  // Callback function to handle data fetched from the backend
  onDataFetched: (data: any[]) => void; 
}

const FilterBar: React.FC<FilterBarProps> = ({ onDataFetched }) => {
  // State variables to store filter values
  const [startYear, setStartYear] = useState<number | null>(null); // Start year filter
  const [endYear, setEndYear] = useState<number | null>(null); // End year filter
  const [revenueMin, setRevenueMin] = useState<number | null>(null); // Minimum revenue filter
  const [revenueMax, setRevenueMax] = useState<number | null>(null); // Maximum revenue filter
  const [netIncomeMin, setNetIncomeMin] = useState<number | null>(null); // Minimum net income filter
  const [netIncomeMax, setNetIncomeMax] = useState<number | null>(null); // Maximum net income filter
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state for button disable and feedback

  // Function to handle form submission and fetch filtered data
  const handleSubmit = async () => {
    setIsSubmitting(true); // Disable the button during the request
    try {
      // Send GET request to the backend with filter parameters
      const response = await axios.get("https://apple-nm3m.onrender.com", {
        params: {
          start_year: startYear,
          end_year: endYear,
          revenue_min: revenueMin,
          revenue_max: revenueMax,
          net_income_min: netIncomeMin,
          net_income_max: netIncomeMax,
        },
      });
      // Pass the fetched data to the parent component
      onDataFetched(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors during the request
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request completes
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md mb-4">
      {/* Grid layout for filter inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Start Year Filter */}
        <div>
          <label htmlFor="startYear" className="block text-sm">
            Start Year
          </label>
          <input
            id="startYear"
            type="number"
            placeholder="e.g. 2020"
            value={startYear ?? ""}
            onChange={(e) =>
              setStartYear(e.target.value ? +e.target.value : null)
            }
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* End Year Filter */}
        <div>
          <label htmlFor="endYear" className="block text-sm">
            End Year
          </label>
          <input
            id="endYear"
            type="number"
            placeholder="e.g. 2024"
            value={endYear ?? ""}
            onChange={(e) =>
              setEndYear(e.target.value ? +e.target.value : null)
            }
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Minimum Revenue Filter */}
        <div>
          <label htmlFor="revenueMin" className="block text-sm">
            Revenue Min
          </label>
          <input
            id="revenueMin"
            type="number"
            placeholder="e.g. 50000000"
            value={revenueMin ?? ""}
            onChange={(e) =>
              setRevenueMin(e.target.value ? +e.target.value : null)
            }
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Maximum Revenue Filter */}
        <div>
          <label htmlFor="revenueMax" className="block text-sm">
            Revenue Max
          </label>
          <input
            id="revenueMax"
            type="number"
            placeholder="e.g. 100000000"
            value={revenueMax ?? ""}
            onChange={(e) =>
              setRevenueMax(e.target.value ? +e.target.value : null)
            }
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Minimum Net Income Filter */}
        <div>
          <label htmlFor="netIncomeMin" className="block text-sm">
            Net Income Min
          </label>
          <input
            id="netIncomeMin"
            type="number"
            placeholder="e.g. 10000000"
            value={netIncomeMin ?? ""}
            onChange={(e) =>
              setNetIncomeMin(e.target.value ? +e.target.value : null)
            }
            className="border p-2 rounded-md w-full"
          />
        </div>

        {/* Maximum Net Income Filter */}
        <div>
          <label htmlFor="netIncomeMax" className="block text-sm">
            Net Income Max
          </label>
          <input
            id="netIncomeMax"
            type="number"
            placeholder="e.g. 50000000"
            value={netIncomeMax ?? ""}
            onChange={(e) =>
              setNetIncomeMax(e.target.value ? +e.target.value : null)
            }
            className="border p-2 rounded-md w-full"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`${
          isSubmitting ? "bg-gray-500" : "bg-blue-500"
        } text-white px-4 py-2 rounded-md mt-4`}
      >
        {isSubmitting ? "Filtering..." : "Filter"}
      </button>
    </div>
  );
};

export default FilterBar;
