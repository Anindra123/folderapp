import { FolderContextTypes } from "@/types/FolderTypes";
import { createContext } from "react";

const intialValues: FolderContextTypes = {
  folders: {},
  setRenderFolder: null,
  setFolders: null,
  path: [],
  setCurrentPath: null,
  renderFolder: {},
};

export const FolderContext = createContext<FolderContextTypes>(intialValues);
