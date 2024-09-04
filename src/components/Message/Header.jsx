"use client"
import Image from 'next/image';
import React from 'react'
import { Sheet,
    SheetContent,
    SheetTrigger, } from '../ui/sheet';
import { Edit } from 'lucide-react';
import { Input } from '../ui/input';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Clerk } from '@clerk/clerk-js';
import { ScrollArea } from '../ui/scroll-area';
import Member from '../organization/Member';
import { Button } from '../ui/button';
import deleteOrg from '@/actions/deleteOrg';
import updateLogoOnServer from '@/actions/updateOrgLogo';
import { useClerk } from '@clerk/clerk-react';

const Header = ({data,user,setPerson}) => {
    const { fullName,emailAddress,imageUrl,id,members,_creationTime,_id } = data;
    const { id:userId } = user;
    const { getOrganization } = useClerk()
    const SetLogo = useMutation(api.user.updateProfile);
    const OrgLogo = useMutation(api.organization.updateLogo);
    const getCreation = (Time)=>{
        const CurrTime = new Date(Time);
        const time = CurrTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(CurrTime);
        return time+" "+date;
    }
    const deleteGrp = useMutation(api.organization.deleteGrp);
    const CurrUser = useQuery(api.document.getDocById,(user?.id)?{id:userId}:{id:""});
    const updateProfileImage = async(file)=>{
        if(!file || !user){
            return
        }
        if(members){
            const resp = (await getOrganization(id));
            const newresp = await resp.setLogo({file});
            await OrgLogo({
                imageUrl:newresp.imageUrl,
                orgId:newresp.id
            })
            return
        }
        const NewUser = await user.setProfileImage({file});
        const { publicUrl } = NewUser;
        await SetLogo({
            id:user?.id,
            imageUrl:publicUrl
        })
    }
    let ismember = false;
    let isAdmin = false;
    if(members){
        ismember = members?.some((mem)=>(mem.personId).includes(CurrUser?._id));
        isAdmin = members?.some((mem)=>(mem.personId).includes(CurrUser?._id) && (mem.admin));
    }
    const exit = useMutation(api.organization.ExitGroup);
    const handleLeaveFunction = async()=>{
        await exit({
            orgId:_id,
            personId:CurrUser?._id,
        })
    }
  return (
        <Sheet>
            <SheetTrigger  className='w-full'>
                <div className='bg-[#282828] w-full px-5 py-6 rounded-lg  flex items-center gap-4'>
                    <div>
                        <Image src={imageUrl} width={260} height={260} alt='pro' className='rounded-xl w-[65px] h-[65px] object-cover'/>
                    </div>
                    <div className='text-xl font-semibold'>
                        {fullName}
                    </div>
                </div>
            </SheetTrigger>
            <SheetContent className="person border-none min-w-[480px] text-white">
                <DialogTitle />
                <ScrollArea className="h-full">
                    <div className='relative drop-shadow-2xl'>
                        <Image src={imageUrl} width={480} height={480} className='w-full h-[320px] rounded-xl object-cover' alt='pro'/>
                        {
                            (id?.includes(user?.id) || ismember) && 
                            <div className='absolute top-4 left-3 bg-white text-black p-1 rounded-md cursor-pointer'>
                                <label htmlFor='image'><Edit /></label>
                                <Input type="file" id="image" accept="image/*" onChange={(e)=>{
                                    const file = e.target.files[0];
                                    if(file){
                                        updateProfileImage(file);
                                    }
                                }} style={{display:"none"}}/>
                            </div>
                        }
                    </div>
                    <div className='text-2xl text-center py-4 m-auto bg-white text-black w-fit px-5 font-semibold mt-2 rounded-lg drop-shadow-2xl'>
                        {fullName}
                    </div>
                    <div className='text-[18px] py-5 flex flex-col gap-2'>
                        {emailAddress && <div>Email : {emailAddress}</div>}
                        <div>Join At : {getCreation(_creationTime)}</div>
                    </div>
                    {members && 
                        <div className='flex flex-col gap-2'>
                            <div className='text-[18px]'>Members :</div>
                            {members.map((mem)=>{
                                return(
                                    <Member id={mem.personId} isadmin={mem.admin} setPerson={setPerson}/>
                                )
                            })}
                           {(ismember && !isAdmin) && <Button className={`w-fit bg-red-800 hover:bg-red-600`} onClick={handleLeaveFunction}>Leave Group</Button>}
                           {(ismember && isAdmin) && <Button className={`w-fit bg-red-800 hover:bg-red-600`} onClick={async()=>{
                            await deleteGrp({
                                orgId:_id
                            })
                            await deleteOrg(id)
                           }}>Exit Group</Button>}
                        </div>
                    }
                </ScrollArea>
            </SheetContent>
        </Sheet>
  )
}

export default Header