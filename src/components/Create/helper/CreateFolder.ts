import { FolderContextTypes } from "@/types/FolderTypes";
import { v4 as uuidv4 } from "uuid";

export default function CreateFolder(
  folderName: string,
  folderColor: string,
  folderArguments: FolderContextTypes
) {
  const { path, folders, setFolders, renderFolder, setRenderFolder } =
    folderArguments;
  const temp_folder = { ...renderFolder };
  const folder_id = uuidv4();
  const date = new Date();
  const folder_info = {
    name: folderName,
    color: folderColor,
    created: date.toLocaleDateString(),
    children: {},
  };

  temp_folder.children[folder_id] = folder_info; //adding new folder to current object

  localStorage.setItem("render_folder", JSON.stringify(temp_folder));

  if (setRenderFolder !== null) {
    setRenderFolder(temp_folder); // setting it to render
  }

  const all_folder_temp = { ...folders }; //getting all the folders
  let currentFolders = all_folder_temp; //create a mutable copy of the current folders

  if (path.length > 0) {
    path.forEach((p) => {
      currentFolders.children[p.id] = currentFolders.children[p.id] || {};
      currentFolders = currentFolders.children[p.id];
    });
    currentFolders.children[folder_id] = folder_info;
  } else {
    currentFolders.children[folder_id] = folder_info;
  }

  if (setFolders !== null) {
    setFolders(all_folder_temp);
  }
  localStorage.setItem("all_folder", JSON.stringify(folders));
}
