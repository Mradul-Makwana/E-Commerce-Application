import { JobForm } from "@/app/Components/JobForm";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

type PageProps = {
  params: {
    orgId: string;
  };
};

const NewListingForOrgPage = async ({ params }: PageProps) => {
  const { user } = await withAuth();

  if (!user) {
    return <div>Please log in</div>;
  }

  const workos = new WorkOS(process.env.WORKOS_API_KEY);

  const orgId = params.orgId;

  const oms = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
    organizationId: orgId,
  });

  const hasAccess = oms.data.length > 0;

  if (!hasAccess) {
    return <div>No access</div>;
  }

  return <JobForm />;
};

export default NewListingForOrgPage;
