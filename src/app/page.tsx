import Image from "next/image";
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
  const { user } = await withAuth();

  const signInUrl = await getSignInUrl();

  const signUpUrl = await getSignUpUrl();
  return (
    <>
      <Hero />
      <Jobs />
    </>
  );
};

export default page;
