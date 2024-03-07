import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PersSchema = new Schema({
  patientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  guardianId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});