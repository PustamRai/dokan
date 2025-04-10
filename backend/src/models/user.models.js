import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: customer
    }
  },
  {
    minimize: false,
    timestamps: true

  },
);

export const UserModel = mongoose.model("User", userSchema)