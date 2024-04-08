"use server";

import { connectToDb } from "./utils";
import { Doctor } from "./models";
import { User } from "./models";
import { Appointment } from "./models";

export const addAppointment = async (formData) => {
  const { userID, docID } = formData;
  try {
    // Establish a database connection
    await connectToDb();

    // Create a new user document based on the provided data
    const newAppointment = new Appointment({
      userID,
      docID,
    });

    // Save the new user to the database
    await newAppointment.save();
    const appointmentID = newAppointment._id;

    await User.findByIdAndUpdate(userID, {
      $push: { appointment_ID: appointmentID },
    });
    await Doctor.findByIdAndUpdate(docID, {
      $push: { appointment_ID: appointmentID },
    });

    console.log("User added successfully");
    return newUser; // Return the newly created user document if needed
  } catch (err) {
    console.error("Error adding user:", err);
    return { error: "Something went wrong while adding the user." };
  }
};

export const addUser = async (formData) => {
  const { name, email, phoneNo, password, userType } = formData;
  console.log("Reached DB");
  try {
    // Establish a database connection
    await connectToDb();

    // Create a new user document based on the provided data
    // const newUser = new User({
    //   name, // Assuming userID is provided correctly and references a User document
    //   email,
    //   phoneNo,
    //   password,
    //   userType,
    // });
    const newUser = new User({
      name: name, // Assuming userID is provided correctly and references a User document
      email: email,
      phoneNo: phoneNo,
      password: password,
      userType: userType,
    });

    // Save the new user to the database
    await newUser.save();

    console.log("User added successfully");
    return newUser; // Return the newly created user document if needed
  } catch (err) {
    console.error("Error adding user:", err);
    return { error: "Something went wrong while adding the user." };
  }
};

export const addDoctor = async (formData) => {
  // Assuming formData is already an object with the right properties
  // If not, you'd convert it similarly to before
  //   const { userID, desc, language, specialization, exp_yr } = formData;
  const {
    name,
    email,
    education,
    phoneNo,
    password,
    specialization,
    experience,
    language,
    desc,
  } = formData;
  try {
    await connectToDb(); // Ensure this function is properly defined to establish a DB connection
    const newUser = new User({
      name,
      email,
      phoneNo,
      password,
      userType: "doctor", // Assuming doctors are always added as doctors
    });

    await newUser.save();

    const userID = newUser._id;

    const newDoctor = new Doctor({
      userID,
      education, // Assuming education is the description
      language,
      specialization,
      exp_yr: experience,
      desc,
    });

    await newDoctor.save();
    console.log("Doctor added successfully");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong" };
  }

  console.log(userID, desc, language, specialization, exp_yr);
};
