"use client";

import React, { useEffect, useState } from "react";
import IndexNavbar from "@/components/Navbars/IndexNavbar";
import axios from "axios";
import { toast } from "react-toastify";

const Predict = () => {
  const [formData, setformData] = useState({
    bloodType: "apos",
    quantity: 0,
    urgent: "",
    reason: "brainStrom",
    hospitalName: "",
    address: "",
    // userId: currUser ? currUser._id : null,
    userId: null,
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");

  const [formValue, setFormValue] = useState({
    wealthIndexFactor: 0.0,
    motherBMI: 0.0,
    birthWeight: 0.0,
    childAge: 0.0,
    childWeight: 0.0,
    childHeight: 0.0,
  });

  const [result, setResult] = useState();
  const [wasting, setWasting] = useState("");
  const [underWeight, setunderWeight] = useState("");
  const [stunting, setStunting] = useState("");
  const [isRes, setIsRes] = useState(false);
  const [heightReading, setHeightReading] = useState([]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log("form data", formValue);
    setFormValue({
      ...formValue,
      [name]: value,
    });
    console.log(formData);
  };

  useEffect(() => {
    const getSensorReading = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-mongo");
        setHeightReading(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSensorReading();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSelectChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };
  const handleSelectChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const handleSelectChange4 = (event) => {
    setSelectedOption4(event.target.value);
  };

  const sendDataToBackend = async (e) => {
    e.preventDefault();
    // const id = toast.loading("Predicting....");
    try {
      const response = await axios.post("http://localhost:5000/predict-v1", {
        opt1: formValue.wealthIndexFactor,
        opt2: formValue.motherBMI,
        opt3: selectedOption === "Age18orOlder" ? 1.0 : 0.0,
        opt4: selectedOption === "Underage18" ? 1.0 : 0.0,
        opt5: 0.0,
        opt6: selectedOption2 === "Female" ? 1.0 : 0.0,
        opt7: selectedOption2 === "Male" ? 1.0 : 0.0,
        opt8: 0.0,
        opt9: selectedOption3 === "Average" ? 1.0 : 0.0,
        opt10: selectedOption3 === "LargerthanAverage" ? 1.0 : 0.0,
        opt11: selectedOption3 === "SmallerthanAverage" ? 1.0 : 0.0,
        opt12: selectedOption3 === "LargerVeryLarge" ? 1.0 : 0.0,
        opt13: selectedOption3 === "LargerVerySmall" ? 1.0 : 0.0,
        opt14: 0.0,
        opt15: formValue.birthWeight,
        opt16: formValue.childAge,
        opt17: formValue.childWeight,
        opt18: formValue.childHeight,
        opt19: selectedOption4 === "Rural" ? 1.0 : 0.0,
        opt20: selectedOption4 === "Urban" ? 1.0 : 0.0,
      });
      toast.success("Prediction Successfull");
      setResult(response?.data?.data);
      setIsRes(true);
      // console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error(`${error}`, id);
    }
  };

  useEffect(() => {
    switch (result?.Stunting) {
      case 0:
        setStunting("Moderately Stunted");
        break;
      case 1:
        setStunting("Normal");
        break;
      case 2:
        setStunting("Severely Stunted");
        break;
      default:
        break;
    }

    switch (result?.Underweight_Overweight) {
      case 0:
        setunderWeight("Moderately Underweight");
        break;
      case 1:
        setunderWeight("Normal");
        break;
      case 2:
        setunderWeight("Overweight");
        break;
      default:
        break;
    }

    switch (result?.wasting) {
      case 0:
        setWasting("Normal");
        break;
      case 1:
        setWasting("Overweight");
        break;

      default:
        break;
    }
  }, [result?.Stunting, result?.Underweight_Overweight, result?.wasting]);

  return (
    <div>
      <IndexNavbar fixed />
      <div className="flex items-start">
        <div className="container mt-12 px-4">
          <h1 className="text-3xl font-semibold mb-4 text-black">
            Request Blood
          </h1>
          <form
            className="bg-white p-12 m-12 rounded-lg shadow-2xl"
            //   onSubmit={handleSubmit}
            onSubmit={sendDataToBackend}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="shadow-lg">
                <label
                  for="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Wealth Index Factor
                </label>
                <input
                  type="number"
                  id="wealthIndexFactor"
                  name="wealthIndexFactor"
                  onChange={handleChange}
                  value={formValue.wealthIndexFactor}
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm placeholder:text-black focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
                />
              </div>
              <div className="shadow-lg">
                <label
                  for="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mother's BMI
                </label>
                <input
                  type="number"
                  id="motherBMI"
                  name="motherBMI"
                  onChange={handleChange}
                  value={formValue.motherBMI}
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
                />
              </div>
              <div className="shadow-lg">
                <label
                  for="bloodType"
                  className="block text-lg font-medium text-gray-700 "
                >
                  Mother's Under age 18 at time of birth
                </label>
                <select
                  // id="bloodType"
                  // name="bloodType"
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
                >
                  <option value="Age18orOlder">Age 18 or Older</option>
                  <option value="Underage18">Under age 18</option>
                  {/* <option value="bpos">B+</option>
                <option value="bneg">B-</option>
                <option value="abpos">AB+</option>
                <option value="abneg">AB-</option>
                <option value="opos">O+</option>
                <option value="oneg">O-</option> */}
                </select>
              </div>
              <div className="shadow-lg">
                <label
                  for="bloodType"
                  className="block text-lg font-medium text-gray-700 "
                >
                  Sex Of Child
                </label>
                <select
                  // id="bloodType"
                  // name="bloodType"
                  value={selectedOption2}
                  onChange={handleSelectChange2}
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  {/* <option value="bpos">B+</option>
                <option value="bneg">B-</option>
                <option value="abpos">AB+</option>
                <option value="abneg">AB-</option>
                <option value="opos">O+</option>
                <option value="oneg">O-</option> */}
                </select>
              </div>
              <div className="shadow-lg">
                <label
                  for="bloodType"
                  className="block text-lg font-medium text-gray-700 "
                >
                  Size of child at birth
                </label>
                <select
                  // id="bloodType"
                  // name="bloodType"
                  value={selectedOption3}
                  onChange={handleSelectChange3}
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
                >
                  <option value="Average">Average</option>
                  <option value="LargerthanAverage">Larger than Average</option>
                  <option value="SmallerthanAverage">
                    Smaller than Average
                  </option>
                  <option value="LargerVeryLarge">Larger_Very Large</option>
                  <option value="LargerVerySmall">Larger_Very Small</option>
                  {/* <option value="abneg">AB-</option>
                <option value="opos">O+</option>
                <option value="oneg">O-</option> */}
                </select>
              </div>
              <div className="shadow-lg">
                <label
                  for="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birth weight in kilograms
                </label>
                <input
                  type="number"
                  id="birthWeight"
                  name="birthWeight"
                  onChange={handleChange}
                  value={formValue.birthWeight}
                  className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
                />
              </div>
            </div>
            <div className="shadow-lg">
              <label
                for="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Child's Age in Months
              </label>
              <input
                type="number"
                id="childAge"
                name="childAge"
                onChange={handleChange}
                value={formValue.childAge}
                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
              />
            </div>

            <div className="shadow-lg">
              <label
                for="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Childs's weight in kilograms
              </label>
              <input
                type="number"
                id="childWeight"
                name="childWeight"
                onChange={handleChange}
                value={formValue.childWeight}
                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
              />
            </div>

            <div className="shadow-lg">
              <label
                for="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Childs's height in centimeters
              </label>
              <input
                type="number"
                id="childHeight"
                name="childHeight"
                onChange={handleChange}
                value={formValue.childWeight}
                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
              />
            </div>
            <div className="mt-6 shadow-md">
              {/* <div className="shadow-lg"> */}
              <label
                for="bloodType"
                className="block text-lg font-medium text-gray-700 "
              >
                Type of place of residence
              </label>
              <select
                // id="bloodType"
                // name="bloodType"
                value={selectedOption4}
                onChange={handleSelectChange4}
                className="mt-1 block w-full rounded-md text-black border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200  h-12 px-4 text-lg"
              >
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
              </select>
              {/* </div> */}
            </div>
            <div className="mt-6 shadow-mg">
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center mt-32 mr-10">
          <div className="p-5 mb-5 w-80 bg-white text-black rounded-md">
            <p className="text-lg font-medium">
              Height Readings (from Sensor){" "}
            </p>
            <div>
              {heightReading?.map((h, i) => (
                <div className="flex space-x-4">
                  <p>R{i + 1}:</p>
                  <p>{h?.distance}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {isRes && (
          <div className="p-5 mb-5 w-72 bg-white text-black rounded-md">
            <p className="text-2xl font-medium">Your Predictions are: </p>
            <p>Stunting : {stunting}</p>
            <p>Underweight-Overweight : {underWeight}</p>
            <p>Wasting : {wasting}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
