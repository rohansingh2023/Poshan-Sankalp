"use client";
import React, { useState } from "react";
// import DoctorRegistrationPage from '@/components/DoctorRegistration';
import PatientRegistrationPage from "@/components/PatientRegistration";
// import AshaWorkerRegistrationPage from '@/components/AshaWorkerRegistration';

const SignUpPage = () => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleUserTypeSelect = (userType) => {
    setSelectedUserType(userType);
  };

  return (
    <div className="container mx-auto mt-12 px-4 h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
      <div className="flex justify-center items-center space-x-6">
        <div className="flex flex-col items-center">
          <img
            src="/doctor-logo.png"
            alt="Doctor"
            className="h-32 w-32 mb-2 rounded-full shadow-lg"
          />
          <button
            onClick={() => handleUserTypeSelect("doctor")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-blue-600"
          >
            Doctor
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/patient-logo.png"
            alt="Patient"
            className="h-32 w-32 mb-2 rounded-full shadow-lg"
          />
          <button
            onClick={() => handleUserTypeSelect("patient")}
            className="bg-green-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-green-600"
          >
            Patient
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/asha-worker.png"
            alt="Asha Worker"
            className="h-32 w-32 mb-2 rounded-full shadow-lg"
          />
          <button
            onClick={() => handleUserTypeSelect("ashaWorker")}
            className="bg-purple-500 text-white px-4 py-2 rounded-full mt-2 hover:bg-purple-600"
          >
            Asha Worker
          </button>
        </div>
      </div>
      <div>
        {selectedUserType === "doctor" && <DoctorRegistrationPage />}
        {selectedUserType === "patient" && <PatientRegistrationPage />}
        {selectedUserType === "ashaWorker" && <AshaWorkerRegistrationPage />}
      </div>
    </div>
  );
};

export default SignUpPage;
