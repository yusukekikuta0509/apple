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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th
              className={`cursor-pointer p-2 border ${
                sortKey === "date" ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSort("date")}
              onKeyDown={(e) => e.key === "Enter" && handleSort("date")}
              tabIndex={0}
            >
              Date {getSortIndicator("date")}
            </th>
            <th
              className={`cursor-pointer p-2 border ${
                sortKey === "revenue" ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSort("revenue")}
              onKeyDown={(e) => e.key === "Enter" && handleSort("revenue")}
              tabIndex={0}
            >
              Revenue {getSortIndicator("revenue")}
            </th>
            <th
              className={`cursor-pointer p-2 border ${
                sortKey === "netIncome" ? "bg-blue-100" : ""
              }`}
              onClick={() => handleSort("netIncome")}
              onKeyDown={(e) => e.key === "Enter" && handleSort("netIncome")}
              tabIndex={0}
            >
              Net Income {getSortIndicator("netIncome")}
            </th>
            <th className="p-2 border">Gross Profit</th>
            <th className="p-2 border">EPS</th>
            <th className="p-2 border">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center">
                No data available.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                <td className="p-2 border">{row.date}</td>
                <td className="p-2 border">
                  {new Intl.NumberFormat().format(row.revenue)}
                </td>
                <td className="p-2 border">
                  {new Intl.NumberFormat().format(row.netIncome)}
                </td>
                <td className="p-2 border">
                  {new Intl.NumberFormat().format(row.grossProfit)}
                </td>
                <td className="p-2 border">{row.eps}</td>
                <td className="p-2 border">
                  {new Intl.NumberFormat().format(row.operatingIncome)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
