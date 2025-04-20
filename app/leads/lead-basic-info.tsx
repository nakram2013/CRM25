import { CircleUserRound, Icon, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import type { z } from "zod";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import type { leadSchema } from "./data/schema";

const LeadBasicInfo: React.FC<{isLoading : boolean,data? :z.infer<typeof leadSchema>}> = ({isLoading,data}) => {
    
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Lead Info</CardTitle>
                {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="justify-center flex">
                    <CircleUserRound className="w-[100px] h-[100px]" />
                </div>
                <div className="flex flex-col items-center justify-center mt-4">
                    {isLoading ? <Skeleton className="h-6 w-[250px]" /> : data?.firstName + " " + data?.lastName}
                </div>
                <div className="flex flex-col items-center justify-center text-muted-foreground text-[12px]">
                {isLoading ? <Skeleton className="h-4 w-[250px] mt-1" /> : data?.occupation}
                </div>
                <div className=" mt-5">
                {isLoading ? <Skeleton className="h-6 mb-2" /> : <div className="flex mb-2"><Mail className="mr-2" /> {data?.email}</div>}
                {isLoading ? <Skeleton className="h-6 mb-2" /> : <div className="flex mb-2"><Phone className="mr-2" /> {data?.contactNo}</div>}
                {isLoading ? <Skeleton className="h-6 mb-2" /> : <div className="flex mb-2"><Icons.whastsapp className="mr-2" /> {data?.whatsApp}</div>}
                {isLoading ? <Skeleton className="h-6 mb-2" /> : <div className="flex mb-2"><MapPin className="mr-2" /> {data?.city}</div>}
                </div>
            </CardContent>
            {/* <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter> */}
        </Card>
    );
};

export default LeadBasicInfo;