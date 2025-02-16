"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ChevronRight, ChevronDown, FilePenLine, Trash2, Plus } from "lucide-react"
import { type TreeNodeProps, type ActionType, type TreeNode, type TreeViewProps } from "@/interface/menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMenu } from "@/services/menu"
import { toast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { collapse, expand, isExpanded } from "@/store/reducer/expandNodeSlice"

const TreeView: React.FC<TreeViewProps> = ({ data, form }) => {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            toast({
                title: "Delete menu success"
            })
        },
    });
    const handleAction = (data: TreeNode, type: ActionType) => {
        form.reset()
        if (type === 'delete') {
            return deleteMutation.mutate(data.id as string)
        }

        const values = { parentId: data.id, depth: data.children?.length ?? 0, actionType: type, ...(type === 'edit' && { name: data.name }) }
        form.reset(values)
    }

    return (
        <div className="p-4">
            {data.map((node, index) => (
                <TreeNode key={index} node={node} isLast={index === data.length - 1} handleAction={handleAction} />
            ))}
        </div>
    )
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, isLast, handleAction }) => {
    const expanded = useSelector(isExpanded);
    const dispatch = useDispatch();
    const hasChildren = node?.children && node.children.length > 0

    const toggleExpand = () => {
        dispatch(expanded ? collapse() : expand())
    }

    return (
        <div className={`relative border-l ${!isLast ? "pb-1" : ""}`}>
            <div className={`flex items-center py-1 ${isLast ? "" : "border-gray-300"}`}>
                <div className={`absolute left-0 top-4 w-4 border-t border-gray-300 ${isLast ? "border-l" : ""}`} />
                <div className="relative flex items-center pl-[17px]">
                    {hasChildren ? (
                        <button onClick={toggleExpand} className="mr-1 focus:outline-none">
                            {expanded ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                    ) : (
                        <span className="w-4 h-4 mr-1" />
                    )}
                    <div className="flex items-center gap-2">
                        <button>
                            <span className="text-xl">{node?.name}</span>
                        </button>
                        <button className="opacity-20 bg-blue-500 w-5 h-5 flex justify-center items-center rounded-full hover:opacity-100" onClick={() => handleAction(node, 'add')}>
                            <Plus color="white" size={15} />
                        </button>
                        <button className="opacity-20 hover:opacity-100" onClick={() => handleAction(node, 'edit')}><FilePenLine className="text-blue-400" /></button>
                        <button className="opacity-20 hover:opacity-100" onClick={() => handleAction(node, 'delete')}><Trash2 className="text-blue-400" /></button>
                    </div>
                </div>
            </div>
            {hasChildren && expanded && (
                <div className="ml-6">
                    {node.children!.map((childNode, index) => (
                        <TreeNode key={index} node={childNode} isLast={index === node.children!.length - 1} handleAction={handleAction} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TreeView

