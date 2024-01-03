import React from "react"


interface FolderProps {
    renderFolder: any,
    handleClick: (val: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}



export default function Folder({ renderFolder, handleClick }: FolderProps) {


    return (
        <>



            <div className='grid mt-10 grid-cols-12 gap-x-3 w-full'>
                {Object.keys(renderFolder).map((f, i) => (
                    <a key={i} className='flex flex-row items-center gap-x-3 col-span-2 p-3 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400 justify-start' id={f} onClick={(e) => handleClick(e)}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                            </svg>
                        </div>
                        <div>
                            <h1>{f}</h1>
                        </div>
                    </a>
                ))}
            </div>

        </>
    )
}