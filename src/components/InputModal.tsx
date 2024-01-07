import { FolderData, FolderErrData } from "@/types/FolderTypes"
import React, { Dispatch, SetStateAction } from "react"

interface InputModalProps {
    inputDialogRef: React.RefObject<HTMLDialogElement>,
    isDialogOpen: boolean,
    folderColorRef: React.RefObject<HTMLInputElement>,
    confirmButtonRef: React.RefObject<HTMLAnchorElement>
    folderData: FolderData,
    folderErrData: FolderErrData,
    setFolderData: Dispatch<SetStateAction<FolderData>>,
    handleSubmit: () => void,
    handleModalOpen: () => void,
}

export default function InputModal({ inputDialogRef
    , confirmButtonRef
    , folderColorRef
    , isDialogOpen
    , folderData
    , folderErrData
    , setFolderData
    , handleSubmit
    , handleModalOpen }: InputModalProps) {
    return (
        <>

            <dialog ref={inputDialogRef} className={`bg-gray-100 border w-max backdrop:bg-gray-900 backdrop:opacity-65 border-gray-900 transition-all duration-300 ease-in-out rounded-lg ${isDialogOpen ? "scale-100" : "scale-0"}`}>
                <div className="flex flex-col rounded-lg bg-gray-100 min-w-96 p-10">
                    <div className="w-full">
                        <h1 className="text-2xl text-left font-bold">Create folder</h1>
                    </div>
                    <div className="w-full grid grid-cols-6 mt-10 items-center gap-y-3 gap-x-2">
                        <div className="col-span-2">
                            <h3 className="text-xl text-left font-semibold">Folder Name :</h3>
                        </div>
                        <div className="col-span-4">
                            <input type="text"
                                className={`p-3 rounded-lg bg-gray-300 w-full focus:outline-none  ${folderErrData.folderNameErr.length > 0 ? "focus:border-2 focus:border-red-500" : "focus:border-2 focus:border-gray-900"}`}
                                onChange={(e) => setFolderData({ ...folderData, folderName: e.currentTarget.value })}
                                value={folderData.folderName}
                            />
                        </div>
                        <div className="col-span-2">
                        </div>
                        <div className="col-span-4">
                            <h3 className="text-red-500 text-left font-semibold text-md">{folderErrData.folderNameErr}</h3>
                        </div>
                        <div className="col-span-6">
                            <h3 className="text-xl text-left font-semibold">Pick Color:</h3>
                        </div>
                        <div className="col-span-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={folderData.folderColor}
                                className="w-24 h-24"
                            >
                                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                            </svg>
                        </div>

                        <div className="col-span-4">
                            <div className="w-full rounded-lg p-3 ring-1 flex felx-row gap-x-2 ring-gray-400">
                                <input
                                    type="color"
                                    ref={folderColorRef}
                                    className="w-12 h-12 pointer-events-none"
                                    value={folderData.folderColor}
                                    onChange={(e) => setFolderData({ ...folderData, folderColor: e.currentTarget.value })}
                                />
                                <input
                                    type="text"
                                    className="px-3 rounded-lg bg-gray-300"
                                    value={folderData.folderColor}
                                    onChange={(e) => setFolderData({ ...folderData, folderColor: e.currentTarget.value })}
                                />
                                <a className="rounded-lg flex  items-center p-4 cursor-pointer ring-1 hover:bg-gray-300 ring-gray-400 bg-gray-100" onClick={() => folderColorRef.current?.click()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />
                                    </svg>

                                </a>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <h3 className="text-md text-left font-semibold text-red-500">{folderErrData.folderColorErr}</h3>
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