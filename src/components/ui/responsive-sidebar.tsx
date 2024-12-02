'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { BarChart3, FolderKanban, Trophy, Users } from 'lucide-react';

interface ResponsiveSidebarProps {
    routes: Record<string, { url: string; name: string; icon: React.ReactNode }>;
    role: string;
}

export function ResponsiveSidebar({ routes, role }: ResponsiveSidebarProps) {

    const pathname = usePathname();
    const paths = pathname.split("/");


    let active = "";

    switch (role) {
        case "Estudiante":
            active = "convocatoriasDisponibles";
            break;
        case "Jurado":
            active = "ProyectosEvaluar";
            break;
        case "Administrador":
            active = "dashboard";
            break;
        default:
            break;
    }



    if (paths.length > 2) {
        active = paths[2];
    }

    return (
        <aside className="hidden w-64 overflow-y-auto bg-gray-800 md:block">
            <div className="flex h-full flex-col">
                <div className="flex items-center justify-center h-16 bg-gray-900">
                    <span className="text-white font-bold text-lg">{role}</span>
                </div>
                <nav className="mt-5 flex-1 px-2 space-y-1">

                    {
                        Object.entries(routes).map(([key, value]) => {
                            const isActive = active === key;

                            return isActive ? (
                                <Link key={key} href={value.url} className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-gray-900">
                                    {value.icon}
                                    {value.name}
                                </Link>
                            ) : (
                                <Link key={key} href={value.url} className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                                    {value.icon}
                                    {value.name}
                                </Link>
                            )
                        })
                    }

                </nav>
            </div>
        </aside>
    )
}