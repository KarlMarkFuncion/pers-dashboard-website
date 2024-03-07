import mongoose from "mongoose";
import { HeartrateSchema } from "../models/heartrateModel";
import { PatientSchema } from "../models/patientModel";
import { UserSchema } from "../models/userModel";
import { OxidationSchema } from "../models/oxidationModel";

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();

app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 
const Heartrate = mongoose.model("Heartrate", HeartrateSchema);
const Oxidation = mongoose.model("Oxidation", OxidationSchema);
const User = mongoose.model("User", UserSchema);
const Patient = mongoose.model("Patient", PatientSchema);

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
    await client.connect();
    const dataPayload = req.body.dataPayload.split(',');
    const validHeartRate = dataPayload[0];
    const validSPO2 = dataPayload[1];
    const lat = dataPayload[2];
    const lng = dataPayload[3];
    const GMD = dataPayload[4];

    const db = client.db('pinoy_pers');
    const collection = db.collection('patient_data');
    await collection.insertOne({ validHeartRate, validSPO2, lat, lng, GMD });

    res.status(200).send('Data received and stored');
    console.log(dataPayload);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error storing data');
  } finally {
    await client.close();
  }
};