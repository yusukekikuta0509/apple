import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import { IncomeStatement } from "./types";

// Define the type for sorting keys
type SortKey = "date" | "revenue" | "netIncome";

// Main application component
const App: React.FC = () => {
  // State to store original data fetched from the API
  const [originalData, setOriginalData] = useState<IncomeStatement[]>([]);
  
  // State to store filtered data based on user input
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);
  
  // State to manage sorting keys and order
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch data from the API when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API using the API key from environment variables
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.REACT_APP_API_KEY}`
        );
        const data = await res.json();

        // Map the API response to match the IncomeStatement type
        const mappedData = data.map((item: any) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));

        // Set the fetched data to both original and filtered data states
        setOriginalData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle changes in filters and update the filtered data state
  const handleFilterChange = (filters: {
    startYear: number | null;
    endYear: number | null;
    revenueMin: number | null;
    revenueMax: number | null;
    netIncomeMin: number | null;
    netIncomeMax: number | null;
  }) => {
    const {
      startYear,
      endYear,
      revenueMin,
      revenueMax,
      netIncomeMin,
      netIncomeMax,
    } = filters;

    let newData = [...originalData];

    // Apply year range filters
    if (startYear !== null) {
      newData = newData.filter((d) => {
        const year = parseInt(d.date.split("-")[0]);
        return year >= startYear;
      });
    }
    if (endYear !== null) {
      newData = newData.filter((d) => {
        const year = parseInt(d.date.split("-")[0]);
        return year <= endYear;
      });
    }

    // Apply revenue range filters
    if (revenueMin !== null) {
      newData = newData.filter((d) => d.revenue >= revenueMin);
    }
    if (revenueMax !== null) {
      newData = newData.filter((d) => d.revenue <= revenueMax);
    }

    // Apply net income range filters
    if (netIncomeMin !== null) {
      newData = newData.filter((d) => d.netIncome >= netIncomeMin);
    }
    if (netIncomeMax !== null) {
      newData = newData.filter((d) => d.netIncome <= netIncomeMax);
    }

    // Update the filtered data state
    setFilteredData(newData);
  };

  // Handle sorting when a column header is clicked
  const handleSort = (key: SortKey) => {
    // Toggle sort order if the same key is clicked
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Apply sorting to the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    let aVal: number | string = a[sortKey];
    let bVal: number | string = b[sortKey];

    if (sortKey === "date") {
      // Sort by date
      const aDate = new Date(aVal).getTime();
      const bDate = new Date(bVal).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    } else {
      // Sort by numeric values
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data Filtering App</h1>

      {/* FilterBar component to handle user input for filters */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Table component to display sorted and filtered data */}
      <Table
        data={sortedData}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default App;
