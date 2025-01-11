from fastapi import FastAPI, Query
import requests
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
import os  # For accessing environment variables

app = FastAPI()

# Add CORS middleware to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://apple-ctb8.vercel.app/"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load API key from environment variables
API_KEY = os.getenv("API_KEY")
API_URL = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"

@app.get("/")
def read_root():
    return {"message": "Welcome to the Financial Data API"}

@app.get("/financial-data")
def get_financial_data(
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    revenue_min: Optional[int] = None,
    revenue_max: Optional[int] = None,
    net_income_min: Optional[int] = None,
    net_income_max: Optional[int] = None,
    sort_key: Optional[str] = None,       # e.g., "date", "revenue", "netIncome"
    sort_order: Optional[str] = "asc",    # "asc" or "desc"
):
    # Fetch data from the external API
    response = requests.get(API_URL)
    data = response.json()

    # Extract required fields and store them in a list
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

    # Apply filters
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

    # Apply sorting
    if sort_key is not None:
        reverse_sort = True if sort_order == "desc" else False
        if sort_key == "date":
            statements.sort(key=lambda x: x["date"], reverse=reverse_sort)
        else:
            statements.sort(key=lambda x: x[sort_key], reverse=reverse_sort)

    return statements
