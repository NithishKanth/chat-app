"use client"
import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Group } from 'lucide-react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useOrganizationList } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const CreateOrg = ({CurrUser}) => {
    const { createOrganization } = useOrganizationList();
    const createOrg = useMutation(api.organization.createOrg);
    const [image, setImage] = useState(null);
    const [orgname, setName] = useState("");
    const [preview, setPreview] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCreate = async () => {
        if (!orgname) {
            alert("Enter the Group Name");
            return;
        }
        let {name,id,slug,imageUrl,setLogo} = await createOrganization({ name:orgname });
        if (image) {
            let { imageUrl: newImageUrl } = await setLogo({ file: image });
            imageUrl = newImageUrl;
        }
        await createOrg({
            id,
            fullName:name,
            slug,
            imageUrl,
            adminId:CurrUser?._id
        })
        handleReset();
    }

    const handleReset = () => {
        setImage(null);
        setName("");
        setPreview(null);
    }

    return (
        <Dialog onOpenChange={(isOpen) => {
            if (isOpen) {
                handleReset();
            }
        }}>
            <DialogTrigger>
                <Group className='cursor-pointer' size={30} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Group</DialogTitle>
                    <DialogDescription>
                        Start group conversation with your friends.
                    </DialogDescription>
                    <div>
                        <div className='font-semibold'>
                            Group Image
                        </div>
                        <div className='mt-1 flex items-center gap-3'>
                            <div className={`p-14 w-fit max-w-[150px] max-h-[150px] ${(!image && !preview) ? "border-4 border-dashed border-black" : "p-0"}`}>
                                {preview && (
                                    <img src={preview} alt='Preview' className='w-full h-full object-cover' />
                                )}
                            </div>
                            <div>
                                <Input type="file" accept="image/*" onChange={handleImage} />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label className='font-semibold'>Name :</label>
                            <Input type="text" className="outline" value={orgname} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <Button className="mt-5" onClick={handleCreate}>Create</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CreateOrg;
