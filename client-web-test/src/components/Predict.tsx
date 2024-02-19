import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Result {
  Stunting: number;
  Underweight_Overweight: number;
  wasting: number;
}

const Predict = () => {
  const [file, setFile] = useState<Blob>(null!);
  const [result, setResult] = useState<Result>();
  const [wasting, setWasting] = useState("");
  const [underWeight, setunderWeight] = useState("");
  const [stunting, setStunting] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isRes, setIsRes] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setFile(e.target.files[0]);
  };
  console.log(file);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const id = toast.loading("Predicting....");
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict-v1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(res.data?.data);
      setLoading(false);
      setIsRes(true);
      toast.success("Prediction successfull", {
        id,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, {
        id,
      });
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

  console.log(result);

  return (
    <div id="predict" className="h-fit py-5 w-11/12 rounded-md bg-[#caf0f8]">
      <div className="flex flex-col mt-[20px] ml-5">
        <div className="text-center flex items-start">
          <h2 className="font-bold text-3xl inline-block text-left ">
            Make Predictions
          </h2>
        </div>
        <div className="flex space-x-10 mt-10 items-center justify-center">
          <div className="border-2 w-40 border-dotted border-black p-3 rounded-md text-gray-500">
            <p>Upload a file with .csv extension.</p>
            <p>Should contain one row of all the required fields</p>
          </div>
          <div className="flex flex-col space-x-10">
            <div className="border-none p-[5px] rounded-[7px] bg-blue-400 mt-5">
              <input type="file" accept=".csv" onChange={handleChange} />
            </div>

            <button
              className="p-2 bg-red-300 rounded-lg mt-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {isRes && (
            <div className="mt-5 p-2">
              <p className="text-2xl font-medium">Your Predictions are: </p>
              <p>Stunting : {stunting}</p>
              <p>Underweight-Overweight : {underWeight}</p>
              <p>Wasting : {wasting}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predict;
