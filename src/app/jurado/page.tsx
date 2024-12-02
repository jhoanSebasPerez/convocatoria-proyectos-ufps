'use client'

import * as React from 'react'
import { useState } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from '@/hooks/use-toast'

interface Project {
    id: string
    name: string
    description: string
}

interface Rubric {
    id: string
    name: string
    criteria: {
        id: string
        name: string
        maxScore: number
    }[]
}

const projects: Project[] = [
    { id: '1', name: 'Web Development Portfolio', description: 'A showcase of web development projects' },
    { id: '2', name: 'Machine Learning Algorithm', description: 'An implementation of a novel ML algorithm' },
    { id: '3', name: 'Mobile App for Fitness Tracking', description: 'An iOS and Android app for tracking workouts' },
]

const rubrics: Rubric[] = [
    {
        id: '1',
        name: 'General Project Rubric',
        criteria: [
            { id: '1', name: 'Content Quality', maxScore: 10 },
            { id: '2', name: 'Presentation', maxScore: 10 },
            { id: '3', name: 'Innovation', maxScore: 10 },
        ]
    },
    {
        id: '2',
        name: 'Technical Project Rubric',
        criteria: [
            { id: '1', name: 'Code Quality', maxScore: 10 },
            { id: '2', name: 'Functionality', maxScore: 10 },
            { id: '3', name: 'Documentation', maxScore: 10 },
        ]
    }
]

export default function GradeProjectPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [selectedRubric, setSelectedRubric] = useState<Rubric | null>(null)
    const [grades, setGrades] = useState<{ [key: string]: number }>({})
    const [finalGrade, setFinalGrade] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const { toast } = useToast()

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleProjectSelect = (project: Project) => {
        setSelectedProject(project)
        setSelectedRubric(null)
        setGrades({})
        setFinalGrade(null)
    }

    const handleRubricSelect = (rubricId: string) => {
        const rubric = rubrics.find(r => r.id === rubricId)
        setSelectedRubric(rubric || null)
        setGrades({})
        setFinalGrade(null)
    }

    const handleGradeChange = (criteriaId: string, value: number) => {
        setGrades(prev => ({ ...prev, [criteriaId]: value }))
    }

    const calculateFinalGrade = () => {
        if (!selectedRubric) return

        const totalScore = selectedRubric.criteria.reduce((sum, criterion) => {
            return sum + (grades[criterion.id] || 0)
        }, 0)

        const maxPossibleScore = selectedRubric.criteria.reduce((sum, criterion) => sum + criterion.maxScore, 0)
        const finalGradePercentage = (totalScore / maxPossibleScore) * 100
        setFinalGrade(Math.round(finalGradePercentage * 10) / 10) // Round to 1 decimal place
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (!selectedProject || !selectedRubric || !finalGrade) {
            toast({
                title: "Incomplete Grading",
                description: "Please select a project, complete all criteria, and calculate the final grade before submitting.",
                variant: "destructive"
            })
            return
        }
        // Here you would typically send the grades and final grade to your backend
        console.log("Project:", selectedProject.name)
        console.log("Rubric:", selectedRubric.name)
        console.log("Grades:", grades)
        console.log("Final Grade:", finalGrade)
        toast({
            title: "Calificación Enviada",
            description: `El proyecto "${selectedProject.name}" ha sido agregado con la calificación final de: ${finalGrade}%`,
        })
        setOpenDialog(false)
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-5">Calificación de proyecto</h1>
            <form onSubmit={handleSubmit}>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Seleccion de proyecto</CardTitle>
                        <CardDescription>Elige un proyecto que deseas calificar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Search className="w-5 h-5 text-gray-500" />
                                <Input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-grow"
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {filteredProjects.map(project => (
                                    <Card
                                        key={project.id}
                                        className={`cursor-pointer transition-colors ${selectedProject?.id === project.id ? 'border-primary' : ''
                                            }`}
                                        onClick={() => handleProjectSelect(project)}
                                    >
                                        <CardHeader>
                                            <CardTitle>{project.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>{project.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {selectedProject && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Selecciona la rúbrica</CardTitle>
                            <CardDescription>Elige la rúbrica apropiada {selectedProject.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select onValueChange={handleRubricSelect}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a rubric" />
                                </SelectTrigger>
                                <SelectContent>
                                    {rubrics.map(rubric => (
                                        <SelectItem key={rubric.id} value={rubric.id}>{rubric.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>
                )}

                {selectedRubric && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Criterio de calificación</CardTitle>
                            <CardDescription>Asigna puntaje para cada criterio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {selectedRubric.criteria.map(criterion => (
                                    <AccordionItem key={criterion.id} value={criterion.id}>
                                        <AccordionTrigger>{criterion.name}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor={`grade-${criterion.id}`}>Score (0-{criterion.maxScore})</Label>
                                                    <span className="text-2xl font-bold">{grades[criterion.id] || 0}</span>
                                                </div>
                                                <Slider
                                                    id={`grade-${criterion.id}`}
                                                    min={0}
                                                    max={criterion.maxScore}
                                                    step={1}
                                                    value={[grades[criterion.id] || 0]}
                                                    onValueChange={([value]) => handleGradeChange(criterion.id, value)}
                                                />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                        <CardFooter>
                            <Button type="button" onClick={calculateFinalGrade}>Calcular la calificación final</Button>
                        </CardFooter>
                    </Card>
                )}

                {finalGrade !== null && (
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Calificación final</CardTitle>
                            <CardDescription>Revisa y envía la calificación final para el proyecto: {selectedProject?.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center">
                                <span className="text-4xl font-bold">{finalGrade}%</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                                <DialogTrigger asChild>
                                    <Button type="button" onClick={() => setOpenDialog(true)}>Enviar calificación</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Confirmar envío de calificación</DialogTitle>
                                        <DialogDescription>
                                            Estás seguro de que deseas enviar la calificación final?
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <p><strong>Project:</strong> {selectedProject?.name}</p>
                                        <p><strong>Rubric:</strong> {selectedRubric?.name}</p>
                                        <p><strong>Final Grade:</strong> {finalGrade}%</p>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleSubmit}>Confirmas envío</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                )}
            </form>
            <Toaster />
        </div>
    )
}