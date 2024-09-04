import React from 'react'
import { Button } from '../ui/button'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const JoinOrg = ({senderId,orgId}) => {
    const JoinInOrg = useMutation(api.organization.joinOrg);
  return (
    <Button className="bg-white text-black hover:text-black hover:bg-[#e8e8e8]" onClick={async()=>{
        await JoinInOrg({
            orgId,
            personId:senderId
        })
    }}>Join Group</Button>
  )
}

export default JoinOrg