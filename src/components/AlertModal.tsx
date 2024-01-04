import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui-components/ui/alert-dialog";
import React from "react";

interface AlertDialogProps {
  isAlertOpen: boolean,
  selectedID: string,
  setAlertOpen: (val: boolean) => void,
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export default function AlertModal({ isAlertOpen, selectedID, setAlertOpen, handleDelete }: AlertDialogProps) {
  return (
    <AlertDialog open={isAlertOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          This will delete this folder and it's subfolder permenantly
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction id={selectedID} onClick={(e) => handleDelete(e)}>
            Confirm
          </AlertDialogAction>
          <AlertDialogCancel onClick={() => setAlertOpen(!isAlertOpen)}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
