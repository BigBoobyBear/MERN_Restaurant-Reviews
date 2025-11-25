# MERN Restaurant Reviews

A full-stack web application for restaurant reviews built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
MERN_Restaurant-Reviews/
├── backend/          # Express + MongoDB API server
└── frontend/         # React client application
```

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- CORS
- dotenv

### Frontend
- React 18
- React Router DOM
- Bootstrap 4
- React Scripts

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with your configuration:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on http://localhost:5000 (or your specified PORT)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Available Scripts

### Backend
- `npm start` - Start the server with nodemon (auto-reload on changes)
- `npm test` - Run tests

### Frontend
- `npm start` - Start the development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Features

- Browse restaurants
- View restaurant details
- Submit and read reviews
- Rate restaurants

## Development

The application uses nodemon for backend development, which automatically restarts the server when file changes are detected.
