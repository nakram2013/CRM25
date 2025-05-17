import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { apiService } from "~/api/api-service";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB: any;
  }
}

const LoginWithFacebook = () => {
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

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
            apiService.post("/api/account/LoginwithSocial", {
              token: response.authResponse.accessToken as string,
              type: "Facebook",
            }).then((res) => {
              if (res.token) {
                localStorage.setItem("authToken", res.token);
                navigate('/'); // Redirect to the home page
              } else {
                toast.error(res.message || "Failed to authenticate with Facebook");
              }
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
      { scope: "email,pages_show_list" }
    );
  };

  return (
    <React.Fragment>
      {sdkReady ? (
        <Button variant="outline" type="button" onClick={handleLogin}>
          Login with Facebook
        </Button>
      ) : (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      )}
    </React.Fragment>
  );
};

export default LoginWithFacebook;
