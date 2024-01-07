import { useContext, useEffect, useRef, useState } from "react"
import CreateFolder from "./helper/CreateFolder";
import { FolderContext } from "@/context/FolderContext";
import { FolderData, FolderErrData } from "@/types/FolderTypes";
import InputModal from "../InputModal";

export default function CreateFolderModal() {
    const [isDialogOpen, setDialogOpen] = useState(false)

    const [folderData, setFolderData] = useState<FolderData>({
        folderName: "",
        folderColor: "#000000"
    })
    const folderColorRef = useRef<HTMLInputElement>(null);
    const createDialogRef = useRef<HTMLDialogElement>(null);
    const confirmButtonRef = useRef<HTMLAnchorElement>(null);

    const [folderErrData, setFolderErrData] = useState<FolderErrData>({
        folderNameErr: "",
        folderColorErr: ""
    })
    const COLOR_HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

    const folderContext = useContext(FolderContext);
    function handleModalOpen() {
        if (isDialogOpen) {
            setDialogOpen(false)

            setFolderData({ folderName: "", folderColor: "#000000" })

            setFolderErrData({ folderColorErr: "", folderNameErr: "" })
            createDialogRef.current?.close();
        }
        else {
            setDialogOpen(true)

            setFolderData({ folderName: "", folderColor: "#000000" })


            setFolderErrData({ folderColorErr: "", folderNameErr: "" })
            createDialogRef.current?.showModal();
        }
    }

    function handleSubmit() {
        let hasError = false;
        setFolderErrData({ folderColorErr: "", folderNameErr: "" })

        if (folderData.folderName.trim().length === 0) {
            setFolderErrData({
                ...folderErrData
                , folderNameErr: "Folder name cannot be empty"
            })
            hasError = true;
        }

        if (folderData.folderColor.trim().length === 0) {
            setFolderErrData({
                ...folderErrData
                , folderColorErr: "Please set a folder color"
            })
            hasError = true;
        }
        else if (!COLOR_HEX_REGEX.test(folderData.folderColor)) {
            setFolderErrData({
                ...folderErrData
                , folderColorErr: "Not a valid color hex code"
            })
            hasError = true;

        }


        if (!hasError) {
            CreateFolder(folderData.folderName, folderData.folderColor, folderContext)

            handleModalOpen();
        }

    }

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent) {

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
            <InputModal
                inputDialogRef={createDialogRef}
                confirmButtonRef={confirmButtonRef}
                folderColorRef={folderColorRef}
                isDialogOpen={isDialogOpen}
                handleModalOpen={handleModalOpen}
                handleSubmit={handleSubmit}
                folderData={folderData}
                folderErrData={folderErrData}
                setFolderData={setFolderData}
            />
        </>

    )
}