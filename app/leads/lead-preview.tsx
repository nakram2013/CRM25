import { useEffect, useState } from "react";
import LeadBasicInfo from "./lead-basic-info";
import { useParams } from "react-router";
import { leadService } from "~/api/leadService";
import type { leadSchema } from "./data/schema";
import type { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const LeadPreview: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<z.infer<typeof leadSchema>>({} as z.infer<typeof leadSchema>);
    const fetchData = async (): Promise<z.infer<typeof leadSchema>> => {
        const result = await leadService.getSingle(parseInt(id ? id : "0"));
        console.log(result);
        if (result.leadId > 0) {
            setData(result);
        } else {
            console.log(result.message);
        }
        return result;
    };
    useEffect(() => {
        const fetchDataAsync = async () => {
            if (id !== undefined && id !== "") {
                setIsLoading(true);
                await fetchData();
                setIsLoading(false);
            }
        };

        fetchDataAsync();
    }, [id]);

    return (
        <div className="flex gap-4">
            <LeadBasicInfo isLoading={isLoading} data={data} />
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">All Activities</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">

                            </div>
                            <div className="space-y-1">

                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">

                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LeadPreview;