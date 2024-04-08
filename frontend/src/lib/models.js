import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    education: {
      type: String,
      required: true,
      maxlength: 200,
    },
    language: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      maxlength: 200,
    },
    exp_yr: {
      type: Number,
      default: 0,
    },
    appointment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    default: [],
  },
  { timestamps: true }
);

export const Doctor =
  mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      maxlength: 60,
    },
    phoneNo: {
      type: String,
      required: true,
      maxlength: 15, // Adjust max length according to your needs
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["patient", "doctor", "admin"], // Adjust user types as needed
      required: true,
    },
    appointment_ID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    default: [],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

const AppointmentSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    docID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  { timestamps: true }
);

export const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
