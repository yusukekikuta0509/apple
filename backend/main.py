# backend/main.py (FastAPIの例)
from fastapi import FastAPI, Query
import requests
from typing import Optional

app = FastAPI()

API_KEY = "<YOUR_API_KEY>"
API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"

@app.get("/financial-data")
def get_financial_data(
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    revenue_min: Optional[int] = None,
    revenue_max: Optional[int] = None,
    net_income_min: Optional[int] = None,
    net_income_max: Optional[int] = None,
    sort_key: Optional[str] = None,       # "date", "revenue", "netIncome"など
    sort_order: Optional[str] = "asc",    # "asc" or "desc"
):
    # APIからデータ取得
    response = requests.get(API_URL)
    data = response.json()

    # 必要な項目を抽出してリストに格納
    statements = []
    for item in data:
        statements.append({
            "date": item["date"],
            "revenue": item["revenue"],
            "netIncome": item["netIncome"],
            "grossProfit": item["grossProfit"],
            "eps": item["eps"],
            "operatingIncome": item["operatingIncome"],
        })

    # フィルタ (サンプル)
    if start_year is not None:
        statements = [
            s for s in statements
            if int(s["date"].split("-")[0]) >= start_year
        ]
    if end_year is not None:
        statements = [
            s for s in statements
            if int(s["date"].split("-")[0]) <= end_year
        ]
    if revenue_min is not None:
        statements = [
            s for s in statements
            if s["revenue"] >= revenue_min
        ]
    if revenue_max is not None:
        statements = [
            s for s in statements
            if s["revenue"] <= revenue_max
        ]
    if net_income_min is not None:
        statements = [
            s for s in statements
            if s["netIncome"] >= net_income_min
        ]
    if net_income_max is not None:
        statements = [
            s for s in statements
            if s["netIncome"] <= net_income_max
        ]

    # ソート
    if sort_key is not None:
        reverse_sort = True if sort_order == "desc" else False
        if sort_key == "date":
            statements.sort(key=lambda x: x["date"], reverse=reverse_sort)
        else:
            statements.sort(key=lambda x: x[sort_key], reverse=reverse_sort)

    return statements
