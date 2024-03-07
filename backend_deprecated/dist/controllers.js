"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserLogin = exports.getUserById = exports.getPatientById = exports.getOxidationById = exports.getHeartrateById = exports.addNewUser = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _heartrateModel = require("../models/heartrateModel");
var _patientModel = require("../models/patientModel");
var _userModel = require("../models/userModel");
var _oxidationModel = require("../oxidationModel");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var Heartrate = _mongoose["default"].model("Heartrate", _heartrateModel.HeartrateSchema);
var Oxidation = _mongoose["default"].model("Oxidation", _oxidationModel.OxidationSchema);
var User = _mongoose["default"].model("User", _userModel.UserSchema);
var Patient = _mongoose["default"].model("Patient", _patientModel.PatientSchema);
var getHeartrateById = exports.getHeartrateById = function getHeartrateById(req, res) {
  var id = req.params.id;
  Heartrate.findById(id).then(function (heartrate) {
    if (heartrate) {
      res.json(heartrate);
    } else {
      res.status(404).json({
        message: "Data not found"
      });
    }
  })["catch"](function (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  });
};
var getOxidationById = exports.getOxidationById = function getOxidationById(req, res) {
  var id = req.params.id;
  Oxidation.findById(id).then(function (oxidation) {
    if (oxidation) {
      res.json(oxidation);
    } else {
      res.status(404).json({
        message: "Data not found"
      });
    }
  })["catch"](function (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  });
};
var getUserById = exports.getUserById = function getUserById(req, res) {
  var id = req.params.id;
  User.findById(id).then(function (user) {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "Data not found"
      });
    }
  })["catch"](function (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  });
};
var getPatientById = exports.getPatientById = function getPatientById(req, res) {
  var id = req.params.id;
  Patient.findById(id).then(function (patient) {
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({
        message: "Data not found"
      });
    }
  })["catch"](function (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  });
};
var addNewUser = exports.addNewUser = function addNewUser(req, res) {
  var newUser = new User(req.body);
  newUser.save().then(function (newUser) {
    res.json(newUser);
  })["catch"](function (err) {
    res.send(err);
  });
};
var getUserLogin = exports.getUserLogin = function getUserLogin(req, res) {
  var _req$params = req.params,
    email = _req$params.email,
    password = _req$params.password;
  console.log(email);
  User.findOne({
    email: email
  }).then(function (user) {
    if (user) {
      console.log(user.password);
      console.log(password);
      if (password === user.password) {
        var userData = {
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePhoto: user.profilePhoto,
          bookings: user.bookings,
          createdDate: user.createdDate
        };
        res.json(userData);
        console.log("Successful login");
      } else {
        console.log("incorrect password");
        res.status(401).json({
          message: "Incorrect Password"
        });
      }
    } else {
      console.log("user not found");
      res.status(404).json({
        message: "User not found"
      });
    }
  })["catch"](function (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  });
};