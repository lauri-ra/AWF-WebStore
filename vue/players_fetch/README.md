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
   - inside `backend` directory run `npm run vue-fetch`
   - server listens on http://localhost:3001/

3. Stopping the backend server
   - press <`Ctrl-C`> while the server is running

### Resetting database back to its initial state

1. change working directory to `backend`
2. inside `backend` directory run `npm run reset-db`

## Setup the exercise

- change working directory to `vue/players_fetch`
- run `npm install` to install all dependencies

## Run the exercise

- run `npm run frontend` to run the frontend in port 5500 and run it in watch mode. You can change the port in the package.json file. (or open [index.html](./index.html) file in a browser to view the app)

## Test

- run `npm run test:unit -- --run` to run the unit tests in non-watch mode.
- run `npm run test:unit` to run the unit tests in watch mode
- run `npm run test:e2e:dev` to run the end to end tests in interactive watch mode.
- run `npm run test:e2e` to run the end to end tests once in a non-interactive mode.
