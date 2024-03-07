"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OxidationSchema = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var OxidationSchema = exports.OxidationSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  oxidation: {
    type: Number
  },
  timestamps: true,
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