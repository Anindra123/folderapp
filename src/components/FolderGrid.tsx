import { useContext, useRef, useState } from "react";
import AlertModal from "./AlertModal";
import SortOptionDialog from "./Sorting/SortOptionDialog";
import { FolderContext } from "@/context/FolderContext";
import Folder from "./Navigation/Folder";



export default function FolderGrid() {


  const { renderFolder } = useContext(FolderContext);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const alertModalRef = useRef<HTMLDialogElement>(null);
  const [selectedID, setSelectedId] = useState("");


  return (
    <>
      <SortOptionDialog />
      <AlertModal
        isAlertOpen={isAlertOpen}
        setAlertOpen={setAlertOpen}
        selectedID={selectedID}
        alertModalRef={alertModalRef}
      />

      <div className="grid mt-20 transition-all ease-in-out duration-75 grid-cols-6 px-10 gap-x-3 gap-y-3 w-full">
        {Object.keys(renderFolder.children).length === 0 && (
          <div className="col-span-12 items-center justify-center">
            <div className="mt-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#6b7280"
                className="w-24 h-24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl text-gray-500 font-semibold">
                No folder available currently
              </p>
            </div>
          </div>
        )}
        {Object.keys(renderFolder.children).map((f, i) => (

          <Folder
            index={i}
            folderId={f}
            folder={renderFolder.children[f]}
            setAlertOpen={setAlertOpen}
            alertModalRef={alertModalRef}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
    </>
  );
}
