import React, { SetStateAction } from "react"



interface DropdownProps {
    fileId: string,
    isDropdownOpen: string,
    alertModalRef: React.RefObject<HTMLDialogElement>,

    setSelectedId: React.Dispatch<SetStateAction<string>>
    setAlertOpen: React.Dispatch<SetStateAction<boolean>>,
}


export default function Dropdown({ fileId
    , isDropdownOpen
    , setAlertOpen
    , alertModalRef
    , setSelectedId }: DropdownProps) {
    function handleAlert(e: string) {
        setAlertOpen(false);
        setSelectedId(e);
        setAlertOpen(true);
        alertModalRef.current?.showModal();
    }

    return (
        <>

            <dialog id={`dropdown${fileId}`} open={fileId === isDropdownOpen} className="m-0 absolute left-16 focus:outline-none focus:ring-0  focus:ring-gray-800 border border-gray-600 top-8 shadow-lg shadow-gray-900 rounded-md z-40">

                <div className="flex flex-col  w-fit rounded-md bg-gray-100">

                    <a className=" hover:bg-gray-600 w-24 m-0.5 flex justify-center rounded-md cursor-pointer hover:text-gray-100 bg-gray-100 text-gray-900">
                        About
                    </a>

                    <div className="w-full h-0.5 bg-gray-300"></div>
                    <a id={fileId} onClick={e => handleAlert(e.currentTarget.id)} className="cursor-pointer m-0.5 w-24 flex justify-center rounded-md hover:bg-gray-600 hover:text-gray-100 bg-gray-100 text-gray-900">
                        Delete
                    </a>
                </div>
            </dialog>
        </>
    )
}