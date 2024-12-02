"use client";

import RoleRoute from "@/components/role-route";
import { Header } from "@/components/ui/header";

import { ResponsiveSidebar } from "@/components/ui/responsive-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BarChart3, FolderKanban, Trophy, Users } from 'lucide-react';
import React from "react";

const adminRoutes = {
    dashboard: {
        url: "/admin",
        name: "Dashboard",
        icon: <BarChart3 className="mr-3 h-6 w-6" />
    },
    proyectos: {
        url: "/admin/proyectos",
        name: "Proyectos",
        icon: <FolderKanban className="mr-3 h-6 w-6" />,
    },
    convocatorias: {
        url: "/admin/convocatorias",
        name: "Convocatorias",
        icon: <Trophy className="mr-3 h-6 w-6" />,
    },
    usuarios: {
        url: "/admin/usuarios",
        name: "Usuarios",
        icon: <Users className="mr-3 h-6 w-6" />,
    }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <RoleRoute allowedRoles={["admin"]}>
            <SidebarProvider>
                <ResponsiveSidebar routes={adminRoutes} role="Administrador" />
                <SidebarInset>
                    <Header />
                    <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </RoleRoute>
    );
}