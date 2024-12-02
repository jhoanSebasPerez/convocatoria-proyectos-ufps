'use client'

import { User, LogOut, Settings } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetUser } from '@/features/usuarios/api/use-get-user'
import { useAuth } from '@/features/auth/context/auth-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';


export default function UserAvatarMenu() {

    const { userId, logout, role } = useAuth();
    const router = useRouter();
    const { refetch, isPending, data } = useGetUser(userId || '');

    useEffect(() => {
        if (userId) {
            refetch();
        }
    }, [userId]);

    if (isPending) {
        return null;
    }

    if (!data) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage alt={data.nombre} />
                        <AvatarFallback>{data.nombre}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{data.nombre}</p>
                        <p className="text-xs leading-none text-muted-foreground">{data.correo}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push(`/${role}/perfil`)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Ver perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}