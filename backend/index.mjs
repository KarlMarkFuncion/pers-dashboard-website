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

// Add this inside your server.js or a separate routes file
import crypto from 'crypto';
import jwt from 'jsonwebtoken';


app.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  // Generate a token
  const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: '15m' });

  // TODO: Store the token somewhere temporarily associated with the user's email

  // Send email with reset link
  const mailOptions = {
    from: '"Pinoy_Pers <noreply@yourapp.com>',
    to: email,
    subject: 'Password Reset',
    html: `
      <p>You requested a password reset.</p>
      <p>Please click the following link:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset Password</a>
    `,
  };

  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/forgot_password`, {
      email: emailRef.current.value,
    });
  
    console.log("Response Status:", response.status); // Log the response status
    console.log("Response Data:", response.data); // Log the response data
  
    alert("Reset link sent to your email. Check your inbox.");
    navigate("/login"); // Redirect back to login page
  } catch (error) {
    console.error("Failed to send reset link:", error);
    alert("Failed to send reset link. Please try again later.");
  }
  
});


// Add this inside your server.js or a separate routes file
app.get('/reset_password', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.id;

    // TODO: Validate the token and retrieve the user's email

    // Allow the user to set a new password
    res.status(200).send({ message: 'Please check your email for further instructions.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Invalid or expired token.' });
  }
});


// Root endpoint
app.get('/', (req, res) => {
  res.send(`The app is running at ${PORT}`);
});

// Start server
server.listen(PORT, () => {
  console.log(`Backend server running at PORT ${PORT}`);
});
