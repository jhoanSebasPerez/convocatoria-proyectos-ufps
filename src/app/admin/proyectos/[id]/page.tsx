"use client";

import { useGetProjectDetail } from '@/features/proyectos/api/use-get-detail-proyect';
import DetailedProjectView from '@/features/proyectos/components/detailed-project-view';
import { useParams } from 'next/navigation'
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function ProjectDetail() {
    const { id } = useParams<{ id: string }>()
    const { data, isPending, refetch: getProjectDetail } = useGetProjectDetail(id);

    useEffect(() => {
        if (id) {
            getProjectDetail();
        }
    }, [id, getProjectDetail]);

    if (isPending) {
        return (
            <div className="w-full flex justify-center mt-10">
                <ClipLoader color="#333" size={50} />
            </div>
        );
    }



    if (data === undefined) {
        return <div>Project not found</div>
    }

    if (data) {
        return <DetailedProjectView project={data} refetch={getProjectDetail} />
    }
}