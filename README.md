# Financial Data Filtering App

A web application to filter, sort, and display Apple's financial data fetched from an external API.  
This project demonstrates the use of React for the frontend, FastAPI for the backend, and integration of a financial data API.

---

## Features

- Fetches financial data for Apple Inc. from [Financial Modeling Prep API](https://financialmodelingprep.com/).
- Allows users to filter data by:
  - Date range (start year, end year).
  - Revenue range.
  - Net income range.
- Sorts data by:
  - Date.
  - Revenue.
  - Net income.
- Displays data in a responsive table.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed (for frontend).
- Python and pip installed (for backend).

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
2. Install dependencies:
   ```bash
   npm install
3. create a .env file in the frontend directory with your API key:
   ```bash
   REACT_APP_API_KEY=your_api_key_here
4. Start the development server:
   ```bash
   npm start

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2.install dependencies:
   ```bash
   pip install -r requirements.txt
  ```
3.create a .env file in the backend directory with your API key:
   ```bash
   API_KEY=your_api_key_here
   ```
4.Start the backend server:
   ```bash
   python main.py
   ```
   ---
## Access the App
- Frontend: 
- Backend:

## Usage
- Open the app in your browser.
- Use the filters and sorting options to explore Apple's financial data.
- Click the Fillter button to view the filtered data.
- Click on the column headers in the table to sort data

## Technology stack
- Frontend: React, TaliWindCSS
- Backend: FastAPI
- API: Financial Modeling Prep API

## LIsence
This project is licensed under the MIT License.


