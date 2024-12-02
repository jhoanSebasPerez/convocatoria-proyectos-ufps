"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { User } from "../types/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Rol } from "../types/rol";

const dialogTypeContent: { [key: string]: { title: string; description: string; button: string } } = {
    "create": {
        title: "Registrar usuario",
        description: "Registra un nuevo usuario aquí. Haz clic en guardar cuando hayas terminado.",
        button: "Registrar usuario",
    },
    "update": {
        title: "Actualizar usuario",
        description: "Actualiza la información del usuario aquí. Haz clic en guardar cuando hayas terminado.",
        button: "Actualizar usuario",
    }
}


interface DialogUserProps {
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    selectedUser: User | null;
    type: string;
    isSubmitting: boolean;
    roles: Rol[] | undefined;
    handleSubmit: (formData: FormData, type: string) => void;
}

export const DialogUser = ({
    isModalOpen,
    setModalOpen,
    selectedUser,
    type,
    handleSubmit,
    roles,
    isSubmitting
}: DialogUserProps) => {

    const [selectedStatus, setSelectedStatus] = useState("default");
    const [selectedRole, setSelectedRole] = useState("default");

    useEffect(() => {
        // Sincronizar estado local con el usuario selecci  onado
        if (selectedUser) {
            setSelectedStatus(
                typeof selectedUser.estado === "boolean"
                    ? selectedUser.estado
                        ? "Habilitado"
                        : "Inhabilitado"
                    : "default"
            );
            setSelectedRole(selectedUser.nombre_rol);
        } else {
            // Valores predeterminados cuando no hay usuario
            setSelectedStatus("default");
            setSelectedRole("default");
        }

    }, [selectedUser]);

    const handleChangeStatus = (value: string) => {
        setSelectedStatus(value);
    };

    const handleChangeRole = (value: string) => {
        setSelectedRole(value);
    }

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Habilitar temporalmente los campos deshabilitados
        const form = e.currentTarget;
        const disabledInputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input:disabled, select:disabled');
        disabledInputs.forEach(input => input.disabled = false);

        const formData = new FormData(form);
        console.log("FormData entries:", Array.from(formData.entries()));

        handleSubmit(formData, type);

        // Restaurar el estado deshabilitado de los campos
        disabledInputs.forEach(input => input.disabled = true);

        setTimeout(() => {
            setSelectedRole("default");
            setSelectedStatus("default");
        }, 2000);
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTypeContent[`${type}`]["title"]}</DialogTitle>
                    <DialogDescription>
                        {dialogTypeContent[`${type}`]["description"]}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitForm}>
                    <Input type="hidden" name="id_usuario" value={selectedUser?.id_usuario || ''} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="updateFirstName" className="text-right">
                                Nombre
                            </Label>
                            <Input id="updateFirstName" name="firstName" readOnly={!!selectedUser} defaultValue={selectedUser ? selectedUser.nombre : ""} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="updateLastName" className="text-right">
                                Apellido
                            </Label>
                            <Input id="updateLastName" name="lastName" readOnly={!!selectedUser} defaultValue={selectedUser ? selectedUser.apellido : ""} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="updateEmail" className="text-right">
                                Correo
                            </Label>
                            <Input id="updateEmail" name="email" type="email" readOnly={!!selectedUser} defaultValue={selectedUser ? selectedUser.correo : ""} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="updateStatus" className="text-right">
                                Estado
                            </Label>
                            <Select
                                name="status"
                                value={selectedStatus}
                                onValueChange={handleChangeStatus}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Elegir estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default" disabled>
                                        Elegir estado
                                    </SelectItem>
                                    <SelectItem value="Habilitado">Habilitado</SelectItem>
                                    <SelectItem value="Inhabilitado">Inhabilitado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="updateRole" className="text-right">
                                Rol
                            </Label>
                            <Select
                                name="role"
                                value={selectedRole}
                                onValueChange={handleChangeRole}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Elegir rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default" disabled>
                                        Elegir rol
                                    </SelectItem>
                                    {roles?.map((role) => (
                                        <SelectItem key={role.id_rol} value={role.nombre_rol}>
                                            {role.nombre_rol}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <ClipLoader size={20} color="#fff" />}
                            {dialogTypeContent[`${type}`]["button"]}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>);
}