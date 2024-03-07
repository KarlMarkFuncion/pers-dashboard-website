import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const HeartrateSchema = new Schema({
  patientId : {
    type: Schema.Types.ObjectId,
    required: true,
  },
  bpm: {
    type: Number
  }, 
  profilePhoto: {
    type: String,
    default: "https://picsum.photos/seed/picsum/100/100",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
} , {
  timestamps: true // Correct usage
});