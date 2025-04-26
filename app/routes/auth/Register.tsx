import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import loginImage from '../../assets/images/login.jpg';
import { cn } from "~/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { registerSchema } from "./data/register-schema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";
import { Icons } from "~/components/icons";
import { Eye, EyeOff } from "lucide-react";
import { userService } from "~/api/userService";
import { toast } from "sonner";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        //defaultValues: {...data},
        mode: "onBlur",
    })
    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        var res = await userService.Register(values);
        toast.success(res.message)
        if(res.success){
            navigate("/Login");
        }
        
        // if (res.success) {
        //     toast(res.message)
        // }
        setIsLoading(false);
    }
    return (<div className="grid min-h-svh lg:grid-cols-2">

        <div className="bg-muted relative hidden lg:block">
            <img
                src={loginImage}
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex gap-2 justify-between">
                <a href="#" className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        {/* <GalleryVerticalEnd className="size-4" /> */}
                    </div>
                    The SQ
                </a>
                <Button asChild>
                    <Link to="/login">Login</Link>
                </Button>
            </div>
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-xs">
                    <div className={cn("grid gap-6")}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="p-1">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>First Name</FormLabel> */}
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
                                                {/* <FormLabel>Last Name</FormLabel> */}
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
                                                {/* <FormLabel>Last Name</FormLabel> */}
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => {
                                            const [showPassword, setShowPassword] = useState(false);

                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Password"
                                                                className="pr-10" // space for icon
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                                onClick={() => setShowPassword((prev) => !prev)}
                                                                tabIndex={-1} // optional: avoids tabbing into button
                                                            >
                                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="repeatPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                {/* <FormLabel>Last Name</FormLabel> */}
                                                <FormControl>
                                                    <Input placeholder="Repeat Password" type="password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        ) : ""}{" "} Create</Button>
                                </div>
                            </form>
                        </Form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        {/* <Button variant="outline" type="button" disabled={isLoading}>
                       {isLoading ? (
                           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                       ) : (
                           <Icons.gitHub className="mr-2 h-4 w-4" />
                       )}{" "}
                       GitHub
                   </Button> */}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Register;