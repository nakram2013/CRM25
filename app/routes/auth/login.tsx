import React from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import type { ILogin } from "~/types/ILogin";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; // Ensure it's lowercase everywhere
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { userService } from "~/api/userService";
import loginImage from '../../assets/images/Full-Logo.png';
import LoginWithGoogle from './components/login-with-google';
import LoginWithFacebook from "./components/login-with-facebook";

const validationSchema = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
});
const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const navigate = useNavigate();
    // const [formSubmitting, setFormSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm<ILogin>({
        resolver: yupResolver(validationSchema),
    });
    const login = async (formData: ILogin) => {

        try {
            const users = await userService.Login(formData);
            if (users.token != "") {
                localStorage.setItem("authToken", users.token);
                navigate('/');
                //console.log(users);
            }
            //console.log(users);
        } catch (error: any) {
            setIsLoading(false);
            console.error('Error fetching users:', error.message);
        }
    };
    const onSubmit = async (data: ILogin) => {
        setIsLoading(true);
        await login(data);
    };
    return (
        <div className="grid min-h-svh lg:grid-cols-2">

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
                        The Smart Qafla
                    </a>
                    <Button asChild>
                        <Link to="/Register">Create an account</Link>
                    </Button>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <div className={cn("grid gap-6")}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-2">
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="email">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="Email"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...register('email')}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <Label className="sr-only" htmlFor="Password">
                                            Password
                                        </Label>
                                        <Input
                                            id="email"
                                            placeholder="Password"
                                            type="password"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            disabled={isLoading}
                                            {...register('password')}
                                        />
                                    </div>
                                    <Button disabled={isLoading}>
                                        {isLoading && (
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Sign In with Email
                                    </Button>
                                </div>
                            </form>
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
                            <LoginWithGoogle />
                            <LoginWithFacebook />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div className={cn("grid gap-6", className)} {...props}>
    );
};

export default Login;