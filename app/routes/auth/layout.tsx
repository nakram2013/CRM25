import React from "react";
import { Outlet } from "react-router";

const layout: React.FC = () => {
    return (
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
                </section>
            </div>
        </div>
    );
};

export default layout;