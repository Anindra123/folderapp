import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu";

interface DropdownProps {
    fileId: string,
    handleAlert: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
}

export default function Dropdown({ fileId, handleAlert }: DropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center">
                <a
                    href=""
                    className="flex flex-row items-center justify-center w-6 h-6 rounded-full hover:bg-gray-400 ring-0 border-none active:ring-0 active:border-none focus:ring-0 focus:border-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                    </svg>
                </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="cursor-pointer">
                    About
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <a
                        id={fileId}
                        onClick={(e) => handleAlert(e)}
                        className="w-full"
                    >
                        Delete
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}