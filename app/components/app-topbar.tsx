import { Outlet } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { SidebarInset, SidebarTrigger } from "./ui/sidebar";
import { useFrameworkContext } from "~/context/FrameworkContext";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";

const AppTopbar = () => {
    const { state } = useFrameworkContext();
    const user = state.user;
    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
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
                <div className="px-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.Image} alt={(user?.firstName.slice(0, 1).toUpperCase() ?? "") + user?.lastName.slice(0, 1).toUpperCase()} />
                                <AvatarFallback>{(user?.firstName.slice(0, 1).toUpperCase() ?? "") + user?.lastName.slice(0, 1).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Sparkles />
                                    Upgrade to Pro
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Account
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Outlet />
            </div>
        </SidebarInset>
    )
}
export default AppTopbar;