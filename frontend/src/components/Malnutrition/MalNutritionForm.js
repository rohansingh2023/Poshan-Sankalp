"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MalNutritionForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted successfully");
  };

  useEffect(() => {
    const getSensorReading = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-mongo");
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSensorReading();
  }, []);

  return (
    <div className="container mx-auto mt-12 px-4">
      <form
        className="bg-white p-12 m-12 rounded-lg shadow-2xl text-black"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="shadow-lg">
            <label
              htmlFor="fullName"
              className="block text-lg font-medium text-gray-700"
            >
              Child's Weight
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="age"
              className="block text-lg font-medium text-gray-700"
            >
              Child's Age (months)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="sex"
              className="block text-lg font-medium text-gray-700"
            >
              Sex of Child
            </label>
            <select
              id="sex"
              name="sex"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="wealthIndex"
              className="block text-lg font-medium text-gray-700"
            >
              Wealth Index
            </label>
            <select
              id="wealthIndex"
              name="wealthIndex"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            >
              <option value="Poorest">Poorest</option>
              <option value="poorer">Poorer</option>
              <option value="Middle">Middle</option>
              <option value="Richer">Richer</option>
              <option value="Richest">Richest</option>
            </select>
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="motherBmi"
              className="block text-lg font-medium text-gray-700"
            >
              Mother's BMI
            </label>
            <input
              type="number"
              id="motherBmi"
              name="motherBmi"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>

          <div className="shadow-lg">
            <label
              htmlFor="birthWeight"
              className="block text-lg font-medium text-gray-700"
            >
              Birth weight in Kilograms
            </label>
            <input
              type="number"
              id="birthWeight"
              name="birthWeight"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="birthSize"
              className="block text-lg font-medium text-gray-700"
            >
              Size of child at birth
            </label>
            <input
              type="number"
              id="birthSize"
              name="birthSize"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
            />
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="residence"
              className="block text-lg font-medium text-gray-700"
            >
              Type of Place of residence
            </label>
            <select
              id="residence"
              name="residence"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            >
              <option value="male">Urban</option>
              <option value="female">Rural</option>
            </select>
          </div>
          <div className="shadow-lg">
            <label
              htmlFor="sex"
              className="block text-lg font-medium text-gray-700"
            >
              Mother's Under age 18 at time of birth
            </label>
            <select
              id="sex"
              name="sex"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200 h-12 px-4 text-lg"
            >
              <option value="male">Yes</option>
              <option value="female">No</option>
            </select>
          </div>
        </div>

        <div className="mt-6 shadow-mg">
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MalNutritionForm;
