// Convert require statements to import statements
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/routes.js';

import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 4000;

const app = express();

// Move error handling middleware to the top
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something broke!');
});

mongoose.connect(process.env.DB_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error', err));

app.use(cors());

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

routes(app);

app.get("/", (req, res) => {
 res.send(`The app is running at ${PORT}`);
});

app.listen(PORT, () => {
 console.log(`Backend server running at PORT ${PORT}`);
});



// // import express from "express";
// const express = require('express');

// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import routes from "./routes/routes.js";

// require('dotenv').config();

// const PORT = process.env.PORT || 4000;

// const app = express();

// mongoose.connect(process.env.DB_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
// }).then(() => console.log('Database connected'))
//  .catch(err => console.error('Database connection error', err));

// app.use(cors());

// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// routes(app);

// app.get("/", (req, res) => {
//  res.send(`The app is running at ${PORT}`);
// });

// app.listen(PORT, () => {
//  console.log(`Backend server running at PORT ${PORT}`);
// });

// app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send('Something broke!');
// });

// export default app;

// module.exports = app;
// Use require for CommonJS modules
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const routes = require('./routes/routes');

// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// mongoose.connect(process.env.DB_URI, {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
// }).then(() => console.log('Database connected'))
//  .catch(err => console.error('Database connection error', err));

// // Middleware setup
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));
// app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// // Routes
// routes(app);

// // Error handling middleware
// app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).send('Something broke!');
// });

// // Export the app for Vercel
// module.exports = app;



// {
//     "name": "backend",
//     "version": "1.0.0",
//     "description": "",
//     "main": "index.mjs",
//     "type": "module",
//     "scripts": {
//        "test": "echo \"Error: no test specified\" && exit 1",
//        "start": "node index.mjs"
//     },
//     "engines": {
//        "node": "18.18.0"
//     },
//     "author": "KM",
//     "license": "ISC",
//     "devDependencies": {},
//     "dependencies": {
//        "cors": "^2.8.5",
//        "dotenv": "^16.4.5",
//        "mongodb": "^6.4.0",
//        "node-fetch": "^3.3.2",
//        "babel-cli": "^6.26.0",
//        "babel-preset-env": "^1.7.0",
//        "babel-preset-stage-0": "^6.24.1",
//        "body-parser": "^1.20.2",
//        "express": "^4.18.3",
//        "mongoose": "^7.5.3",
//        "nodemon": "^3.0.1"
//     }
//    }
   