"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersSchema = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var PersSchema = exports.PersSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  guardianId: {
    type: Schema.Types.ObjectId,
    required: true
  }
});