"use server"

import { clerkClient } from "@clerk/nextjs/server";

const deleteOrg = async(id)=>{
    await clerkClient.organizations.deleteOrganization(id);
}

export default deleteOrg;