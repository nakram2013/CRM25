import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { leadService } from "~/api/lead-service";
import type { leadFollowUpSchema } from "../data/lead-followup-schema";
import type { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { format } from "date-fns";
import { Mail, MessageSquare, PhoneCall } from "lucide-react";
type LeadFollowupProps = {
    id: number;
};

export type LeadFollowupHandle = {
    reload: () => void;
};


const LeadFollowup = forwardRef<LeadFollowupHandle, LeadFollowupProps>(({ id }, ref) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<z.infer<typeof leadFollowUpSchema>[]>({} as z.infer<typeof leadFollowUpSchema>[]);
    useImperativeHandle(ref, () => ({
        reload: fetchData,
    }));
    const fetchData = async () => {
        var res = await leadService.followup(id);
        const sortedData = res.sort((a: { addedDate: string | number | Date; }, b: { addedDate: string | number | Date; }) => {
            return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        });
        setData(sortedData);
    }
    useEffect(() => {
        const fetchDataAsync = async () => {
            if (id !== undefined) {
                setIsLoading(true);
                await fetchData();
                setIsLoading(false);
            }
        };

        fetchDataAsync();
    }, [id]);
    return (
        <div>
            {data && data.length > 0 ?
                data.map((item,index) => (
                    <Card className="py-3 pt-6 mb-2" key={index}>
                        <CardContent>
                            <CardTitle>
                                {item.sourceofComunication === "Call" && <PhoneCall className="inline mr-2" height={20} width={20} />}
                                {item.sourceofComunication === "Whatsapp" && <MessageSquare className="inline mr-2" />}
                                {item.sourceofComunication === "Email" && <Mail className="inline mr-2" />}
                                {item.title}</CardTitle>
                            <CardDescription>{item.remarks}</CardDescription>
                            <div className="text-sm mt-2">Next Activity Date : {format(item.nextActivityDate + "Z", "MM/dd/yyyy hh:mm:ss aa")}
                            <br />Source : {item.nextActivitySource}</div>
                            <div className="text-muted-foreground text-sm float-end">{format(item.addedDate + "Z", "MM/dd/yyyy hh:mm:ss aa")}</div>
                        </CardContent>
                    </Card>

                )) : (
                    <p>No followup data available</p>
                )}
        </div>
    );
});
export default LeadFollowup;