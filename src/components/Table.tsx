import React from "react";
import { IncomeStatement } from "../types";

type SortKey = "date" | "revenue" | "netIncome";

interface TableProps {
  data: IncomeStatement[];
  onSort: (key: SortKey) => void;
  sortKey: SortKey;
  sortOrder: "asc" | "desc";
}

const Table: React.FC<TableProps> = ({ data, onSort, sortKey, sortOrder }) => {
  const handleSort = (key: SortKey) => {
    onSort(key);
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey === key) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return "";
  };

  return (
    <table className="w-full border-collapse">
      <thead className="bg-gray-200">
        <tr>
          <th
            className="cursor-pointer p-2 border"
            onClick={() => handleSort("date")}
          >
            Date {getSortIndicator("date")}
          </th>
          <th
            className="cursor-pointer p-2 border"
            onClick={() => handleSort("revenue")}
          >
            Revenue {getSortIndicator("revenue")}
          </th>
          <th
            className="cursor-pointer p-2 border"
            onClick={() => handleSort("netIncome")}
          >
            Net Income {getSortIndicator("netIncome")}
          </th>
          <th className="p-2 border">Gross Profit</th>
          <th className="p-2 border">EPS</th>
          <th className="p-2 border">Operating Income</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-100">
            <td className="p-2 border">{row.date}</td>
            <td className="p-2 border">{row.revenue}</td>
            <td className="p-2 border">{row.netIncome}</td>
            <td className="p-2 border">{row.grossProfit}</td>
            <td className="p-2 border">{row.eps}</td>
            <td className="p-2 border">{row.operatingIncome}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
