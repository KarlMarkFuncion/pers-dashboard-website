import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  //   add encryption at a later date -- as part of the validation system.
  password: {
    type: String,
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
});