import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import routes from './routes/routes.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

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

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error', err));

routes(app);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  socket.on('error', (err) => {
    console.error('Socket.IO error:', err);
  });
});

app.get('/triggerAlert', (req, res) => {
  const currentTime = new Date().toISOString();
  io.emit('alert', { time: currentTime });
  res.send('Alert triggered');
});

import nodemailer from 'nodemailer';

async function sendEmail(mailOptions) {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "your-email@gmail.com", // Your email address
      pass: "your-password", // Your email account password
    },
  });
  
  // Send mail with defined transport object
  try {
    await transporter.sendMail(mailOptions);
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

app.post('/forgot_password', async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body
    if (!email) {
      return res.status(400).send({ message: 'Email is required' }); // Validate email presence
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

    // Assuming you have a function to send emails
    sendEmail(mailOptions);

    res.status(200).send({ message: "Reset link sent to your email. Check your inbox." });
  } catch (error) {
    console.error("Failed to send reset link:", error);
    res.status(500).send({ message: "Failed to send reset link. Please try again later." });
  } 
});

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

app.get('/', (req, res) => {
  res.send(`The app is running at ${PORT}`);
});

server.listen(PORT, () => {
  console.log(`Backend server running at PORT ${PORT}`);
});
