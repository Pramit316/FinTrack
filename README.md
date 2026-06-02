# FinTrack Frontend

FinTrack is a simple personal finance tracking web application built with Angular. It allows users to record income and expense transactions, view financial summaries, search/filter transactions, and manage recent financial activity through a clean dashboard-style interface.

This repository contains the **frontend application**. The backend is built separately using Spring Boot.

## Features

* Add income and expense transactions
* View total balance, total income, and total expense
* Select transaction type, category, payment method, date, and description
* View recent transactions in a table
* Search and filter transactions
* Delete transactions using the backend API
* Display summary data from the report API

## Tech Stack

* Angular 19
* TypeScript
* SCSS
* Spring Boot REST API backend

## Backend Repository

This frontend connects to the FinTrack Spring Boot backend API.

Backend repository:

```text
https://github.com/Pramit316/FinTrack_API
```

Make sure the backend is running before starting the frontend.

## API Endpoints Used

| Action                | Method | Endpoint                        |
| --------------------- | ------ | ------------------------------- |
| Get all transactions  | GET    | `/api/transactions/getAll`      |
| Add transaction       | POST   | `/api/transactions`             |
| Delete transaction    | DELETE | `/api/transactions/delete/{id}` |
| Get financial summary | GET    | `/api/report/summary`           |
| Filter by type        | GET    | `/api/report/{INCOME\|EXPENSE}` |

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/Pramit316/FinTrack.git
cd fintrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

Start the Spring Boot backend on:

```text
http://localhost:8080
```

The frontend expects the backend API to be available on port `8080`.

### 4. Start the Angular frontend

```bash
npm start
```

or:

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

## API Connection

During local development, the Angular app uses `proxy.conf.json` so that `/api` requests are forwarded to the Spring Boot backend.

For production builds, the API URL is configured in:

```text
src/environments/environment.ts
```

## Build

To build the Angular project, run:

```bash
ng build
```

The compiled output will be generated inside the `dist/` folder.

## Current Status

The frontend is connected to the Spring Boot backend for transaction management, summary reports, filtering, and delete operations. Local storage is no longer used for transaction data.

## Future Improvements

* Edit transaction feature
* Monthly report UI
* Charts and visual reports
* User authentication
* Better error handling and loading states

## Author

Pramit

## License

This project is created for learning purposes.
