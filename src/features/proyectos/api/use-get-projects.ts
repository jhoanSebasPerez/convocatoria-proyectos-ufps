import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "@/core/environment";
import axios from "axios";
import { ProjectList } from "../types/project-list";


export const useGetProjects = () => {

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await axios.get(`${BASE_URL}/proyectos`);
            return response.data as ProjectList[];
        },
    }
    );

    return mutation;
};