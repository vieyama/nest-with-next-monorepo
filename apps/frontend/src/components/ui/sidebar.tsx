"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { collapse, expand, sidebarExpanded } from '@/store/reducer/sidebarSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useIsMobile } from "@/hooks/use-mobile";
// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { useState } from "react";

export function Sidebar() {
    const expanded = useSelector(sidebarExpanded);
    const dispatch = useDispatch();
    const isMobile = useIsMobile()
    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleExpand = () => {
        dispatch(expanded ? collapse() : expand())
    }

    return (
        isMobile ?
            <div className="fixed top-[10px] left-[10px] z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-white/10"
                    onClick={toggleDrawer}
                >
                    <Image src={"expand-black.svg"} width={24} height={24} alt="logo" />
                </Button>
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='left'
                    className='!bg-[#101828] flex justify-center'
                >
                    <MenuBody expanded={expanded} handleExpand={toggleDrawer} />
                </Drawer>
            </div>
            :
            <MenuBody expanded={expanded} handleExpand={handleExpand} />
    );
}

function MenuBody({ expanded, handleExpand }: { expanded: boolean, handleExpand: () => void }) {
    return <div
        className={cn(
            "h-[95vh] rounded-3xl fixed bg-[#101828] text-white transition-all duration-300",
            expanded ? "w-60" : "w-20"
        )}
    >
        <div className={`p-7 flex items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
            <div className="flex items-center gap-2">
                {expanded && <Image src="/logo.svg" width={70} height={21} alt="logo" />}
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleExpand}
                className="hover:bg-white/10"
            >
                <Image src={expanded ? "/collapse.svg" : "expand-white.svg"} width={24} height={24} alt="logo" />
            </Button>
        </div>

        <nav className="mt-4">
            <MenuItem
                expanded={expanded}
                icon='menu-icon-black'
                label="Menus"
                active={true}
            />
        </nav>
    </div>
}

function MenuItem({
    expanded,
    icon,
    label,
    active,
}: {
    expanded: boolean;
    icon: string;
    label: string;
    active?: boolean;
}) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors",
                active
                    ? "bg-[#9FF443] text-black"
                    : "hover:bg-white/5",
                expanded ? "mx-4 rounded-lg" : "mx-0 justify-center"
            )}
        >
            <Image src={`/${icon}.svg`} width={24} height={24} alt="icon" className="w-5 h-5 min-w-[20px]" />
            {expanded && <span>{label}</span>}

        </div>
    );
}
