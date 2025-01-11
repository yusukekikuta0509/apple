import React, { useEffect, useState } from "react";
import FilterBar from "./components/FilterBar";
import Table from "./components/Table";
import { IncomeStatement } from "./types";

type SortKey = "date" | "revenue" | "netIncome";

const App: React.FC = () => {
  const [originalData, setOriginalData] = useState<IncomeStatement[]>([]);
  const [filteredData, setFilteredData] = useState<IncomeStatement[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${import.meta.env.VITE_API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();

        const mappedData = data.map((item: any) => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          eps: item.eps,
          operatingIncome: item.operatingIncome,
        }));

        setOriginalData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        alert("Failed to load financial data. Please try again later.");
      }
    };

    fetchData();
  }, []);

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

    if (revenueMin !== null) {
      newData = newData.filter((d) => d.revenue >= revenueMin);
    }
    if (revenueMax !== null) {
      newData = newData.filter((d) => d.revenue <= revenueMax);
    }

    if (netIncomeMin !== null) {
      newData = newData.filter((d) => d.netIncome >= netIncomeMin);
    }
    if (netIncomeMax !== null) {
      newData = newData.filter((d) => d.netIncome <= netIncomeMax);
    }

    setFilteredData(newData);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    let aVal: number | string = a[sortKey];
    let bVal: number | string = b[sortKey];

    if (sortKey === "date") {
      const aDate = new Date(aVal).getTime();
      const bDate = new Date(bVal).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    } else {
      const aNum = Number(aVal);
      const bNum = Number(bVal);
      return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Data Filtering App</h1>
      <FilterBar onFilterChange={handleFilterChange} />
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