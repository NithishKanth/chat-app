'use server';
import { clerkClient } from '@clerk/nextjs/server';

const updateLogoOnServer = async (obj) => {
    // Update the organization logo using Clerk's API
    console.log(obj);
    // const response = await clerkClient.organizations.updateOrganizationLogo(id, file);

    // // Return the necessary data to the client
    // return {
    //     imageUrl: response.imageUrl,
    //     orgId: response.id,
    // };
};

export default updateLogoOnServer;
