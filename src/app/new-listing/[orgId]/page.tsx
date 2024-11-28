import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import React from "react";

type PageProps = {
  params: {
    orgId: string;
  };
};

const NewListingForOrgPage = async (props: PageProps) => {
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  if (!user) {
    ("Please log in");
  }

  const orgId = props.params.orgId;

  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });

  const hasAccess = oms.data.length > 0;

  if (!hasAccess) {
    return "no access";
  }

  return (
    <div>
      <form className="container mt-6" action="">
        <input className="border p-2 " placeholder="job title" type="text" />
      </form>
    </div>
  );
};

export default NewListingForOrgPage;
