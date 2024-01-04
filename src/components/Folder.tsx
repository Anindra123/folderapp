import React from "react";
import AlertModal from "./AlertModal";
import Dropdown from "./Dropdown";

interface FolderProps {
  renderFolder: any;
  handleClick: (val: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  handleDelete: (val: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isAlertOpen: boolean;
  selectedID: string;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAlert: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function Folder({
  renderFolder,
  handleClick,
  handleDelete,
  handleAlert,
  isAlertOpen,
  setAlertOpen,
  selectedID,
}: FolderProps) {
  return (
    <>
      <AlertModal
        isAlertOpen={isAlertOpen}
        setAlertOpen={setAlertOpen}
        selectedID={selectedID}
        handleDelete={handleDelete}
      />

      <div className="grid mt-10 grid-cols-12 gap-x-3 w-full">
        {Object.keys(renderFolder).length === 0 && (
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
        {Object.keys(renderFolder).map((f, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-between col-span-2 p-3 rounded-lg bg-gray-300"
          >
            <a
              className="flex flex-row items-center justify-between  cursor-pointer"
              id={f}
              onClick={(e) => handleClick(e)}
            >
              <div className="flex flex-row items-center gap-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                  </svg>
                </div>

                <div>
                  <h1>{renderFolder[f].name}</h1>
                </div>
              </div>
            </a>
            <div>
              <Dropdown fileId={f} handleAlert={handleAlert} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
