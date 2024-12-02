'use client'

import * as React from 'react'
import { useState } from 'react'
import { Search, Plus, Pencil } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { User as UserType } from '../types/user'
import { DialogUser } from './dialog-user'
import { useUpdateUser } from '../api/use-update-user'
import { useRegisterUser } from '../api/use-register-user'
import { RegisterUser } from '../types/register-user'
import { UpdateUser } from '../types/update-user'
import { useToast } from '@/hooks/use-toast'
import { useGetRoles } from '../api/use-get-roles'
import { showToast } from '@/core/show-toast'

interface TableUsersProps {
    usuarios: UserType[];
    refetch: () => void;
}

export default function TableUsers({ usuarios, refetch }: TableUsersProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { mutate: updateUser } = useUpdateUser();
    const { mutate: createUser } = useRegisterUser();
    const { mutate: getRoles, data: roles } = useGetRoles();

    const { toast } = useToast();

    React.useEffect(() => {
        getRoles();
    }, []);

    const filteredUsers = usuarios && usuarios.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const openUpdateModal = (user: UserType) => {
        setSelectedUser(user)
        setShowModalUpdate(true)
    }

    const handleSubmit = (formData: FormData, type: string) => {
        console.log("formData entries:", Array.from(formData.entries()));

        setIsSubmitting(true);
        const rol = roles?.find(rol => rol.nombre_rol === formData.get("role"))?.id_rol;
        if (type === "create") {
            const newUser: RegisterUser = {
                nombre: formData.get("firstName") as string,
                apellido: formData.get("lastName") as string,
                correo: formData.get("email") as string,
                estado: formData.get("status") === "Habilitado" ? true : false,
                id_rol: rol as string,
                contrasena: "password123",
            };
            createUser(newUser, {
                onSuccess: () => {
                    refetch();
                    showToast("Usuario registrado", "El usuario ha sido registrado exitosamente", toast);
                    setTimeout(() => {
                        setIsSubmitting(false); // Finaliza la carga
                        setShowModalCreate(false); // Cierra el modal después del efecto
                    }, 500); // Tiempo suficiente para la animación
                },
            });
        } else {
            const userUpdt: UpdateUser = {
                nombre: formData.get("firstName") as string,
                apellido: formData.get("lastName") as string,
                correo: formData.get("email") as string,
                estado: formData.get("status") === "Habilitado" ? true : false,
                id_rol: rol as string,
                id_usuario: formData.get("id_usuario") as string
            };
            console.log("userUpdt", userUpdt);
            updateUser(userUpdt, {
                onSuccess: () => {
                    refetch();
                    showToast("Usuario actualizado", "El usuario ha sido actualizado exitosamente", toast);
                    setTimeout(() => {
                        setIsSubmitting(false); // Finaliza la carga
                        setShowModalUpdate(false); // Cierra el modal después del efecto
                    }, 500); // Tiempo suficiente para la animación
                },
            });
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Search className="h-4 w-4 text-gray-500" />
                </div>
                <Button onClick={() => setShowModalCreate(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Registrar usuario
                </Button>
                <DialogUser
                    isSubmitting={isSubmitting}
                    type="create"
                    isModalOpen={showModalCreate}
                    setModalOpen={setShowModalCreate}
                    selectedUser={null}
                    handleSubmit={handleSubmit}
                    roles={roles}
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id_usuario}>
                                <TableCell>{user.nombre}</TableCell>
                                <TableCell>{user.apellido}</TableCell>
                                <TableCell>{user.correo}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={user.estado ? 'default' : 'secondary'}
                                    >
                                        {user.estado ? "Habilitado" : "Inhabilitado"}
                                    </Badge>
                                </TableCell>
                                <TableCell>{user.nombre_rol}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => openUpdateModal(user)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Update
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <DialogUser
                isSubmitting={isSubmitting}
                type="update"
                isModalOpen={showModalUpdate}
                setModalOpen={setShowModalUpdate}
                selectedUser={selectedUser}
                handleSubmit={handleSubmit}
                roles={roles}
            />

        </div>
    )
}