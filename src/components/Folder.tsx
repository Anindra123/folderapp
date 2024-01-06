import React, { useContext, useEffect, useRef, useState } from "react";
import AlertModal from "./AlertModal";
import Dropdown from "./Dropdown";
import SortOptionDialog from "./Sorting/SortOptionDialog";
import { FolderContext } from "@/context/FolderContext";

interface FolderProps {
  handleClick: (val: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;

  // selectedID: string;
}

export default function Folder({
  handleClick,
}: // selectedID,
FolderProps) {
  //const dropdownRef = useRef<HTMLDialogElement>(null);

  const { renderFolder } = useContext(FolderContext);
  const [isDropDownOpen, setDropDownOpen] = useState("");
  const [isAlertOpen, setAlertOpen] = useState(false);
  const alertModalRef = useRef<HTMLDialogElement>(null);
  const [selectedID, setSelectedId] = useState("");

  function handleDropDown(e: string) {
    if (isDropDownOpen.length > 0) {
      setDropDownOpen("");
    } else {
      setDropDownOpen(e);
    }
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
    <>
      <SortOptionDialog />
      <AlertModal
        isAlertOpen={isAlertOpen}
        setAlertOpen={setAlertOpen}
        selectedID={selectedID}
        alertModalRef={alertModalRef}
      />

      <div className="grid mt-20 mx-10 transition-all ease-in-out duration-75 grid-cols-12 gap-x-3 w-full">
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
          <div
            key={i}
            className="flex flex-col items-center  col-span-2 p-3 hover:shadow-lg hover:shadow-gray-900 transition-all ease-in-out rounded-lg  ring-2 ring-gray-400"
          >
            <div className="w-full  flex flex-row justify-end relative">
              <a
                className="flex  flex-row cursor-pointer items-center justify-center w-6 h-6 rounded-full hover:bg-gray-400 ring-0 border-none active:ring-0 active:border-none focus:ring-1 focus:ring-gray-500 focus:outline-none"
                id={f}
                onClick={(e) => handleDropDown(e.currentTarget.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 dropdownBtn"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </a>

              <Dropdown
                setAlertOpen={setAlertOpen}
                isDropdownOpen={isDropDownOpen}
                setSelectedId={setSelectedId}
                fileId={f}
                alertModalRef={alertModalRef}
              />
            </div>
            <a
              className="flex flex-row items-center justify-between  cursor-pointer"
              id={f}
              onClick={(e) => handleClick(e)}
            >
              <div className="flex flex-col items-center  gap-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-24 h-24"
                  >
                    <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                  </svg>
                </div>

                <div>
                  <h1>{renderFolder.children[f].name}</h1>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
