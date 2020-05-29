This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [ExpressJS](https://expressjs.com/).

## Running the project

### 1. Install dependencies

You'll need to install dependencies for both the frontend and the backend. For this, navigate to your project directory from the command line and type the following:

```bash
cd ./frontend
npm install
cd ../backend
npm install
```

In other words, enter both the `frontend` and `backend` directories and install the dependencies.

### 2. Fire up the backend

Add a `.env` file to your `backend` directory and populate with the MongoDB connection string (request over the bootcamp Slack).

Then, from the `backend` directory, run the following:

```bash
npm run dev
```

This should start the node process on `http://localhost:3001`. We are also using the `nodemon` package, which triggers the backend to restart whenever you save changes to backend files.
To run without live reloading, just run `npm start`.

### 3. Fire up the frontend

Just navigate to the `frontend` directory and run:

```bash
npm start
```

This will start the ReactJS frontend on `http://localhost:3000`.
The page will reload if you make edits. You will also see any lint errors in the console.

