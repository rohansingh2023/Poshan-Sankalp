"use client";
// import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();

  //   const [error, setError] = useState("");
  //   const [success, setSuccess] = useState("");

  //   useEffect(() => {
  //     setError(params.get("error"));
  //     setSuccess(params.get("success"));
  //   }, [params]);

  //   if (session.status === "loading") {
  //     return <p>Loading...</p>;
  //   }

  //   if (session.status === "authenticated") {
  //     router?.push("/");
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });

    console.log(session);
    if (session.status === "authenticated") {
      router.push("/");
    }
  };

  console.log(session);
  if (session.status === "authenticated") {
    router.push("/");
  }
  return (
    <div>
      {/* <h1>{success ? success : "Welcome Back"}</h1> */}
      <h2>Please sign in to see the dashboard.</h2>

      <form
        onSubmit={handleSubmit}
        //   className={styles.form}
      >
        <input
          type="text"
          placeholder="Email"
          required
          //   className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          required
          //   className={styles.input}
        />
        <button>Login</button>
        {/* {error && error} */}
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        // className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <span>- OR -</span>
      {/* <Link className={styles.link} href="/">
        Create new account
      </Link> */}
      {/* <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button> */}
    </div>
  );
};

export default Login;
