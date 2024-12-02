"use client";

import UserContactInfoPage from "@/components/ui/profile";
import { useAuth } from "@/features/auth/context/auth-context";
import { useGetUser } from "@/features/usuarios/api/use-get-user";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function ProfileStudent() {

    const { userId } = useAuth();
    const { refetch: getUser, data: user, isPending } = useGetUser(userId || '');

    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [user])

    if (isPending) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }

    if (user) {
        return (
            <UserContactInfoPage user={user} refetch={getUser} />
        )
    }
}