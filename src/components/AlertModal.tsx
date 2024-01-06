import { FolderContext } from "@/context/FolderContext";
import React, { SetStateAction, useContext, useEffect } from "react";
import DeleteFolder from "./Delete/helper/DeleteFolder";


interface AlertDialogProps {
  isAlertOpen: boolean,
  selectedID: string,
  setAlertOpen: React.Dispatch<SetStateAction<boolean>>,
  alertModalRef: React.RefObject<HTMLDialogElement>

}

export default function AlertModal({ isAlertOpen
  , selectedID
  , setAlertOpen
  , alertModalRef }: AlertDialogProps) {
  const folderContext = useContext(FolderContext);
  function handleClose() {
    alertModalRef.current?.close();
    setAlertOpen(false);
  }

  function handleDelete() {

    DeleteFolder(selectedID, folderContext)
    handleClose();
  }

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {


      if (e.key === "Escape") {
        setAlertOpen(false);
      }
    }
    document.body.addEventListener("keyup", handleKeyPress)
    return () => document.body.removeEventListener("keyup", handleKeyPress)
  })

  return (

    <dialog ref={alertModalRef} className={`bg-gray-100 border w-max border-gray-900 transition-all duration-300 ease-in-out rounded-lg ${isAlertOpen ? "scale-95" : "scale-0"} backdrop:bg-gray-900 backdrop:opacity-45`} >
      <div className="flex flex-col  rounded-lg bg-gray-100 min-w-96 p-10 ">
        <div className="w-full">
          <h1 className="text-2xl text-left font-bold">Are you sure ?</h1>
        </div>
        <div className="w-full ">
          <h2 className="text-lg text-left">This will delete all files and subfolders under this folder permanently</h2>
        </div>
        <div className="flex flex-row w-full mt-10 justify-end gap-x-2">
          <div>
            <a className="text-white p-3 cursor-pointer hover:bg-black rounded-lg font-semibold bg-gray-800" onClick={handleDelete}>Confirm</a>
          </div>
          <div>
            <a className="text-gray-900 p-3 rounded-lg cursor-pointer hover:bg-gray-300 font-semibold bg-gray-100 border border-gray-900" onClick={handleClose}>Cancel</a>
          </div>

        </div>
      </div>
    </dialog>
  );
}
