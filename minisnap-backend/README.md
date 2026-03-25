# MiniSnap Backend

Node.js + Express backend for MiniSnap.

## Features
- JWT Authentication (register/login)
- SQLite database with Sequelize ORM
- Post and view stories with image uploads
- Send and receive messages between users

## Setup

1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in the values
4. Run `node server.js`

## Expose with Ngrok
Run `ngrok http 5000` and copy the URL into the frontend `.env` as `VITE_API_URL`