import { useNavigate } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import Cookies from "js-cookie";
import { Toaster } from "sonner";
import { FrameworkProvider } from "~/context/framework-context";
import { useEffect, useState } from "react";
import AppTopbar from "~/components/app-topbar";


export default function _Layout() {
    //const defaultOpen = Cookies.get("sidebar_state") === "true" ?? true;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate('/Login', { replace: true }); // Optional: avoid back button loop
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);



    return (
        isAuthenticated ? (
            <FrameworkProvider>
                <SidebarProvider defaultOpen={true}>
                    <AppSidebar />
                    <AppTopbar />
                    <Toaster />
                </SidebarProvider>
            </FrameworkProvider>
        ) : (<div className="flex justify-center items-center h-screen text-muted-foreground">
            Checking authentication...
        </div>)

    )
}

