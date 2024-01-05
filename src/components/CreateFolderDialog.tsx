import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui-components/ui/dialog";

interface CreateFolderProps {
  handleSubmit: () => void;
  setFolderName: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  folderError: string;
}

export default function CreatFolderDialog({
  handleSubmit,
  setFolderName,
  isOpen,
  setDialogOpen,
  folderError
}: CreateFolderProps) {
  function handleTextChange(e: React.KeyboardEvent<HTMLInputElement>) {

    setFolderName(e.currentTarget.value);
    if (isOpen === true && e.key === 'Enter') {
      handleSubmit();
    }
    if (isOpen === true && e.key === "Escape") {
      setDialogOpen(!isOpen);
      setFolderName("");
    }
  }
  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => {
          setDialogOpen(!isOpen);
          setFolderName("");
        }}
        className="p-2 mt-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 hover:bg-gray-900 text-white font-bold"
      >
        Create Folder
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-8 gap-x-4 items-center">
          <div className="col-span-4">
            <p>Name :</p>
          </div>
          <div className="col-span-4">
            <input
              type="text"
              onKeyUp={(e) => handleTextChange(e)}
              className={`p-3 ring-gray-600 ring-1 rounded-lg focus:ring-gray-800 ${folderError.length > 0 && 'ring-2 ring-red-600'} focus:ring-1`}
              placeholder="Enter folder name"
            />
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <p className="text-md text-red-600">{folderError}</p>
          </div>
        </div>
        <div className="flex items-start justify-end gap-x-2">
          <DialogFooter
            onClick={handleSubmit}
            className="bg-gray-600 text-white cursor-pointer font-semibold p-2 rounded-lg hover:bg-gray-800"
          >
            Save
          </DialogFooter>
          <DialogFooter
            onClick={() => setDialogOpen(!isOpen)}
            className="bg-gray-600 text-white cursor-pointer font-semibold p-2 rounded-lg hover:bg-gray-800"
          >
            Close
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
