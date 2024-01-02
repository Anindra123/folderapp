import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui-components/ui/dialog'


interface CreateFolderProps {
    handleSubmit: () => void,
    setFolderName: Dispatch<SetStateAction<string>>,
    isOpen: boolean,
    setDialogOpen: Dispatch<SetStateAction<boolean>>,
}


export default function CreatFolderDialog({ handleSubmit, setFolderName, isOpen, setDialogOpen }: CreateFolderProps) {
    return (
        <Dialog open={isOpen}>
            <DialogTrigger onClick={() => { setDialogOpen(!isOpen) }} className='p-2 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-bold'>Create Folder</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Folder
                    </DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-4 gap-x-4 items-center'>
                    <div>
                        <p>Name :</p>
                    </div>
                    <div className='col-span-3'>
                        <input type="text" onChange={(e) => setFolderName(e.target.value)} className='p-3 ring-gray-600 ring-1 rounded-lg focus:ring-gray-800 focus:ring-1' placeholder='Enter folder name' />
                    </div>
                </div>
                <div className='flex items-start justify-end gap-x-2'>
                    <DialogFooter onClick={handleSubmit} className='bg-gray-600 text-white cursor-pointer font-semibold p-2 rounded-lg hover:bg-gray-800'>
                        Save
                    </DialogFooter>
                    <DialogFooter onClick={() => setDialogOpen(!isOpen)} className='bg-gray-600 text-white cursor-pointer font-semibold p-2 rounded-lg hover:bg-gray-800'>
                        Close
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}