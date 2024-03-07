"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeartrateSchema = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var HeartrateSchema = exports.HeartrateSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  bpm: {
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