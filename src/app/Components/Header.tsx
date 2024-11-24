import React from "react";
import Link from "next/link";
import {
  getSignInUrl,
  getSignUpUrl,
  signOut,
  withAuth,
} from "@workos-inc/authkit-nextjs";

const Header = async () => {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  // console.log(user);
  const signOutUrl = await getSignUpUrl();

  return (
    <header>
      <div className=" container flex items-center  justify-between py-4  px-6 mx-auto my-4 ">
        <Link href={"/"} className="font-bold  text-xl ">
          Job Board
        </Link>
        <nav className="flex gap-2">
          {!user && (
            <Link className="bg-gray-200 rounded-md py-2 px-4" href={signInUrl}>
              Login
            </Link>
          )}

          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="bg-gray-200 rounded-md py-2 px-4"
              >
                Log out
              </button>
            </form>
          )}
          <Link
            className="bg-blue-600 text-white rounded-md py-2 px-4"
            href={"/new-listing"}
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
