import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "~/components/ui/input";
import { DateTimePicker } from "~/components/date-time-picker";
import { Textarea } from "~/components/ui/textarea";
import { leadFollowUpFormSchema } from "../data/lead-followup-form-schema";
import { leadService } from "~/api/leadService";
import LeadSteps from "~/components/dropdowns/lead-steps";

const FollowUpForm = ({ leadID, onClose,callBack }: { leadID: number; onClose: () => void;callBack? : () => void; }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [nextActivityDate, setNextActivityDate] = React.useState<Date>();
    const [showNextActivity, setShowNextActivity] = React.useState<boolean>(false);
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof leadFollowUpFormSchema>>({
        resolver: zodResolver(leadFollowUpFormSchema),
        defaultValues: {
            title: '',
            nextActivitySource: '',
            step: 0,  // or 0, depending on your schema
            remarks: '',
        },
        mode: "onBlur",
    });
    async function onSubmit(values: z.infer<typeof leadFollowUpFormSchema>) {
        setIsLoading(true);
        values.leadId = leadID;
        if (nextActivityDate) {
            values.nextActivityDate = nextActivityDate;
        }
        var res = await leadService.createFollowup(values);
        if (res.success) {
            toast(res.message)
            onClose();
            if (callBack) {
                callBack();
            }

            queryClient.invalidateQueries({ queryKey: ["leads"] });
        }
        setIsLoading(false);
    }
    return (<React.Fragment>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Activity Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Activity Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nextActivitySource"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Communication Channel</FormLabel>
                                <FormControl>
                                    <Input placeholder="Communication Channel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="step"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Step</FormLabel>
                                <FormControl>
                                    <LeadSteps
                                        {...field}
                                        onValueChange={(val: string) => {
                                            const numberVal = Number(val);
                                            field.onChange(numberVal);

                                            // yahan check karein jaise step 2 pe div hide karna hai
                                            if (numberVal === 7) {
                                                setShowNextActivity(false);
                                            } else {
                                                setShowNextActivity(true);
                                            }
                                        }}
                                        value={field.value?.toString() ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {showNextActivity && (<FormItem>
                        <FormLabel>Next Activity Date : </FormLabel>
                        <FormControl>
                            <DateTimePicker date={nextActivityDate} setDate={setNextActivityDate} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>)}
                    <FormField
                        control={form.control}
                        name="remarks"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        ) : ""}{" "} Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
    </React.Fragment>)
}

export default FollowUpForm;