import type { Row } from "@tanstack/react-table";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { leadSchema } from "../data/schema";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import Products from "~/components/dropdowns/products";
import LeadChannels from "~/components/dropdowns/lead-channels";
import LeadSteps from "~/components/dropdowns/lead-steps";
import { leadService } from "~/api/leadService";
import { useQueryClient } from "@tanstack/react-query";
import { Icons } from "~/components/icons";
import { DateTimePicker } from "~/components/date-time-picker";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";

const LeadForm = ({ lead, onClose }: { lead: z.infer<typeof leadSchema>; onClose: () => void; }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [nextActivityDate, setNextActivityDate] = React.useState<Date>();
    const [showActivity, setShowActivity] = useState(true);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LeadFormData>({
    //     resolver: zodResolver(leadSchema),
    // });
    const form = useForm<z.infer<typeof leadSchema>>({
        resolver: zodResolver(leadSchema),
        defaultValues: lead,
        mode: "onBlur",
    })
    const queryClient = useQueryClient();
    async function onSubmit(values: z.infer<typeof leadSchema>) {
        setIsLoading(true);
        if (nextActivityDate) {
            values.nextActivityDate = nextActivityDate;
        }
        var res = values?.leadId == 0 ? await leadService.Register(values) : await leadService.update(values);
        if (res.success) {
            toast(res.message)
            onClose();

            queryClient.invalidateQueries({ queryKey: ["leads"] });
        }
        setIsLoading(false);
        console.log(values);
    }
    return (
    <React.Fragment>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="contactNo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact No</FormLabel>
                                <FormControl>
                                    <Input placeholder="Contact No" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="whatsApp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>WhatsApp No</FormLabel>
                                <FormControl>
                                    <Input placeholder="WhatsApp No" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="projectID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project / Product</FormLabel>
                                <FormControl>
                                    <Products
                                        {...field}
                                        onValueChange={(val: number) => field.onChange(Number(val))}
                                        value={field.value?.toString() ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="referenceID"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lead Channels</FormLabel>
                                <FormControl>
                                    <LeadChannels
                                        {...field}
                                        onValueChange={(val: string) => field.onChange(Number(val))}
                                        value={field.value?.toString() ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sourceofComunication"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Source Of Comunication</FormLabel>
                                <FormControl>
                                    <Input placeholder="Source Of Comunication" {...field} />
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
                                                setShowActivity(false);
                                            } else {
                                                setShowActivity(true);
                                            }
                                        }}
                                        value={field.value?.toString() ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {lead.leadId == 0 && showActivity && (
                    <React.Fragment>
                        <DialogHeader>
                            <DialogTitle>Next Activity</DialogTitle>
                        </DialogHeader>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                            <FormItem>
                                <FormLabel>Next Activity Date : </FormLabel>
                                <FormControl>
                                    <DateTimePicker date={nextActivityDate} setDate={setNextActivityDate} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
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
                                name="remarks"
                                render={({ field }) => (
                                    <FormItem className="col-span-4">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </React.Fragment>)}

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
    </React.Fragment>);
};

export default LeadForm;