export interface IncomeStatement {
    date: string;                
    revenue: number;             
    netIncome: number;          
    grossProfit: number;         
    eps: number;                 
    operatingIncome: number;     
    
  }
  export interface FilterBarProps {
    onFilterChange: (filters: {
      startYear: number | null;
      endYear: number | null;
      revenueMin: number | null;
      revenueMax: number | null;
      netIncomeMin: number | null;
      netIncomeMax: number | null;
    }) => void;
  }
  