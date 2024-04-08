"use client";

import React, { useState } from "react";
import { Login } from "@/lib/action";
import Link from "next/link";

const LoginForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", e.target.email.value);
    formData.append("password", e.target.password.value);
    try {
      console.log(formData);
      // await Login(formData);
      // Optionally, you can add success handling logic here, such as displaying a success message.
      console.log("Login successful");
    } catch (error) {
      // Handle errors here, such as displaying an error message to the user.
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg py-5">
        <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
          <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
            <div className="flex items-center justify-center w-full lg:p-12">
              <div className="flex items-center xl:p-10">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 text-sm text-start text-grey-900"
                    >
                      Email*
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="mail@loopple.com"
                      className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 text-sm text-start text-grey-900"
                    >
                      Password*
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter a password"
                      className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
