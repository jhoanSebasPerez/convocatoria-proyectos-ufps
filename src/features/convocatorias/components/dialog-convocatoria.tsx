'use client'

import * as React from 'react'
import { useState } from 'react'
import { CalendarIcon, Loader, Plus, PlusCircle, X } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CreateConvocatoria } from '../types/create-convocatoria'
import { useCreateConvocatoria } from '../api/use-create-convocatoria'
import { showToast } from '@/core/show-toast'
import { useToast } from '@/hooks/use-toast'

interface Category {
    id: string
    name: string
}

interface DialogConvocatoriaProps {
    refetch: () => void;
}

export default function DialogConvocatoria({ refetch }: DialogConvocatoriaProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [registrationStartDate, setRegistrationStartDate] = useState<Date>()
    const [registrationEndDate, setRegistrationEndDate] = useState<Date>()
    const [qualificationDeadline, setQualificationDeadline] = useState<Date>()
    const [callStartDate, setCallStartDate] = useState<Date>()
    const [callEndDate, setCallEndDate] = useState<Date>()
    const [categories, setCategories] = useState<Category[]>([])
    const [newCategory, setNewCategory] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();


    const { mutate: createConvocatoria } = useCreateConvocatoria()

    function formatDateToISO(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, así que sumamos 1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)
        // Here you would typically send the data to your backend
        const newConvocatoria: CreateConvocatoria = {
            nombre_convocatoria: name,
            fecha_inicio_inscripcion: formatDateToISO(registrationStartDate || new Date()),
            fecha_cierre_inscripcion: formatDateToISO(registrationEndDate || new Date()),
            fecha_limite_calificacion: formatDateToISO(qualificationDeadline || new Date()),
            fecha_inicio_convocatoria: formatDateToISO(callStartDate || new Date()),
            fecha_cierre_convocatoria: formatDateToISO(callEndDate || new Date()),
            categorias: categories.map(category => category.name),
        }

        createConvocatoria(newConvocatoria, {
            onSuccess: () => {
                refetch();
                showToast('Nueva convocatoria', 'Convocatoria creada exitosamente', toast)
                setTimeout(() => {
                    setIsSubmitting(false)
                    setOpen(false)
                }, 2000)
            },
            onError: () => {
                setIsSubmitting(false)
            }
        });

        // Reset form
        setName('')
        setRegistrationStartDate(undefined)
        setRegistrationEndDate(undefined)
        setQualificationDeadline(undefined)
        setCallStartDate(undefined)
        setCallEndDate(undefined)
        setCategories([])
    }

    const addCategory = () => {
        if (newCategory.trim() !== '') {
            setCategories([...categories, { id: Date.now().toString(), name: newCategory.trim() }])
            setNewCategory('')
        }
    }

    const removeCategory = (id: string) => {
        setCategories(categories.filter(category => category.id !== id))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg">
                    <Plus className="mr-2" />
                    Crear nueva convocatoria
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear nueva convocatoria</DialogTitle>
                    <DialogDescription>
                        Complete los campos a continuación para crear una nueva convocatoria.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reg-start" className="text-right">
                                Fecha inicio inscripción
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`col-span-3 justify-start text-left font-normal ${!registrationStartDate && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {registrationStartDate ? format(registrationStartDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={registrationStartDate}
                                        onSelect={setRegistrationStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="reg-end" className="text-right">
                                Fecha cierre inscripción
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`col-span-3 justify-start text-left font-normal ${!registrationEndDate && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {registrationEndDate ? format(registrationEndDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={registrationEndDate}
                                        onSelect={setRegistrationEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="qual-deadline" className="text-right">
                                Fecha límite calificación
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`col-span-3 justify-start text-left font-normal ${!qualificationDeadline && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {qualificationDeadline ? format(qualificationDeadline, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={qualificationDeadline}
                                        onSelect={setQualificationDeadline}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="call-start" className="text-right">
                                Fecha inicio convocatoria
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`col-span-3 justify-start text-left font-normal ${!callStartDate && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {callStartDate ? format(callStartDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={callStartDate}
                                        onSelect={setCallStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="call-end" className="text-right">
                                Fecha cierre convocatoria
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`col-span-3 justify-start text-left font-normal ${!callEndDate && "text-muted-foreground"
                                            }`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {callEndDate ? format(callEndDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={callEndDate}
                                        onSelect={setCallEndDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="categories" className="text-right">
                                Categorías
                            </Label>
                            <div className="col-span-3 space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Badge key={category.id} variant="secondary" className="flex items-center gap-1">
                                            {category.name}
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-auto p-0 text-base"
                                                onClick={() => removeCategory(category.id)}
                                            >
                                                <X className="h-3 w-3" />
                                                <span className="sr-only">Remove {category.name} category</span>
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        id="new-category"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        placeholder="New category"
                                    />
                                    <Button type="button" size="sm" onClick={addCategory}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            {isSubmitting && <Loader size={20} color="#fff" />}
                            Crear convocatoria
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}