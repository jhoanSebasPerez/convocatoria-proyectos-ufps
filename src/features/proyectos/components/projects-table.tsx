'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, Eye } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { getStatusColor } from '../constansts';
import { ProjectList } from '../types/project-list'

interface ProyectTableProps {
    projects: ProjectList[]
}


export default function ProjectsTable({ projects }: ProyectTableProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value)
    }

    const handleSort = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    }

    const filteredProjects = projects && projects
        .filter(project => project.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(project => statusFilter === 'All' || project.estado === statusFilter)
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.fecha_inscripcion).getTime() - new Date(b.fecha_inscripcion).getTime()
            } else {
                return new Date(b.fecha_inscripcion).getTime() - new Date(a.fecha_inscripcion).getTime()
            }
        })


    return (
        <div className="space-y-4 w-full">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="max-w-sm"
                    />
                    <Search className="h-4 w-4 text-gray-500" />
                </div>
                <Select onValueChange={handleStatusFilter} defaultValue="All">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">Todos los estados</SelectItem>
                        <SelectItem value="En progreso">En progreso</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleSort} variant="outline" className="w-full md:w-auto">
                    Ordenar por fecha de inscripción {sortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>                            <TableHead>Título del proyecto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha de inscripción</TableHead>
                            <TableHead>Calificación final</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!!filteredProjects && filteredProjects.map((project) => (
                            <TableRow key={project.id_proyecto}>
                                <TableCell>{project.titulo}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(project.estado)}>{project.estado}</Badge>
                                </TableCell>
                                <TableCell>{new Date(project.fecha_inscripcion).toLocaleDateString()}</TableCell>
                                <TableCell>{project.calificacion_final !== null ? project.calificacion_final : 'N/A'}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/proyectos/${project.id_proyecto}`}>
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}