'use client'

import * as React from 'react'
import { useState } from 'react'
import { CalendarIcon, Info, PlusCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useParams } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useGetUsers } from '@/features/usuarios/api/use-get-users'
import { User } from '@/features/usuarios/types/user'
import { useGetDetailConvocatoria } from '@/features/convocatorias/api/use-get-detail-convocatoria'
import { ClipLoader } from 'react-spinners'
import { CreateProyecto } from '@/features/proyectos/types/project-create'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useRouter } from 'next/navigation';
import { useCreateProyecto } from '@/features/proyectos/api/use-create-project'


export default function ProjectRegistrationForm() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    // Fetch data hooks
    const { data: convocatoria, isPending: loadingConvocatoria, mutate: getConvocatoria } = useGetDetailConvocatoria(id);
    const { data: allUsers = [], isPending: loadingUsers, refetch: getUsers } = useGetUsers();
    const { mutate: createProject } = useCreateProyecto();

    // States
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [registrationDate, setRegistrationDate] = useState<Date | undefined>();
    const [category, setCategory] = useState("");
    const [teamMembers, setTeamMembers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    React.useEffect(() => {
        // Ejecuta las funciones de obtención de datos
        getUsers();
        getConvocatoria();

    }, [getUsers, getConvocatoria, allUsers]);


    const filteredTeamMembers = React.useMemo(() => {
        return allUsers.filter(
            (member) =>
                member.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !teamMembers.some((selectedMember) => selectedMember.id_usuario === member.id_usuario)
        );
    }, [allUsers, searchTerm, teamMembers]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const newProject: CreateProyecto = {
            titulo: title,
            descripcion: description,
            estado: status,
            fecha_inscripcion: registrationDate?.toISOString() || "",
            calificacion_final: 0,
            id_categoria: category,
            id_usuario: "1",
            integrantes: teamMembers.map((member) => member.id_usuario),
        };

        createProject(newProject, {
            onSuccess: () => {
                setTimeout(() => {
                    setIsSubmitting(false);
                    router.push("/estudiante/mis-proyectos");
                }, 2000);
            },
        });

        // Reset form
        setTitle("");
        setDescription("");
        setStatus("");
        setRegistrationDate(undefined);
        setCategory("");
        setTeamMembers([]);
    };

    const addTeamMember = (member: User) => {
        setTeamMembers((prev) => [...prev, member]);
        setSearchTerm("");
    };

    const removeTeamMember = (id: string) => {
        setTeamMembers((prev) => prev.filter((member) => member.id_usuario !== id));
    };

    if (loadingConvocatoria || loadingUsers) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }

    if (!convocatoria) {
        return <div className="w-full flex justify-center mt-10">No se encontró la convocatoria.</div>;
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle className="text-xl">Registrar proyecto</CardTitle>
                <CardDescription>Ingresa cada uno de los campos para registrar un proyecto</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="title" className='font-bold'>Título del proyecto</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className='font-bold'>Descripción del proyecto</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            disabled={isSubmitting}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status" className='font-bold'>Estado actual del proyecto</Label>
                        <Select value={status} onValueChange={setStatus} disabled={isSubmitting} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona el estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="formulacion">Formulación</SelectItem>
                                <SelectItem value="ejecucion">Ejecución</SelectItem>
                                <SelectItem value="terminado">Terminado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="registration-date" className='font-bold'>Fecha de inscripción</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    id="registration-date"
                                    variant={"outline"}
                                    disabled={isSubmitting}
                                    className={`w-full justify-start text-left font-normal ${!registrationDate && "text-muted-foreground"
                                        }`}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {registrationDate ? format(registrationDate, 'PPP', { locale: es }) : <span>Elige una fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={registrationDate}
                                    onSelect={setRegistrationDate}
                                    initialFocus
                                    locale={es}
                                    disabled={isSubmitting}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className='font-bold'>Categoria del proyecto</Label>
                        <Select disabled={isSubmitting} value={category} onValueChange={setCategory} required>
                            <SelectTrigger>
                                <SelectValue placeholder="selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {convocatoria?.CategoriaConvocatoria.map((cat) => (
                                    <SelectItem key={cat.id_categoria} value={cat.id_categoria}>
                                        {cat.nombre_categoria}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className='mt-0 flex items-center gap-1 text-gray-500 text-sm'><Info width={15} /> categorías asignadas para esta convocatoria, por favor elige una</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="team-members" className='font-bold'>Integrantes del proyecto</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {teamMembers.map((member) => (
                                <Badge key={member.id_usuario} variant="secondary" className="flex items-center gap-1">
                                    {member.nombre} {member.apellido}
                                    <Button
                                        type="button"
                                        disabled={isSubmitting}
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 text-base"
                                        onClick={() => removeTeamMember(member.id_usuario)}
                                    >
                                        <X className="h-3 w-3" />
                                        <span className="sr-only">Remove {member.nombre}</span>
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                id="team-members"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Busca por nombre"
                            />
                        </div>
                        {searchTerm && (
                            <ScrollArea className="h-[200px] w-full rounded-md border">
                                <div className="p-4">
                                    {filteredTeamMembers && filteredTeamMembers.map((member) => (
                                        <Button
                                            disabled={isSubmitting}
                                            key={member.id_usuario}
                                            variant="ghost"
                                            className="w-full justify-start"
                                            onClick={() => addTeamMember(member)}
                                        >
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            {member.nombre} {member.apellido} - {member.correo}
                                        </Button>
                                    ))}
                                    {filteredTeamMembers && filteredTeamMembers.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No se ha encontrado un usuario con ese nombre</p>
                                    )}
                                </div>
                            </ScrollArea>
                        )}
                    </div>

                    <Button size="lg" type="submit" className="w-full">
                        {isSubmitting && <ClipLoader color="#fff" size={15} />}
                        Registrar proyecto
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}