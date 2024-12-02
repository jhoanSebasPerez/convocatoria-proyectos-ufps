'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { Search, Check } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from '@/features/usuarios/types/user'


interface UserSearchSelectProps {
    onSelect: (user: User | null) => void,
    users: User[]
}

export default function UserSearchSelect({ onSelect, users }: UserSearchSelectProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        const filtered = users.filter(user =>
            user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
    }, [searchTerm])

    const handleUserSelect = (user: User) => {
        setSelectedUser(user)
        onSelect(user)
    }

    return (
        <div className="w-full space-y-4">
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-[500]px text-muted-foreground" />
                <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                />
            </div>
            <div className='flex flex-col gap-4'>
                <ScrollArea className="h-[200px] w-full rounded-md border">
                    <div className="p-4">
                        {filteredUsers.map((user) => (
                            <div
                                key={user.id_usuario}
                                className="flex items-center space-x-4 p-2 hover:bg-accent rounded-lg cursor-pointer"
                                onClick={() => handleUserSelect(user)}
                            >
                                <Avatar>
                                    <AvatarImage src={""} alt={user.nombre} />
                                    <AvatarFallback>{user.nombre.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.nombre}</p>
                                    <p className="text-sm text-muted-foreground">{user.correo}</p>
                                </div>
                                {selectedUser?.id_usuario === user.id_usuario && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </div>
                        ))}
                        {filteredUsers.length === 0 && (
                            <p className="text-center text-muted-foreground">No users found</p>
                        )}

                    </div>
                </ScrollArea>
                <div>
                    {selectedUser && (
                        <div className="p-4 bg-secondary rounded-md">
                            <span className="text-sm font-bold mb-2">Docente seleccionado:</span>
                            <div className="flex items-center space-x-6">
                                <Avatar>
                                    <AvatarImage src={""} alt={selectedUser.nombre} />
                                    <AvatarFallback>{selectedUser.nombre.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{selectedUser.nombre}</p>
                                    <p className="text-sm text-muted-foreground">{selectedUser.correo}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}