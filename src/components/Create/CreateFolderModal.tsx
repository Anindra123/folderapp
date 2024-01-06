import { useContext, useEffect, useRef, useState } from "react"
import CreateFolder from "./helper/CreateFolder";
import { FolderContext } from "@/context/FolderContext";

export default function CreateFolderModal() {
    const [isDialogOpen, setDialogOpen] = useState(false)
    const [folderName, setFolderName] = useState("");
    const createDialogRef = useRef<HTMLDialogElement>(null);
    const confirmButtonRef = useRef<HTMLAnchorElement>(null);
    const [folderErr, setFolderErr] = useState("");
    const folderContext = useContext(FolderContext);
    function handleModalOpen() {
        if (isDialogOpen) {
            setDialogOpen(false)
            setFolderName("");
            setFolderErr("");
            createDialogRef.current?.close();
        }
        else {
            setDialogOpen(true)
            setFolderName("");
            setFolderErr("");
            createDialogRef.current?.showModal();
        }
    }

    function handleSubmit() {
        setFolderErr("");
        if (folderName.trim().length === 0) {
            setFolderErr("Folder name cannot be empty");
            return;
        }

        CreateFolder(folderName, folderContext)

        handleModalOpen();

    }

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {
            //e.preventDefault();
            if (e.key === "Enter") {
                confirmButtonRef.current?.click();
            }
            if (e.key === "Escape") {
                setDialogOpen(false);
            }

        }
        document.body.addEventListener("keyup", handleKeyPress)
        return () => document.body.removeEventListener("keyup", handleKeyPress)
    })



    return (
        <>
            <div className="w-full mt-10 flex flex-row items-center justify-center">
                <a onClick={handleModalOpen} className="bg-gray-800 cursor-pointer transition-all ease-in-out  p-3 rounded-lg text-white font-semibold hover:bg-gray-900">Create Folder</a>
            </div>
            <dialog ref={createDialogRef} className={`bg-gray-100 border w-max backdrop:bg-gray-900 backdrop:opacity-65 border-gray-900 transition-all duration-300 ease-in-out rounded-lg ${isDialogOpen ? "scale-100" : "scale-0"}`}>
                <div className="flex flex-col rounded-lg bg-gray-100 min-w-96 p-10">
                    <div className="w-full">
                        <h1 className="text-2xl text-left font-bold">Create folder</h1>
                    </div>
                    <div className="w-full grid grid-cols-6 mt-10 items-center gap-x-2">
                        <div className="col-span-2">
                            <h3 className="text-xl font-semibold">Folder Name :</h3>
                        </div>
                        <div className="col-span-4">
                            <input type="text"
                                className={`p-3 rounded-lg bg-gray-300 w-full focus:outline-none  ${folderErr.length > 0 ? "focus:border-2 focus:border-red-500" : "focus:border-2 focus:border-gray-900"}`}
                                onChange={(e) => setFolderName(e.currentTarget.value)}
                                value={folderName}
                            />
                        </div>
                        <div className="col-span-2">
                        </div>
                        <div className="col-span-4">
                            <h3 className="text-red-500 font-semibold text-md">{folderErr}</h3>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mt-10 justify-end gap-x-2">
                        <div >
                            <a ref={confirmButtonRef} className="text-white p-3 cursor-pointer hover:bg-black rounded-lg font-semibold bg-gray-800" onClick={handleSubmit}>Confirm</a>
                        </div>
                        <div>
                            <a className="text-gray-900 p-3 rounded-lg cursor-pointer hover:bg-gray-300 font-semibold bg-gray-100 border border-gray-900" onClick={handleModalOpen}>Cancel</a>
                        </div>
                    </div>

                </div>
            </dialog>
        </>

    )
}