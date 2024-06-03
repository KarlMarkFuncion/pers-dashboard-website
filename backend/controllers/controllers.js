import mongoose from "mongoose";
import { HeartrateSchema } from "../models/heartrateModel.js";
import { PatientSchema } from "../models/patientModel.js";
import { UserSchema } from "../models/userModel.js";
import { OxidationSchema } from "../models/oxidationModel.js";

// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

import { PatientDataSchema } from "../models/patientData.js";

const app = express();

app.use(bodyParser.json());
 
console.log(process.env.DB_URI );
const client = new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
 
const Heartrate = mongoose.model("Heartrate", HeartrateSchema);
const Oxidation = mongoose.model("Oxidation", OxidationSchema);
const User = mongoose.model("User", UserSchema);
const Patient = mongoose.model("Patient", PatientSchema);
const PatientData = mongoose.model("PatientData", PatientDataSchema, "patient_data");

export const emergencyAlert = (req, res) => {
  const currentTime = new Date().toISOString();
  const redirectUrl = `${process.env.FRONTEND_URL}/alerted_pers?time=${encodeURIComponent(currentTime)}`;
  
  res.redirect(redirectUrl);
}

export const getHeartrateById = (req, res) => { 
  Heartrate.find({ })
    .then((heartrate) => {
      if (heartrate) {
        res.json(heartrate);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// export const getRecentData = async (req, res) => {
//   try {
//     // Query the database to find the most recent 40 documents
//     const recentData = await DataSchema.find().sort({_id: -1}).limit(40);

//     res.status(200).json(recentData);
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching recent data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }; 


export const getRecentData = async (req, res) => {
    try {
        // Fetch the 20 latest items from the DataSchema sorted by descending order of creation date
        // const patientData = await PatientData.find().sort({ createdAt: -1 }).limit(20);
        const patientData = await PatientData.find().sort({ createdAt: -1 }).limit(20);

        // If there is no data found, return a 404 Not Found response
        if (!patientData) {
            return res.status(404).json({ message: 'No data found' });
        }

        // If data is found, return it as a JSON response
        res.status(200).json(patientData);
        // console.log("successful data fetching: ", patientData)
    } catch (error) {
        // If an error occurs, return a 500 Internal Server Error response
        res.status(500).json({ message: 'Server error' });
        console.log(error)
    }
};


export const getOxidationById = (req, res) => { 
    Oxidation.find({})
      .then((oxidation) => {
        if (oxidation) {
          res.json(oxidation);
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  };

export const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

export const getPatientById = (req, res) => {
  const { id } = req.params;
  Patient.findById(id)
    .then((patient) => {
      if (patient) {
        res.json(patient);
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

export const addNewUser = (req, res) => {
  let newUser = new User(req.body);

  newUser
    .save()
    .then((newUser) => {
      res.json(newUser);
    })
    .catch((err) => {
      res.send(err);
    });
};

export const getUserLogin = (req, res) => {
  const { email, password } = req.params;

  console.log(email);
  User.findOne({ email })
    .then((user) => {
      if (user) {
        console.log(user.password);
        console.log(password);
        if (password === user.password) {
          const userData = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePhoto: user.profilePhoto,
            bookings: user.bookings,
            createdDate: user.createdDate,
          };
          res.json(userData);
          console.log("Successful login");
        } else {
          console.log("incorrect password");
          res.status(401).json({ message: "Incorrect Password" });
        }
      } else {
        console.log("user not found");
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

export const sensorPayloadProcess = async (req, res) => {
  try {
    // Check if sensorData exists in the request body
    if (!req.body.heartbeat || !req.body.oxidation || !req.body.latitude || !req.body.longitude || !req.body.temperature) {
      console.error('Incomplete sensor data provided');
      return res.status(400).send('Bad Request: Incomplete sensor data provided');
    }

    // Extract sensor data from the request body
    const { heartbeat, oxidation, latitude, longitude, temperature } = req.body;

    // Generate the current timestamp
    const createdAt = new Date();

    // Connect to the database
    await client.connect();

    // Insert the sensor data into the database
    const db = client.db('test');
    const collection = db.collection('patient_data');
    await collection.insertOne({ heartbeat, oxidation, latitude, longitude, temperature, createdAt });

    // Send a success response
    res.status(200).send('Data received and stored');

    // Log the received data
    console.log('Received sensor data:');
    console.log({ heartbeat, oxidation, latitude, longitude, temperature, createdAt });
  } catch (e) {
    // Handle errors
    console.error('Error storing data:', e);
    res.status(500).send('Error storing data');
  } finally {
    // Close the database connection
    await client.close();
  }
};