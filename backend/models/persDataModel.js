import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const DataSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  heartbeat: {
    type: String,
    required: true,
  },
  oxidation: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
