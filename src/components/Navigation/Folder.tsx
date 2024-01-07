import React, { useContext, useEffect, useState } from "react";
import ClickFolder from "./helper/ClickFolder";
import { FolderContext } from "@/context/FolderContext";
import Dropdown from "../Dropdown";

interface FolderProps {
    index: number,
    folder: any,
    folderId: string,
    setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedId: React.Dispatch<React.SetStateAction<string>>
    alertModalRef: React.RefObject<HTMLDialogElement>
}

export default function Folder({
    index,
    folder,
    folderId,
    setAlertOpen,
    setSelectedId,
    alertModalRef
}: FolderProps) {
    const folderContext = useContext(FolderContext);
    const [isDropDownOpen, setDropDownOpen] = useState("");
    function handleDropDown(e: string) {
        if (isDropDownOpen.length > 0) {
            setDropDownOpen("");
        } else {
            setDropDownOpen(e);
        }
    }
    function handleClick(id: string) {
        ClickFolder(id, folderContext);
    }
    useEffect(() => {
        function closeDropDown(e: Event) {
            const target: HTMLElement = e.target as HTMLElement;

            if (!target.classList.contains("dropdownBtn")) {
                setDropDownOpen("");
            }
        }

        document.body.addEventListener("click", closeDropDown);
        return () => document.body.removeEventListener("click", closeDropDown);
    }, []);
    return (
        <div
            key={index}
            className="flex flex-col items-center max-w-sm p-3 bg-gray-100 hover:shadow-lg hover:shadow-gray-900 transition-all ease-in-out rounded-lg  ring-2 ring-gray-400"
        >
            <div className="w-full max-w-sm  flex flex-row justify-end relative">
                <a
                    className="flex  flex-row cursor-pointer items-center justify-center w-6 h-6 rounded-full hover:bg-gray-400 ring-0 border-none active:ring-0 active:border-none focus:ring-1 focus:ring-gray-500 focus:outline-none"
                    id={folderId}
                    onClick={(e) => handleDropDown(e.currentTarget.id)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 dropdownBtn"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                    </svg>
                </a>

                <Dropdown
                    setAlertOpen={setAlertOpen}
                    isDropdownOpen={isDropDownOpen}
                    setSelectedId={setSelectedId}
                    fileId={folderId}
                    alertModalRef={alertModalRef}
                />
            </div>
            <a
                className="flex flex-row items-center justify-between  cursor-pointer"
                id={folderId}
                onClick={(e) => handleClick(e.currentTarget.id)}
            >
                <div className="flex flex-col items-center  gap-x-2">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={folder.color}
                            className="w-24 h-24"
                        >
                            <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                        </svg>
                    </div>

                    <div>
                        <h1>{folder.name}</h1>
                    </div>
                </div>
            </a>
        </div>
    )
}