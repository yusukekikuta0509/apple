import React, { useState } from "react";
import axios from "axios";

interface FilterBarProps {
  // Callback function to handle data fetched from the backend
  onDataFetched: (data: { [key: string]: any }[]) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onDataFetched }) => {
  // State variables to store filter values
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [revenueMin, setRevenueMin] = useState<number | null>(null);
  const [revenueMax, setRevenueMax] = useState<number | null>(null);
  const [netIncomeMin, setNetIncomeMin] = useState<number | null>(null);
  const [netIncomeMax, setNetIncomeMax] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle form submission and fetch filtered data
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}`, {
        params: {
          start_year: startYear,
          end_year: endYear,
          revenue_min: revenueMin,
          revenue_max: revenueMax,
          net_income_min: netIncomeMin,
          net_income_max: netIncomeMax,
        },
      });
      onDataFetched(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="startYear" className="block text-sm">
            Start Year
          </label>
          <input
            id="startYear"
            type="number"
            placeholder="e.g. 2020"
            value={startYear ?? ""}
            onChange={(e) => setStartYear(e.target.value ? +e.target.value : null)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="endYear" className="block text-sm">
            End Year
          </label>
          <input
            id="endYear"
            type="number"
            placeholder="e.g. 2024"
            value={endYear ?? ""}
            onChange={(e) => setEndYear(e.target.value ? +e.target.value : null)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="revenueMin" className="block text-sm">
            Revenue Min
          </label>
          <input
            id="revenueMin"
            type="number"
            placeholder="e.g. 50000000"
            value={revenueMin ?? ""}
            onChange={(e) => setRevenueMin(e.target.value ? +e.target.value : null)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="revenueMax" className="block text-sm">
            Revenue Max
          </label>
          <input
            id="revenueMax"
            type="number"
            placeholder="e.g. 100000000"
            value={revenueMax ?? ""}
            onChange={(e) => setRevenueMax(e.target.value ? +e.target.value : null)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="netIncomeMin" className="block text-sm">
            Net Income Min
          </label>
          <input
            id="netIncomeMin"
            type="number"
            placeholder="e.g. 10000000"
            value={netIncomeMin ?? ""}
            onChange={(e) => setNetIncomeMin(e.target.value ? +e.target.value : null)}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div>
          <label htmlFor="netIncomeMax" className="block text-sm">
            Net Income Max
          </label>
          <input
            id="netIncomeMax"
            type="number"
            placeholder="e.g. 50000000"
            value={netIncomeMax ?? ""}
            onChange={(e) => setNetIncomeMax(e.target.value ? +e.target.value : null)}
            className="border p-2 rounded-md w-full"
          />
        </div>
      </div>
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
