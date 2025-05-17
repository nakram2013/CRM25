import React from "react";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Icons } from "~/components/icons";
import { toast } from "sonner";
import { userSchema } from "../data/user-schema";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { profileService } from "~/api/profile-service";
import dropdowns from "~/data/app-dropdowns.json";

const UserForm = ({ data, onClose }: { data: z.infer<typeof userSchema>; onClose: () => void; }) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm<LeadFormData>({
    //     resolver: zodResolver(leadSchema),
    // });
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {...data,
            gender: Number(data.gender), 
            role: Number(data.role),
            status: Number(data.status)},
        mode: "onBlur",
    })
    
    const queryClient = useQueryClient();
    async function onSubmit(values: z.infer<typeof userSchema>) {
        setIsLoading(true);
        var res = values?.userID == 0 ? await profileService.Register(values) : await profileService.update(values);
        console.log(res);
        if (res.success) {
            toast(res.message)
            onClose();

            queryClient.invalidateQueries({ queryKey: ["Users"] });
        }
        setIsLoading(false);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-1" key={data.userID}>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => {
                            return (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First Name" {...field}  />
                                </FormControl>
                                <FormMessage />
                            </FormItem>)
                        }}
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
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                            onValueChange={(val) => field.onChange(Number(val))}
                                        //defaultValue={field.value.toString()}
                                        value={field.value?.toString()}
                                        className="flex flex-row space-x-4"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="1" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Male
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="0" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Female
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role / Position</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(val: string) => field.onChange(val)}
                                        value={field.value?.toString() ?? ''}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Role / Position" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Role / Position</SelectLabel>
                                                {dropdowns.userRoles.map((item, index) => (

                                                    <SelectItem key={index} value={item.value}>
                                                        {item.text}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={(val: string) => field.onChange(val)}
                                        value={field.value?.toString() ?? ''}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Status</SelectLabel>
                                                {dropdowns.userStatus.map((item, index) => (

                                                    <SelectItem key={index} value={item.value}>
                                                        {item.text}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className="mt-5">
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
        </Form>);
};

export default UserForm;