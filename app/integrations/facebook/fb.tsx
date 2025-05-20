import { Plus, RefreshCcw, Unplug } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { facebookService } from "~/api/integrations/facebook";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import FacebookProfile from "./components/fb-profile";
import type { z } from "zod";
import type { profileSchema } from "./data/profile-schema";

declare global {
    interface Window {
        fbAsyncInit?: () => void;
        FB: any;
    }
}

const fb = () => {
    const [sdkReady, setSdkReady] = useState(false);
    const navigate = useNavigate();
    const [fbProfile,setFBProfile] = useState<z.infer<typeof profileSchema>>({} as z.infer<typeof profileSchema>);
    const [isLoading, setIsLoading] = useState(false);

    // Effect hook for loading the Facebook SDK
    useEffect(() => {
        if (typeof window === "undefined") return;

        // If SDK already loaded, just mark ready
        if (window.FB) {
            setSdkReady(true);
            return;
        }

        // Define fbAsyncInit before loading the script
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "1362796111627658", // Replace with your actual Facebook App ID
                cookie: true,
                xfbml: true,
                version: "v22.0",
            });
            setSdkReady(true);
        };

        // Check if script already exists
        if (!document.getElementById("facebook-jssdk")) {
            const script = document.createElement("script");
            script.id = "facebook-jssdk";
            script.src = "https://connect.facebook.net/en_US/sdk.js";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }

        // Cleanup if component unmounts
        return () => {
            if (window.fbAsyncInit) {
                delete window.fbAsyncInit;
            }
            const el = document.getElementById("facebook-jssdk");
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
    }, []);

    // Handle the Facebook login
    const handleLogin = () => {
        window.FB.login(
            (response: any) => {
                if (response.authResponse) {
                    try {
                        // Send the token to the backend for authentication
                        facebookService.Profile(
                            response.authResponse.accessToken as string
                        ).then((res) => {
                            console.log(res)
                            setFBProfile(res);
                            setIsLoading(true);

                        })
                            .catch(() => {
                                toast.error("An error occurred while processing the login.");
                            });
                    } catch (error) {
                        toast.error("An error occurred while processing the login.");
                    }
                } else {
                    toast.error("User cancelled or did not authorize.");
                }
            },
            { scope: "email,pages_show_list,ads_management,leads_retrieval,pages_read_engagement,pages_manage_metadata,pages_read_user_content,pages_manage_posts,pages_manage_engagement,pages_manage_ads,public_profile" }
        );
    };

    return (
        <React.Fragment>
            <div>
                {sdkReady ? (
                    <Button variant="outline" type="button" onClick={handleLogin} className="float-end">
                        <Unplug /> Connect Account
                    </Button>
                ) : (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
            </div>
            <Separator />
            <div className="flex justify-center items-center text-muted-foreground">
                Click on the &nbsp;<strong> Connect Account </strong>&nbsp; button to sync your Facebook leads, messages, and campaigns securely.
            </div>
            <div className="flex justify-center items-center text-muted-foreground">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </div>
            {isLoading && (
                <FacebookProfile Profile={fbProfile}></FacebookProfile>
            )}
            
        </React.Fragment>
    );
};

export default fb;
