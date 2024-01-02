import { useState } from "react"
import CreatFolderDialog from "./CreateFolderDialog"
import { v4 as uuidv4 } from 'uuid';

type Folder = {
    id: string,
    name: string,

}

interface FolderProps {
    parentFolder: string[],

}

export default function Folder({ parentFolder }: FolderProps) {
    const [folder, setFolder] = useState<Folder[]>([])
    const [isParent, setIsParent] = useState(false);
    const [parentFolders, setParentFolder] = useState<string[]>(parentFolder);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    function handleSubmit() {
        setFolder([...folder, { name: folderName, id: uuidv4() }])
        setDialogOpen(false);

    }

    function handleClick(id: string) {

        setIsParent(true);

        setParentFolder([...parentFolder, id])


    }
    return (
        <>

            {isParent ?
                (<Folder parentFolder={parentFolders
                } />) :
                (<>
                    <CreatFolderDialog setDialogOpen={setDialogOpen} setFolderName={setFolderName} handleSubmit={handleSubmit} isOpen={dialogOpen} />
                    <div className="mt-10">
                        <h1>{`Current path : /${parentFolder.toString().split(",").join("/")}`}</h1>
                    </div>
                    <div className='grid mt-10 grid-cols-12 gap-x-3 w-full'>
                        {folder.map((f) => (<a key={f.id} className='flex flex-row items-center gap-x-2 col-span-3 px-3 py-2 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-400 justify-start' id={f.name} onClick={(e) => handleClick(e.currentTarget.id)}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                                </svg>
                            </div>
                            <div>
                                <h1>{f.name}</h1>
                            </div>
                        </a>))}
                    </div>
                </>)
            }
        </>
    )
}