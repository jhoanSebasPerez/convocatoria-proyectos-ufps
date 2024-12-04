"use client";

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ProjectDetail, DocenteAsignado } from '../types/project-detail';
import { getStatusColor } from "../constansts";
import { Button } from "@/components/ui/button";
import SearchableSelector from '@/features/proyectos/components/searchable-selector';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { useGetUsers } from "@/features/usuarios/api/use-get-users";
import { useEffect, useState } from "react";
import { useUpdatedProyecto } from "../api/use-put-project";
import { CreateProyecto } from "../types/project-create";
import { Loader } from "lucide-react";

interface ProjectDetailProps {
    project: ProjectDetail;
    refetch: () => void;
}


export default function DetailedProjectView({ project, refetch }: ProjectDetailProps) {

    const [docente, setDocente] = useState<DocenteAsignado | undefined>(undefined);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { mutate: asignarDocente } = useUpdatedProyecto();
    const { refetch: getUsers, data: allUsers = [] } = useGetUsers();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const docentes = allUsers.filter(user => user.id_rol === "2");

    const handleAsignarDocente = () => {
        if (!docente || !project) {
            console.error("Docente o proyecto no definido");
            return;
        }

        setIsSubmitting(true);
        const updatedProyecto: CreateProyecto = {
            titulo: project.titulo,
            descripcion: project.descripcion,
            estado: project.estado,
            fecha_inscripcion: project.fecha_inscripcion.toString(),
            calificacion_final: parseInt(project.calificacion_final),
            id_categoria: project.CategoriaConvocatorium.id_categoria,
            integrantes: project.integrantes.map(integrante => integrante.id_usuario),
            id_usuario: docente.id_usuario,
        };

        asignarDocente(
            { idProyecto: project.id_proyecto, proyectoUpdated: updatedProyecto },
            {
                onSuccess: () => {
                    refetch();
                    setIsSubmitting(false);
                    setIsDialogOpen(false);
                },
            }
        );
    };


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    if (project === null) {
        return null;
    }

    return (
        <div className="space-y-6 p-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold">{project.titulo}</CardTitle>
                        <Badge className={getStatusColor(project.estado)}>{project.estado}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Basic Project Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Project ID</p>
                                <p>{project.id_proyecto}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Registration Date</p>
                                <p>{project.fecha_inscripcion ? formatDate(project.fecha_inscripcion.toString()) : "Fecha no disponible"}</p>                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Final Grade</p>
                                <p>{project.calificacion_final || 'Not graded yet'}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Category</p>
                                <Badge variant="outline">
                                    {project.CategoriaConvocatorium ? project.CategoriaConvocatorium.nombre_categoria : "Categoría no disponible"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Description</p>
                        <p className="mt-1">{project.descripcion}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Profesor Asignado</CardTitle>
                </CardHeader>
                <CardContent>
                    {project.docente_asignado.id_usuario == "1" ? (
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">No hay profesor asignado</p>
                            <Dialog
                                open={isDialogOpen}
                                onOpenChange={(isOpen) => setIsDialogOpen(isOpen)} // Cierra el dialog cuando se hace clic fuera
                            >
                                <DialogTrigger asChild>
                                    <Button onClick={() => setIsDialogOpen(true)}>Asignar docente</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Asignar docente</DialogTitle>
                                        <DialogDescription>
                                            Selecciona un docente que se encargará de calificar este proyecto.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div>
                                        <Label className='font-bold space-y-3'>Seleccione el docente</Label>
                                        <SearchableSelector
                                            users={docentes}
                                            onSelect={(user) => setDocente(user || undefined)}
                                        />
                                        <Button className="w-full mt-7" onClick={handleAsignarDocente} disabled={isSubmitting}>
                                            {isSubmitting && <Loader className="mr-2 h-4 w-4" />}
                                            Asignar
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>{project.docente_asignado.nombre}{project.docente_asignado.apellido}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{project.docente_asignado.nombre} {project.docente_asignado.apellido}</p>
                                <p className="text-sm text-gray-500">{project.docente_asignado.correo}</p>
                                <p className="text-sm text-gray-500">ID: {project.docente_asignado.id_usuario}</p>
                            </div>
                        </div>
                    )
                    }
                </CardContent >
            </Card >

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">Participantes del proyecto</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Apellido</TableHead>
                                <TableHead>Correo Electrónico</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {project.integrantes.map((member) => (
                                <TableRow key={member.id_usuario}>
                                    <TableCell>{member.id_usuario}</TableCell>
                                    <TableCell>{member.nombre}</TableCell>
                                    <TableCell>{member.apellido}</TableCell>
                                    <TableCell>{member.correo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div >
    )
}