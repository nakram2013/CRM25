import React from "react";
import type { z } from "zod";
import { Icons } from "~/components/icons";
import type { fbpageSchema } from "../data/page-schema";

interface FacebookProfileProps {
  children?: React.ReactNode;
  fbPage: z.infer<typeof fbpageSchema>
}

const FacebookPage = ({ children, fbPage }: FacebookProfileProps) => {
  return (
    <div className="px-4 py-2 text-sm font-medium rounded-md border w-full justify-between flex items-center mb-3 border-border shadow-sm">
      <div>
        <div className=" text-left text-sm">{fbPage.name}</div>
        <div className="text-sm text-muted-foreground text-left text-[12px]">{fbPage.category}</div>
      </div>
      <div>
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      </div>
    </div>
  );
};

export default FacebookPage;
