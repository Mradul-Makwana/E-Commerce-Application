// import Image from "next/image";
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
  signOut,
} from "@workos-inc/authkit-nextjs";
import Hero from "./Components/Hero";
import React from "react";
import Jobs from "./Components/Jobs";

const page = async () => {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();
  return (
    <>
      <Hero />
      <Jobs />
    </>
  );
};

export default page;
