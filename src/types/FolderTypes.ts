import React from "react";

export interface Path {
  id: string;
  name: string;
}

export interface FolderData {
  folderName: string;
  folderColor: string;
}
export interface FolderErrData {
  folderNameErr: string;
  folderColorErr: string;
}

export interface FolderContextTypes {
  folders: any;
  setFolders: React.Dispatch<any> | null;
  setRenderFolder: React.Dispatch<any> | null;
  renderFolder: any;
  path: Array<Path>;
  setCurrentPath: React.Dispatch<Array<Path>> | null;
}
