"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatientSchema = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var PatientSchema = exports.PatientSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  //   add encryption at a later date -- as part of the validation system.
  risks: {
    type: Array,
    "default": []
  },
  profilePhoto: {
    type: String,
    "default": "https://picsum.photos/seed/picsum/100/100"
  },
  createdDate: {
    type: Date,
    "default": Date.now
  },
  modifiedDate: {
    type: Date,
    "default": Date.now
  }
});