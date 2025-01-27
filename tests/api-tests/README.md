# Garage Flow API Tests

## Overview

This project contains api tests for Garage Flow. The tests are designed to ensure the functionality and reliability of the application.

## Instructions to Run Tests

- Ensure that you have Node.js and npm installed on your machine.

1. Clone the repository:
   ```sh
   git clone https://github.com/JUKKarol/GarageFlow.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tests/api-tests
   ```
3. Install the required dependencies:
   ```sh
   npm install
   ```
4. Copy `.env.example` file as `.env` in same directory
   ```sh
   cp .env.example .env
   ```
5. In the `.env` file, specify the URL for the site you want to test
   ```
   BASE_URL=https://example.com
   ```
6. Run the tests:
   ```sh
   npx playwright test
   ```

## Checking Results

- HTML Report: After running the tests, an HTML report will be generated in the playwright-report directory. Open playwright-report/index.html to view the detailed test results.
- Trace Viewer: If a test fails, a trace will be recorded and can be viewed in the playwright-report/trace directory.
- Run from terminal:
  ```sh
  npx playwright show-report
  ```
