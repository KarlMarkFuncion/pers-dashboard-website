// // import express from "express";
// const express = require('express');

// import mongoose from "mongoose";
// import bodyParser from "body-parser";
// import cors from "cors";
// import routes from "./routes/routes";

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

// // export default app;

// module.exports = app;
// Use require for CommonJS modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');

require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
}).then(() => console.log('Database connected'))
 .catch(err => console.error('Database connection error', err));

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Routes
routes(app);

// Error handling middleware
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something broke!');
});

// Export the app for Vercel
module.exports = app;
