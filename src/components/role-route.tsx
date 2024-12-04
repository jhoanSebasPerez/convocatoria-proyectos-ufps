'use client';

import { useAuth } from '@/features/auth/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface RoleRouteProps {
    allowedRoles: string[]; // Lista de roles permitidos
    children: React.ReactNode;
}

export default function RoleRoute({ allowedRoles, children }: RoleRouteProps) {
    const { role, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {

        console.log("current role", role);
        if (!isLoading) {
            if (!isAuthenticated || !allowedRoles.includes(role || '')) {
                router.push('/sign-in'); // Redirige a una página de no autorizado
            }
        }
    }, [role, isAuthenticated, isLoading, allowedRoles, router]);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated || !allowedRoles.includes(role || '')) {
        return null;
    }

    return <>{children}</>;
}