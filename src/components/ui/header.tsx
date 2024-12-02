"use client"

import { Bell } from "lucide-react";
import { Button } from "./button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import UserAvatarMenu from "./user-avatar-menu";
import { useAuth } from "@/features/auth/context/auth-context";


export const Header = () => {

    const { role } = useAuth();
    const pathname = usePathname();

    let paths
    if (pathname.split("/").length === 2) {
        let basicRole = "";
        switch (role) {
            case "estudiante":
                basicRole = "Convocatorias disponibles";
                break;
            case "jurado":
                basicRole = "Proyectos a evaluar";
                break;
            case "admin":
                basicRole = "Dashboard";
                break;
            default:
                break;
        }
        paths = [basicRole];
    } else {
        paths = pathname.split("/").filter((path) => (path !== "" && path !== role));
    }


    return (
        <header className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-7">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center justify-center">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {
                                    paths.map((path, index) => {
                                        const isLast = index === paths.length - 1;
                                        const uniqueKey = `${index}-${path}-${Date.now()}`;
                                        path = path.replace(/-/g, " ");

                                        return isLast ? (
                                            <BreadcrumbItem key={uniqueKey} className="hidden md:block">
                                                <BreadcrumbPage>{path.charAt(0).toUpperCase() + path.slice(1)}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        ) : (
                                            <React.Fragment key={uniqueKey}>
                                                <BreadcrumbItem key={`breadcrumb-${index}-${path}`} className="hidden md:block">
                                                    <BreadcrumbLink className="hover:cursor-pointer" onClick={() => history.back()}>
                                                        {path.charAt(0).toUpperCase() + path.slice(1)}
                                                    </BreadcrumbLink>
                                                </BreadcrumbItem>
                                                <BreadcrumbSeparator key={`separator-${index}`} className="hidden md:block" />
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="ml-4 flex items-center md:ml-6">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-6 w-6" />
                        </Button>
                        <UserAvatarMenu />

                    </div>
                </div>
            </div>
        </header>
    );
};