"use server";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NewListingPage = async () => {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    return (
      <div className="container">
        <div>You need to be logged in to post a job</div>
      </div>
    );
  }

  const organizationMemberships =
    await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });

  const activeOrganizationMemberships = organizationMemberships.data.filter(
    (om) => om.status === "active"
  );

  const organizationNames: {
    [key: string]: string;
  } = {};

  for (const activeMembership of activeOrganizationMemberships) {
    const organization = await workos.organizations.getOrganization(
      activeMembership.organizationId
    );

    organizationNames[organization.id] = organization.name;
  }
  return (
    <div className="container">
      {!user && <div>You need to be logged in to post a job</div>}

      <div>
        <h2 className="text-lg mt-6">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">
          Select a company to create a job add for
        </p>

        <div className="">
          <div className="border inline-block rounded-md">
            {Object.keys(organizationNames).map((orgId) => (
              <Link
                href={"/new-listing/" + orgId}
                className={
                  "p-2 px-4 flex gap-2 items-center  " +
                  (Object.keys(organizationNames)[0] === orgId
                    ? ""
                    : "border-t")
                }
                key={orgId}
              >
                {organizationNames[orgId]}

                <FontAwesomeIcon className="h-4" icon={faArrowRight} />
              </Link>
            ))}
          </div>
        </div>
        {organizationMemberships.data.length === 0 && (
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-md ">
            No companies found assigned to your user
          </div>
        )}

        <Link
          href={"/new-company"}
          className="inline-flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md   mt-6 "
        >
          Create a new company
          <FontAwesomeIcon className="h-4" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
};

export default NewListingPage;
