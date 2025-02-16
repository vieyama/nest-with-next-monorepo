import { ChangeEventHandler, ReactNode, ReactPortal } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"

const Select = ({ children, className, onChange, name, value }: { children: Iterable<ReactNode> | ReactPortal, className?: string, onChange?: ChangeEventHandler<HTMLSelectElement>, name?: string, value?: string }) => {
    return (
        <div className="relative w-72">
            <select name={name} value={value} onChange={onChange} className={cn("w-full bg-gray-100 text-gray-900 px-4 py-2 rounded-full appearance-none shadow-sm cursor-pointer focus:outline-none", className)}>
                {children}
            </select>

            {/* Custom Chevron Icon */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown size={18} className="text-gray-500" />
            </div>
        </div>
    );
};

export default Select;
