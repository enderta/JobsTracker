
# Job Tracker
# Description
Job Tracker is a web application aiming to help job-seekers efficiently track their applications.
It provides an intuitive user interface for users to log jobs they've applied for and track their progress.

## Tech Stack

This application is built with the following technologies:

- Backend: Node.js
- Frontend: React.js
- Database: PostgreSQL
- E2E Testing: Cypress

## Getting Started

These instructions will help you set up a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   'git clone <repo_url>'
2. Install NPM packages:
   'npm install'
3. Set up the PostgreSQL database:
    - Create a PostgreSQL database.
4. Create a `.env` file in your root directory and fill it with necessary environment variables.

## Running Locally
After installing all prerequisites and setting up, start the application with npm start.
Navigate to http://localhost:3000 in your web browser to view the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npx cypress open`
The app has been tested by using Cypress End-to-End testing.
I have used BBD to write the tests. The tests are located in the cypress/e2e folder. 
I have written feature files for each of the tests.
I have created step definitions for each of the feature files to run actual test codes.
To run the tests, run the command above. This will open the Cypress Test Runner. Click on the test you want to run and it will open a new window. The test will run in the new window.

### `node index.js`
To run server side of the app which is written by using Node.js and Express.js, run the command above. 
This will run the server side of the app on port 5000.
The server side of the app is used to connect to the database and to get the data from the database.
