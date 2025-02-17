import { UseFormReturn } from "react-hook-form"

export type MenuType = {
    id?: string;
    name: string;
    parentId?: string;
    createdAt?: Date;
}

export type TreeNode = {
    id: string
    name: string
    children?: TreeNode[]
}

export type FormValueType = {
    parentId: string;
    depth: number;
    name: string;
    actionType: string
}

export type TreeViewProps = {
    data: TreeNode[]
    form: UseFormReturn<FormValueType>
}

export type ActionType = 'add' | 'edit' | 'delete'

export type TreeNodeProps = {
    node: TreeNode
    isLast: boolean
    handleAction: (data: TreeNode, type: ActionType) => void
    expandedNodes: Set<string>;
    toggleNode: (title: string) => void;
}

export type ParamsMenu = {
    parentId: string;
    name: string;
}