import { Outlet } from "react-router";
import { AppSidebar } from "~/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import  Cookies from "js-cookie";


export default function _Layout() {
    const defaultOpen = Cookies.get("sidebar_state") === "true" ?? true;
    console.log(defaultOpen)
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Outlet />
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}















// import React from "react";
// import { Outlet } from "react-router";
// import { AppSidebar } from "~/components/app-sidebar";
// import { Separator } from "~/components/ui/separator";
// import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
// import  Cookies from "js-cookie";

// export default async function _Layout({
//     children,
//   }: Readonly<{
//     children: React.ReactNode
//   }>) {
//     const defaultOpen = Cookies.get("sidebar_state") === "true" ?? false;
//     return (
//       <SidebarProvider defaultOpen={defaultOpen}>
//         <AppSidebar />
//         <SidebarInset>
//           <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
//             <div className="flex h-14 w-full items-center gap-2 px-4">
//               <SidebarTrigger className="-ml-1.5" />
//               <Separator
//                 orientation="vertical"
//                 className="mr-2 data-[orientation=vertical]:h-4"
//               />
//               {/* <NavHeader /> */}
//               <div className="ml-auto flex items-center gap-2">
//                 {/* <ThemeSelector />
//                 <ModeSwitcher /> */}
//               </div>
//             </div>
//           </header>
//           {children}
//         </SidebarInset>
//       </SidebarProvider>
//     )
//   }