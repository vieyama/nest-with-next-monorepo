"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight, ChevronDown, FilePenLine, Trash2, Plus } from "lucide-react"
import { type TreeNodeProps, type ActionType, type TreeNode, type TreeViewProps } from "@/interface/menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMenu } from "@/services/menu"
import { toast } from "@/hooks/use-toast"

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


    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    const toggleNode = (id: string) => {
        setExpandedNodes((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        const allNodes = new Set<string>();
        const collectNodes = (items: TreeNode[]) => {
            for (const item of items) {
                allNodes.add(item.id);
                if (item.children) collectNodes(item.children);
            }
        };
        collectNodes(data);
        setExpandedNodes(allNodes);
    };

    const collapseAll = () => setExpandedNodes(new Set());

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-4 mb-4">
                    <button onClick={expandAll} className="bg-[#1D2939] text-white px-5 py-2 rounded-full text-sm">
                        Expand All
                    </button>
                    <button onClick={collapseAll} className="border border-[#1D2939] px-5 py-2 rounded-full text-sm">
                        Collapse All
                    </button>
                </div>
            </div>
            {data.map((node, index) => (
                <TreeNode key={index} node={node} isLast={index === data.length - 1}
                    expandedNodes={expandedNodes}
                    toggleNode={toggleNode}
                    handleAction={handleAction} />
            ))}
        </div>
    )
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, isLast, handleAction, expandedNodes, toggleNode }) => {
    const hasChildren = node?.children && node.children.length > 0
    const isOpen = expandedNodes.has(node.id);

    return (
        <div className={`relative border-l ${!isLast ? "pb-1" : ""}`}>
            <div className={`flex items-center py-1 ${isLast ? "" : "border-gray-300"}`}>
                <div className={`absolute left-0 top-4 w-4 border-t border-gray-300 ${isLast ? "border-l" : ""}`} />
                <div className="relative flex items-center pl-[17px]">
                    {hasChildren ? (
                        <button onClick={() => toggleNode(node.id)} className="mr-1 focus:outline-none">
                            {isOpen ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                        </button>
                    ) : (
                        <span className="w-4 h-4 mr-1" />
                    )}
                    <div className="flex items-center gap-2">
                        <button onClick={() => toggleNode(node.id)}>
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
            {hasChildren && isOpen && (
                <div className="ml-6">
                    {node.children!.map((childNode, index) => (
                        <TreeNode key={index} node={childNode} isLast={index === node.children!.length - 1} handleAction={handleAction} expandedNodes={expandedNodes}
                            toggleNode={toggleNode} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TreeView

