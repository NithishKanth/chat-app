"use client";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import SideBar from "@/components/main/SideBar";
import List from "@/components/main/List";
import MessageBox from "@/components/main/MessageBox";

export default function Home() {
  const { isLoaded, user } = useUser();
  const getUser = useQuery(api.user.getUser, user?.id ? { id: user.id } : { id: "pass" });
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    if (isLoaded) {
      const createNewUser = async () => {
        const { id, firstName, lastName, fullName, primaryEmailAddress, primaryEmailAddressId, imageUrl } = user;
        await createUser({
          id,
          firstName,
          lastName,
          fullName,
          emailAddress: primaryEmailAddress.emailAddress,
          primaryEmailAddressId,
          imageUrl
        });
      };

      createNewUser();
    }
  }, [isLoaded, user, getUser, createUser]);

  const [ person,setPerson ] = useState();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <main className="w-screen h-screen flex">
      <SideBar />
      <List user={user} person={person} setPerson={setPerson}/>
      <MessageBox person={person} user={user} setPerson={setPerson}/>
    </main>
  );
}
