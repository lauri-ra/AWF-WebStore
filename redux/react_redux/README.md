<!-- @format -->

# Instructions

## Starting server backend

The backend for all the exercises is located inside the the directory `backend`
at the root of the repository.

1. Setup/install backend

   - **this stage needs to be performed only once**
   - **you can skip this stage if the backend is already installed**
   - change working directory to `backend`
   - inside `backend` directory run `npm install`

2. Starting the backend server

   - change working directory to `backend`
   - inside `backend` directory run `npm run react-redux`
   - server listens on http://localhost:3001/

3. Stopping the backend server
   - press <`Ctrl-C`> while the server is running

### Resetting database back to its initial state

1. change working directory to `backend`
2. inside `backend` directory run `npm run reset-db`

## Setup the exercise

- change working directory to `react/react_redux`
- run `npm install` to install all dependencies

## Run the exercise

- run `npm run frontend` to run the frontend in port 3000 and run it in watch mode.

## Test

- run `npm test` to run the unit and the e2e tests in watch mode.
- run `npm test <testName>.test.js` to run tests for a specific file in watch mode. Example: to run tests for App.js: `npm test App.test.js`
- run `npm run html-test` to create a html-report of the failed and passed tests, similar to the one created by the grader. 
