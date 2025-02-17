'use client'

import { Sidebar } from "@/components/ui/sidebar";
import { sidebarExpanded } from "@/store/reducer/sidebarSlice";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import TreeView from "@/components/dashboard/tree-view";
import Select from "@/components/ui/select";
import { MenuForm } from "./form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MenuType, TreeNode } from "@/interface/menu";
import { addMenu, editMenu, useFetchMenu } from "@/services/menu";
import { Skeleton } from "../ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

export const formSchema = z.object({
    parentId: z.string(),
    depth: z.number().min(0, "Depth is required"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    actionType: z.string()
});

export default function DashboardComponent() {
    const queryClient = useQueryClient();
    const isMobile = useIsMobile()

    const [parentId, setParentId] = useState<string>()
    const { data, isLoading } = useFetchMenu();

    const dataMenu = useMemo(() => {
        if (!parentId) {
            return [data?.[0]]
        }
        const menu = data?.filter((item: { id: string; }) => item.id === parentId)
        return menu
    }, [data, parentId])

    const addMutation = useMutation({
        mutationFn: addMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            toast({
                title: "Add menu success"
            })
        },
    });

    const editMutation = useMutation({
        mutationFn: editMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            toast({
                title: "Add menu success"
            })
        },
    });

    const expanded = useSelector(sidebarExpanded);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { parentId: '', depth: 0, name: '', actionType: 'add' },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const { actionType, ...filteredData } = data;
        
        if (actionType === 'add') {
            addMutation.mutate(filteredData)
        } else {
            editMutation.mutate(filteredData)
        }

        form.reset({ actionType: '', depth: 0, name: '', parentId: '' })
    }

    const marginLeftData = useMemo(() => {
        if (isMobile) {
            return 'ml-0'
        } else {
            return expanded ? 'ml-64' : 'ml-24'
        }
    }, [expanded, isMobile])

    return (
        <div className="flex h-screen p-5">
            <Sidebar />
            <main className={`flex-1 transition-all duration-300 ${marginLeftData}`}>
                {/* breadcrum */}
                <div className="flex gap-3 items-center h-[84px] top-0 pt-16 pb-8 fixed w-full bg-white z-40">
                    <Image src="/folder.svg" width={24} height={24} alt="folder icon" />
                    <span className="text-[#D0D5DD] text-2xl">/</span>
                    <span>Menus</span>
                </div>

                <div className="mx-5 my-2 relative top-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-[52px] h-[52px] rounded-full bg-blue-600 flex items-center justify-center">
                            <Image src="/menu-icon-white.svg" width={24} height={24} alt="folder icon" />
                        </div>
                        <h1 className="text-4xl font-semibold">Menus</h1>
                    </div>

                    <form className="max-w-sm">
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <Select onChange={event => setParentId(event.target.value)}>
                            {data?.filter((item: { parentId?: string; }) => item.parentId === null)?.map((parent: MenuType) => (
                                <option key={parent.id} value={parent.id}>{parent?.name}</option>
                            ))}
                        </Select>
                    </form>

                    <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 gap-4">
                        <div className="p-4 w-full mt-5">
                            {isLoading ?
                                <div className="space-y-2 mt-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                                :
                                <TreeView data={(dataMenu ?? []) as TreeNode[]} form={form} />}
                        </div>
                        <MenuForm form={form} onSubmit={onSubmit} />
                    </div>
                </div>
            </main>
        </div>
    );
}
