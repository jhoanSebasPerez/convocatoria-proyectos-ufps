"use client";

import RoleRoute from "@/components/role-route";
import { Header } from "@/components/ui/header";

import { ResponsiveSidebar } from "@/components/ui/responsive-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Archive, FolderKanban, Trophy } from 'lucide-react';
import React from "react";

const estudianteRoutes = {
    "convocatoriasDisponibles": {
        url: "/estudiante",
        name: "Convocatorias Disponibles",
        icon: <Trophy className="mr-3 h-6 w-6" />,
    },
    "mis-convocatorias": {
        url: "/estudiante/mis-convocatorias",
        name: "Mis convocatorias",
        icon: <Archive className="mr-3 h-6 w-6" />,
    },
    "mis-proyectos": {
        url: "/estudiante/mis-proyectos",
        name: "Mis Proyectos",
        icon: <FolderKanban className="mr-3 h-6 w-6" />,
    },
};

export default function EstudianteLayout({ children }: { children: React.ReactNode }) {

    return (
        <RoleRoute allowedRoles={["estudiante"]}>
            <SidebarProvider>
                <ResponsiveSidebar routes={estudianteRoutes} role="Estudiante" />
                <SidebarInset>
                    <Header />
                    <div className="flex gap-4 p-4 ml-5">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </RoleRoute>
    );
}