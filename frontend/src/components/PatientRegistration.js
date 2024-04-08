"use client";
import React, { useState } from "react";
import { addUser } from "@/lib/action";
const PatientRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    userType: "patient",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const formDataObject = {};

    // // Iterate over form data and populate formDataObject
    // for (let [key, value] of formData.entries()) {
    //   formDataObject[key] = value;
    // }
    try {
      console.log(formData);
      await addUser(formData);
      // Optionally, you can add success handling logic here, such as displaying a success message.
      console.log("Doctor added successfully");
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user.
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div className="container mx-auto mt-12 px-4">
      <h1 className="text-3xl font-semibold mb-4">Doctor Registration</h1>
      <form
        className="bg-white p-12 m-12 rounded-lg shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div className="shadow-lg">
            <label
              htmlFor="fullName"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              onChange={handleChange}
              value={formData.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div> */}
          <div className="shadow-lg">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>
        </div>
        <div className="mt-6 shadow-lg">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700"
          >
            Contact Number
          </label>
          <input
            type="number"
            id="phoneNo"
            name="phoneNo"
            onChange={handleChange}
            value={formData.phoneNo}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
          />
        </div>
        <div className="mt-6 shadow-lg">
          <label
            htmlFor="specialization"
            className="block text-lg font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
          />
        </div>

        {/* <div className="mt-6 shadow-md">
          <label
            htmlFor="address"
            className="block text-lg font-medium text-gray-700"
          >
            Licence number 
          </label>
          <textarea
            id="address"
            name="address"
            onChange={handleChange}
            value={formData.address}
            className="mt-1 block h-40 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          ></textarea>
        </div> */}
        <div className="mt-6 shadow-mg">
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistrationPage;
