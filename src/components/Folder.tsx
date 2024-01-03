import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/ui-components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui-components/ui/dropdown-menu"
import React, { useState } from "react"


interface FolderProps {
    renderFolder: any,
    handleClick: (val: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}



export default function Folder({ renderFolder, handleClick }: FolderProps) {
    const [isAlertOpen, setAlertOpen] = useState(false);



    return (
        <>
            <AlertDialog open={isAlertOpen}>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        This will delete this folder and it's subfolder permenantly
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogAction>Confirm</AlertDialogAction>
                        <AlertDialogCancel onClick={() => setAlertOpen(!isAlertOpen)}>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>

            </AlertDialog>

            <div className='grid mt-10 grid-cols-12 gap-x-3 w-full'>
                {Object.keys(renderFolder).map((f, i) => (
                    <div className="flex flex-row items-center justify-between col-span-2 p-3 rounded-lg bg-gray-300">
                        <a key={i} className='flex flex-row items-center justify-between  cursor-pointer' id={f} onClick={(e) => handleClick(e)}>
                            <div className="flex flex-row items-center gap-x-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                                    </svg>
                                </div>

                                <div >
                                    <h1>{f}</h1>
                                </div>
                            </div>


                        </a>
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="flex flex-row items-center">
                                    <a href="" className="flex flex-row items-center justify-center w-6 h-6 rounded-full hover:bg-gray-400 ring-0 border-none active:ring-0 active:border-none focus:ring-0 focus:border-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                        </svg>

                                    </a>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className="cursor-pointer">
                                        About
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setAlertOpen(!isAlertOpen)} className="cursor-pointer">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}