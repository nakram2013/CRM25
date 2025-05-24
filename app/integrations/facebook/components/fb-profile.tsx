import React from "react";
import type { z } from "zod";
import type { profileSchema } from "../data/profile-schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Icons } from "~/components/icons";

interface FacebookProfileProps {
  children?: React.ReactNode;
  Profile: z.infer<typeof profileSchema>
}

const FacebookProfile = ({ children, Profile }: FacebookProfileProps) => {
  return <Collapsible defaultOpen>
    <CollapsibleTrigger className="px-4 py-2 text-sm font-medium rounded-md border border-primary/50 w-full justify-between flex items-center bg-muted">
      <div className="justify flex gap-3">
        <Avatar>
          <AvatarImage src={Profile.picture} />
          <AvatarFallback>{Profile.firstName.slice(0, 1)} {Profile.lastName.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <div>
          <div className=" text-left text-sm">{Profile.firstName} {Profile.lastName}</div>
          <div className="text-sm text-muted-foreground text-left text-[12px]">{Profile.email}</div>
        </div>
      </div>
      <div>
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      </div>

    </CollapsibleTrigger>

    <CollapsibleContent className="ml-[60px]">
    <div className="text-muted-foreground">Pages</div>
      {children}
    </CollapsibleContent>
  </Collapsible>
    ;
};

export default FacebookProfile;
