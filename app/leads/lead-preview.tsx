import { useEffect, useRef, useState } from "react";
import LeadBasicInfo from "./lead-basic-info";
import { useParams } from "react-router";
import { leadService } from "~/api/lead-service";
import type { leadSchema } from "./data/schema";
import type { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import LeadFollowup, { type LeadFollowupHandle } from "./components/lead-followup";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import FollowUpForm from "./components/followup-form";

const LeadPreview: React.FC = () => {
    const [openF, setOpenF] = useState(false);
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
    const followupRef = useRef<LeadFollowupHandle>(null);

    const handleManualReload = () => {
        followupRef.current?.reload();
    };
    const handleFollowUp = () => {
        setOpenF(true);
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
            <Tabs defaultValue="activities" className="w-full">
                <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="activities">All Activities</TabsTrigger>
                    {/* <TabsTrigger value="password">Password</TabsTrigger> */}
                </TabsList>
                <TabsContent value="activities">
                    <Card>
                        <CardContent className="space-y-2">
                            <div>
                                <Button onClick={() => handleFollowUp()}>Follow Up</Button>
                            </div>
                            <div className="space-y-1">
                                <LeadFollowup id={parseInt(id ? id : "0")} />
                            </div>
                        </CardContent>
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
                            <LeadFollowup id={parseInt(id ? id : "0")} />
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            <Dialog open={openF} onOpenChange={setOpenF}>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[60px] xl:max-w-[600px] 2xl:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add Follow Up</DialogTitle>
                        <DialogDescription>
                            Make changes to your lead here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] rounded-md pr-3">
                        <FollowUpForm leadID={data.leadId} onClose={() => setOpenF(false)} callBack={handleManualReload}/>
                    </ScrollArea>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default LeadPreview;