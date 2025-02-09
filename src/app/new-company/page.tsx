import { withAuth } from "@workos-inc/authkit-nextjs";
import React from "react";
import { createCompany } from "../actions/workosActions";

const page = async () => {
  const { user } = await withAuth();

  async function handleNewCompanyFormSubmit(data: FormData) {
    "use server";

    if (user) {
      await createCompany(data.get("newCompanyName") as string, user.id);
    }
  }

  if (!user) {
    ("Login to use this page");
  }

  return (
    <div className="container">
      <h2 className="text-lg mt-6 ">Create a new company</h2>
      <p className="text-gray-500 text-sm mb-2">
        To create a job listing your first need to register a company
      </p>
      <form action={handleNewCompanyFormSubmit} className="flex gap-2">
        <input
          name="newCompanyName"
          className="p-2 border border-gray-400 rounded-md"
          type="text"
          placeholder="company name"
        />
        <button
          type="submit"
          className=" flex gap-2  items-center rounded-md bg-gray-200 px-4 py-2 "
        >
          Create a company
          {/* <FontAwesomeIcon className="h-4" icon={faArrowRight} /> */}
        </button>
      </form>
    </div>
  );
};

export default page;
