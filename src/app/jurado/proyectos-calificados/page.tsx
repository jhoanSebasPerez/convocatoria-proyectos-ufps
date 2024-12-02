'use client'

import * as React from 'react'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, Star } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface RatedProject {
    id: string
    name: string
    studentName: string
    dateRated: string
    rubricName: string
    grade: number
    criteria: {
        name: string
        score: number
        maxScore: number
    }[]
}

const mockRatedProjects: RatedProject[] = [
    {
        id: '1',
        name: 'Web Development Portfolio',
        studentName: 'Alice Johnson',
        dateRated: '2023-11-15',
        rubricName: 'Web Development Rubric',
        grade: 92,
        criteria: [
            { name: 'Design', score: 9, maxScore: 10 },
            { name: 'Functionality', score: 18, maxScore: 20 },
            { name: 'Code Quality', score: 28, maxScore: 30 },
            { name: 'Documentation', score: 37, maxScore: 40 },
        ]
    },
    {
        id: '2',
        name: 'Machine Learning Algorithm',
        studentName: 'Bob Smith',
        dateRated: '2023-11-14',
        rubricName: 'AI Project Rubric',
        grade: 88,
        criteria: [
            { name: 'Algorithm Design', score: 35, maxScore: 40 },
            { name: 'Implementation', score: 25, maxScore: 30 },
            { name: 'Performance', score: 18, maxScore: 20 },
            { name: 'Documentation', score: 10, maxScore: 10 },
        ]
    },
    {
        id: '3',
        name: 'Mobile Fitness App',
        studentName: 'Charlie Brown',
        dateRated: '2023-11-13',
        rubricName: 'Mobile App Development Rubric',
        grade: 95,
        criteria: [
            { name: 'User Interface', score: 28, maxScore: 30 },
            { name: 'Functionality', score: 25, maxScore: 25 },
            { name: 'Performance', score: 23, maxScore: 25 },
            { name: 'Innovation', score: 19, maxScore: 20 },
        ]
    },
]

export default function EvaluatorRatedProjectsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState<{ key: keyof RatedProject, direction: 'asc' | 'desc' } | null>(null)
    const [selectedProject, setSelectedProject] = useState<RatedProject | null>(null)

    const sortedProjects = React.useMemo(() => {
        let sortableProjects = [...mockRatedProjects]
        if (sortConfig !== null) {
            sortableProjects.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1
                }
                return 0
            })
        }
        return sortableProjects
    }, [sortConfig])

    const filteredProjects = sortedProjects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const requestSort = (key: keyof RatedProject) => {
        let direction: 'asc' | 'desc' = 'asc'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({ key, direction })
    }

    const SortIcon = ({ columnKey }: { columnKey: keyof RatedProject }) => {
        if (sortConfig?.key === columnKey) {
            return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        }
        return null
    }

    return (
        <div className="container mx-auto py-5 px-4">
            <h1 className="text-3xl font-bold mb-5">Tus proyectos calificados</h1>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Lista de proyectos</CardTitle>
                    <CardDescription>Revisa los proyectos que has calificado</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-2 mb-4">
                        <Search className="w-5 h-5 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search projects or students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
                                        Nombre del proyecto <SortIcon columnKey="name" />
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => requestSort('studentName')}>
                                        Nombre del estudiante <SortIcon columnKey="studentName" />
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => requestSort('dateRated')}>
                                        Puntaje del proyecto <SortIcon columnKey="dateRated" />
                                    </TableHead>
                                    <TableHead className="cursor-pointer" onClick={() => requestSort('grade')}>
                                        Calificación <SortIcon columnKey="grade" />
                                    </TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.map((project) => (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.name}</TableCell>
                                        <TableCell>{project.studentName}</TableCell>
                                        <TableCell>{project.dateRated}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center">
                                                {project.grade}%
                                                <Star className="w-4 h-4 ml-1 text-yellow-400 fill-current" />
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                                                        View Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-3xl">
                                                    <DialogHeader>
                                                        <DialogTitle>{selectedProject?.name}</DialogTitle>
                                                        <DialogDescription>
                                                            Graded on {selectedProject?.dateRated} using {selectedProject?.rubricName}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="mt-4">
                                                        <h3 className="text-lg font-semibold mb-2">Student: {selectedProject?.studentName}</h3>
                                                        <h4 className="text-md font-semibold mb-2">Final Grade: {selectedProject?.grade}%</h4>
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Criterion</TableHead>
                                                                    <TableHead>Score</TableHead>
                                                                    <TableHead>Max Score</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {selectedProject?.criteria.map((criterion, index) => (
                                                                    <TableRow key={index}>
                                                                        <TableCell>{criterion.name}</TableCell>
                                                                        <TableCell>{criterion.score}</TableCell>
                                                                        <TableCell>{criterion.maxScore}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}