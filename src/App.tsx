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
    // API からデータを取得
    // https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<YOUR_API_KEY>
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<YOUR_API_KEY>`
        );
        const data = await res.json();

        // APIのレスポンスで必要なキーが少し違う場合は適宜マッピングしてください
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
      }
    };

    fetchData();
  }, []);

  // フィルタ処理
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

    // 日付レンジフィルタ(年単位)
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

    // Revenue フィルタ
    if (revenueMin !== null) {
      newData = newData.filter((d) => d.revenue >= revenueMin);
    }
    if (revenueMax !== null) {
      newData = newData.filter((d) => d.revenue <= revenueMax);
    }

    // NetIncome フィルタ
    if (netIncomeMin !== null) {
      newData = newData.filter((d) => d.netIncome >= netIncomeMin);
    }
    if (netIncomeMax !== null) {
      newData = newData.filter((d) => d.netIncome <= netIncomeMax);
    }

    setFilteredData(newData);
  };

  // ソート処理
  const handleSort = (key: SortKey) => {
    // 同じキーをクリックしたら昇順⇔降順を切り替え
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // ソート適用
  const sortedData = [...filteredData].sort((a, b) => {
    let aVal: number | string = a[sortKey];
    let bVal: number | string = b[sortKey];

    if (sortKey === "date") {
      // 日付ソートは文字列比較より年・月・日などに変換した方が正確
      // 年だけで十分という場合は parseInt(a.date.split("-")[0]) などでOK
      const aDate = new Date(aVal).getTime();
      const bDate = new Date(bVal).getTime();
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    } else {
      // revenue, netIncome は数値比較
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
