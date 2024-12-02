"use client";

import { useGetUsers } from "@/features/usuarios/api/use-get-users";
import TableUsers from "@/features/usuarios/components/table-users";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function UsuariosPage() {

    const { data, isPending, refetch } = useGetUsers();

    useEffect(() => {
        refetch();
    }, []);

    if (isPending) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }

    return data && (
        <TableUsers usuarios={data} refetch={refetch} />
    );

}