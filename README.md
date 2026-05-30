# Fintrack

A simple finance tracking web application built to manage personal income and expenses. The application allows users to add transactions, view total income, total expense, and current balance, and keep track of recent financial activity in one place.

## Features

- Add income and expense transactions
- View total balance
- View total income and total expense
- Select payment method, category, and transaction type
- Add transaction date and description
- View recent transactions in a table
- Delete transactions via the API
- Summary cards loaded from `/api/report/summary`
- Search and filter (type filter uses the report API)

## Tech Stack

- Angular 19
- Spring Boot REST API (`fintrack_api`)
- TypeScript
- SCSS

## Project Purpose

This project was created as a learning project to improve frontend development skills using Angular. It focuses on form handling, component-based UI development, transaction management, and building a clean dashboard-style user interface.

## How to Run the Project

Clone the repository:

```bash
git clone <your-repository-url>

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## API connection

The frontend talks to these endpoints:

| Action | Method | Endpoint |
|--------|--------|----------|
| List transactions | GET | `/api/transactions/getAll` |
| Add transaction | POST | `/api/transactions` |
| Delete transaction | DELETE | `/api/transactions/delete/{id}` |
| Financial summary | GET | `/api/report/summary` |
| Filter by type | GET | `/api/report/{INCOME\|EXPENSE}` |

### Run locally

1. Start the Spring Boot API on **port 8080**.
2. Enable CORS on the API (example):

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET", "POST", "DELETE", "OPTIONS");
    }
}
```

3. Start Angular (uses `proxy.conf.json` so `/api` calls are forwarded in dev):

```bash
npm start
```

Open `http://localhost:4200/`.

Production builds call `http://localhost:8080` directly (see `src/environments/environment.ts`).

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Current Status

Frontend is connected to the Spring Boot API for transactions, summary reports, and delete. Local storage is no longer used for transaction data.

Future improvements: edit transactions, monthly report UI, charts, authentication.
Author

Pramit

License

This project is for learning purposes.
