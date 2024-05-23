import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import routes from './routes/routes.js';

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Error handling middleware should be at the end, after other middleware and routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error', err));

// Routes
routes(app);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('error', (err) => {
    console.error('Socket.IO error:', err);
  });
});

// Trigger alert endpoint
app.get('/triggerAlert', (req, res) => {
  const currentTime = new Date().toISOString();
  io.emit('alert', { time: currentTime });
  res.send('Alert triggered');
});

// Root endpoint
app.get('/', (req, res) => {
  res.send(`The app is running at ${PORT}`);
});

// Start server
server.listen(PORT, () => {
  console.log(`Backend server running at PORT ${PORT}`);
});
