import { ParamsMenu } from "@/interface/menu";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const useFetchMenu = () => {
    return useQuery({
        queryKey: ["menu"],
        queryFn: async () => {
            const { data } = await axios.get(`${baseUrl}/menu`);
            return data;
        },
    });
};

export const addMenu = async (newMenu: ParamsMenu) => {
    const { data } = await axios.post(`${baseUrl}/menu`, newMenu);
    return data;
};

export const editMenu = async (menu: ParamsMenu) => {
    const { parentId, ...rest } = menu
    const { data } = await axios.put(`${baseUrl}/menu/${parentId}`, rest);
    return data;
};

export const deleteMenu = async (id: string) => {
    const { data } = await axios.delete(`${baseUrl}/menu/${id}`);
    return data;
};