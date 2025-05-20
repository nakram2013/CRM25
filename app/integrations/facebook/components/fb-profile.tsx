import React from "react";
import type { z } from "zod";
import type { profileSchema } from "../data/profile-schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface FacebookProfileProps {
  children?: React.ReactNode;
  Profile: z.infer<typeof profileSchema>
}

const FacebookProfile = ({ children, Profile }: FacebookProfileProps) => {
  return <Collapsible>
    <CollapsibleTrigger className="px-4 py-2 text-sm font-medium rounded-md border border-primary/50 w-full justify flex gap-3">
      <Avatar>
        <AvatarImage src={Profile.picture} />
        <AvatarFallback>{Profile.firstName.slice(0, 1)} {Profile.lastName.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div>
        <div className=" text-left text-sm">{Profile.firstName} {Profile.lastName}</div>
        <div className="text-sm text-muted-foreground text-left text-[12px]">{Profile.email}</div>
      </div>


    </CollapsibleTrigger>

    <CollapsibleContent className="ml-[60px]">
      Yes. Free to use for personal and commercial projects. No attribution
      required.
    </CollapsibleContent>
  </Collapsible>
    ;
};

export default FacebookProfile;
