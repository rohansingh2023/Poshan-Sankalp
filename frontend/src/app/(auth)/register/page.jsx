"use client";

// import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/navbar/Navbar";

const Register = () => {
  const [err, setErr] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById("registerForm");

    // Create a new FormData object from the form
    const formData = new FormData(form);

    // Access form fields by their names
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 && router.push("/login?success=Account Created");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div>
      <Navbar />
      <p>Hii</p>
      <form id="registerForm">
        <input type="text" name="name" placeholder="username" />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <button onClick={handleSubmit}>Register</button>
      </form>
      {err && "Something went wrong"}
      <Link href="/login">Login with pre existing acc </Link>
    </div>
  );
};

export default Register;
