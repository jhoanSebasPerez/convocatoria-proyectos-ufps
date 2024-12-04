'use client'

import * as React from 'react'
import { BarChart3, Users, FolderKanban, Trophy } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"

// Mock data for demonstration purposes
const recentProjects = [
    { id: 1, name: "Proyecto plataforma web para gestión de inventario", status: "En proceso" },
    { id: 2, name: "Proyecto semillero IA creación de agente para educación", status: "Completado" },
    { id: 3, name: "Proyecto de analisis de datos del sector automotriz", status: "En ejecución" },
]

const upcomingCompetitions = [
    { id: 1, name: "Convocatoria proyectos de aula 2023", date: "2024-06-15" },
    { id: 2, name: "Convocatoria proyectos semillero de programación web", date: "2024-07-01" },
    { id: 3, name: "Convocatoria proyectos semillero de IA", date: "2024-08-10" },
]

export default function DashboardPage() {
    return (
        <main className="flex-1 overflow-y-auto  p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Proyectos totales</CardTitle>
                        <FolderKanban className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">+2 desde el último mes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Convocatorias activas</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">1 finaliza esta semana</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usuarios totales</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground">+7% desde el último mes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasa de finalización</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78%</div>
                        <p className="text-xs text-muted-foreground">+2% desde el último mes</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Proyectos recientes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentProjects.map(project => (
                                <div key={project.id} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{project.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{project.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {project.status}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <Button variant="ghost" size="sm">View</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Próximas convocatorias</CardTitle>
                        <CardDescription>
                            No te pierdas las próximas convocatorias
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {upcomingCompetitions.map(competition => (
                                <div key={competition.id} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>{competition.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{competition.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(competition.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        <Button variant="ghost" size="sm">Details</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}