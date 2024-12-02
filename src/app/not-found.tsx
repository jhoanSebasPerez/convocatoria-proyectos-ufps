'use client';

import { useAuth } from '@/features/auth/context/auth-context';
import { useRouter } from 'next/navigation'; // App Router
import { useEffect } from 'react';

export default function NotFound() {
    const { role } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (role !== null) {
            router.push(`/${role}`);
        }
        router.push("/sign-in")
    }, [router, role]);

    return null;
}