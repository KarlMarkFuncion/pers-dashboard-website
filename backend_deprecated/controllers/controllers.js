import mongoose from "mongoose";
import { HeartrateSchema } from "../models/heartrateModel";
import { PatientSchema } from "../models/patientModel";
import { UserSchema } from "../models/userModel";
import { OxidationSchema } from "../oxidationModel";

const Heartrate = mongoose.model("Heartrate", HeartrateSchema);
const Oxidation = mongoose.model("Oxidation", OxidationSchema);
const User = mongoose.model("User", UserSchema);
const Patient = mongoose.model("Patient", PatientSchema);

export const getHeartrateById = (req, res) => {
  const { id } = req.params;
  Heartrate.findById(id)
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
    const { id } = req.params;
    Oxidation.findById(id)
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