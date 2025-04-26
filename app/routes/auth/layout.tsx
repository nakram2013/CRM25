import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";


const layout: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId="197159690228-jrlmp8mb947uc29s33f16b5p03llefqj.apps.googleusercontent.com">
            <div className="container-wrapper">
                <div>
                    <section className="overflow-hidden rounded-lg border bg-background shadow-md md:hidden md:shadow-xl">
                        {/* <Image
                        src="/examples/cards-light.png"
                        width={1280}
                        height={1214}
                        alt="Cards"
                        className="block dark:hidden"
                    />
                    <Image
                        src="/examples/cards-dark.png"
                        width={1280}
                        height={1214}
                        alt="Cards"
                        className="hidden dark:block"
                    /> */}
                    </section>
                    <section
                        className="hidden md:block [&>div]:p-0"
                        style={
                            {
                                "--radius": "0.75rem",
                            } as React.CSSProperties
                        }
                    >
                        <Outlet /> {/* Render nested routes here */}
                        <Toaster />
                    </section>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default layout;