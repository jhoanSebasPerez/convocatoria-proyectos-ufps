"use client";

import RoleRoute from "@/components/role-route";
import { Header } from "@/components/ui/header";

import { ResponsiveSidebar } from "@/components/ui/responsive-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { BarChart3, FolderKanban } from 'lucide-react';
import React from "react";

const juradoRoutes = {
    ProyectosEvaluar: {
        url: "/jurado",
        name: "Proyectos a evaluar",
        icon: <FolderKanban className="mr-3 h-6 w-6" />
    },
    ProyectosCalificados: {
        url: "/jurado/proyectos-calificados",
        name: "Proyectos calificados",
        icon: <BarChart3 className="mr-3 h-6 w-6" />,
    }
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <RoleRoute allowedRoles={["jurado"]}>
            <SidebarProvider>
                <ResponsiveSidebar routes={juradoRoutes} role="Jurado" />
                <SidebarInset>
                    <Header />
                    <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </RoleRoute>
    );
}