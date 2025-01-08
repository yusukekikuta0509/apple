import React, { useState } from "react";

interface FilterBarProps {
  onFilterChange: (filters: {
    startYear: number | null;
    endYear: number | null;
    revenueMin: number | null;
    revenueMax: number | null;
    netIncomeMin: number | null;
    netIncomeMax: number | null;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [revenueMin, setRevenueMin] = useState<number | null>(null);
  const [revenueMax, setRevenueMax] = useState<number | null>(null);
  const [netIncomeMin, setNetIncomeMin] = useState<number | null>(null);
  const [netIncomeMax, setNetIncomeMax] = useState<number | null>(null);

  const handleSubmit = () => {
    onFilterChange({
      startYear,
      endYear,
      revenueMin,
      revenueMax,
      netIncomeMin,
      netIncomeMax,
    });
  };

  return (
    <div className="p-4 flex flex-wrap gap-4 bg-gray-100 rounded-md mb-4">
      <div>
        <label className="block text-sm">Start Year</label>
        <input
          type="number"
          placeholder="e.g. 2020"
          value={startYear ?? ""}
          onChange={(e) => setStartYear(e.target.value ? +e.target.value : null)}
          className="border p-1"
        />
      </div>

      <div>
        <label className="block text-sm">End Year</label>
        <input
          type="number"
          placeholder="e.g. 2024"
          value={endYear ?? ""}
          onChange={(e) => setEndYear(e.target.value ? +e.target.value : null)}
          className="border p-1"
        />
      </div>

      <div>
        <label className="block text-sm">Revenue Min</label>
        <input
          type="number"
          placeholder="e.g. 50000000"
          value={revenueMin ?? ""}
          onChange={(e) =>
            setRevenueMin(e.target.value ? +e.target.value : null)
          }
          className="border p-1"
        />
      </div>

      <div>
        <label className="block text-sm">Revenue Max</label>
        <input
          type="number"
          placeholder="e.g. 100000000"
          value={revenueMax ?? ""}
          onChange={(e) =>
            setRevenueMax(e.target.value ? +e.target.value : null)
          }
          className="border p-1"
        />
      </div>

      <div>
        <label className="block text-sm">Net Income Min</label>
        <input
          type="number"
          placeholder="e.g. 10000000"
          value={netIncomeMin ?? ""}
          onChange={(e) =>
            setNetIncomeMin(e.target.value ? +e.target.value : null)
          }
          className="border p-1"
        />
      </div>

      <div>
        <label className="block text-sm">Net Income Max</label>
        <input
          type="number"
          placeholder="e.g. 50000000"
          value={netIncomeMax ?? ""}
          onChange={(e) =>
            setNetIncomeMax(e.target.value ? +e.target.value : null)
          }
          className="border p-1"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-1 rounded-md ml-4"
      >
        Filter
      </button>
    </div>
  );
};

export default FilterBar;
