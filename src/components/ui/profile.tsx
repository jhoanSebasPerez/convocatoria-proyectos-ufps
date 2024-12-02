'use client'

import * as React from 'react'
import { useState } from 'react'
import { Edit, Save, Key, Loader } from 'lucide-react'

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
import { User } from '@/features/usuarios/types/user'
import { Badge } from './badge'
import { useUpdateUser } from '@/features/usuarios/api/use-update-user'

interface UserContactInfoPageProps {
    user: User,
    refetch: () => void
}

export default function UserContactInfoPage({ user, refetch }: UserContactInfoPageProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [isSending, setSending] = useState(false)
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
    const { toast } = useToast()
    const { mutate: updateUser } = useUpdateUser()


    const handleUpdateName = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSending(true)
        const formData = new FormData(event.currentTarget)
        const updatedUser = {
            ...user,
            nombre: formData.get('firstName') as string,
            apellido: formData.get('lastName') as string,
        }
        updateUser(updatedUser, {
            onSuccess: () => {
                refetch()
                setSending(false)
                toast({
                    title: "Usuario Actualizado",
                    description: "Tu información de contacto ha sido actualizada correctamente.",
                })
            }
        })
    }

    const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Here you would typically call an API to reset the password
        setIsResetPasswordModalOpen(false)
        toast({
            title: "Instrucciones enviadas",
            description: "Revisa tu correo electrónico para restablecer tu contraseña.",
        })
    }

    return (
        <div className="container py-4 px-4">
            <h1 className="text-3xl font-bold mb-5">Información de contacto</h1>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Detalle de contacto</CardTitle>
                    <CardDescription>Ver y manejar tu información de contacto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className='font-bold'>ID</Label>
                            <p className="text-sm font-medium">{user?.id_usuario}</p>
                        </div>
                        <div>
                            <Label className='font-bold'>Nombre</Label>
                            <p className="text-sm font-medium">{user?.nombre}</p>
                        </div>
                        <div>
                            <Label className='font-bold'>Apellido</Label>
                            <p className="text-sm font-medium">{user?.apellido}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label className='font-bold'>Estado</Label>
                            <Badge
                                className={`text-sm font-medium w-[150px] ${user?.estado ? "bg-green-600 text-white" : "bg-gray-400 text-gray-700"
                                    }`}
                            >
                                {user?.estado ? "Habilitado" : "Inhabilitado"}
                            </Badge>
                        </div>
                        <div>
                            <Label className='font-bold'>Rol</Label>
                            <p className="text-sm font-medium">{user?.nombre_rol}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdateName} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Nombre</Label>
                                    <Input id="firstName" name="firstName" defaultValue={user?.nombre} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Apellido</Label>
                                    <Input id="lastName" name="lastName" defaultValue={user?.apellido} required />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSending}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSending && <Loader className="mr-2 h-4 w-4" />}
                                    Guardar cambios
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar tu información
                        </Button>
                    )}
                </CardContent>
                <CardFooter>
                    <Dialog open={isResetPasswordModalOpen} onOpenChange={setIsResetPasswordModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Key className="mr-2 h-4 w-4" />
                                Restablecer contraseña
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Restablecer contraseña</DialogTitle>
                                <DialogDescription>
                                    Ingresa tu correo electrónico para recibir instrucciones de restablecimiento de contraseña.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleResetPassword}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="resetId" className="text-right">
                                            Correo Electrónico
                                        </Label>
                                        <Input
                                            id="resetId"
                                            type='email'
                                            name="resetCorreo"
                                            defaultValue={user?.correo}
                                            className="col-span-3"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Enviar instrucciones</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
            <Toaster />
        </div >
    )
}