import { FolderContextTypes } from "@/types/FolderTypes";
import { compareFunctionDesc } from "./CompareFunctions";

export default function sortFolderDescending(
  folderArguments: FolderContextTypes
) {
  const { folders, path, setFolders, setRenderFolder } = folderArguments;
  const temp_folders = { ...folders };
  const sortable_keys: Array<{ id: string; name: string }> = [];
  let current_folders = temp_folders;
  if (path.length > 0) {
    path.forEach((p) => {
      current_folders.children[p.id] = current_folders.children[p.id] || {};
      current_folders = current_folders.children[p.id];
    });

    Object.keys(current_folders.children).forEach((f) => {
      sortable_keys.push({ id: f, name: current_folders.children[f].name });
    });
    sortable_keys.sort((a, b) => compareFunctionDesc(a, b));
    let temp_child = { ...current_folders.children };
    temp_child = {};
    sortable_keys.forEach((val) => {
      temp_child[val.id] = current_folders.children[val.id];
    });
    current_folders.children = temp_child;

    localStorage.setItem("all_folder", JSON.stringify(temp_folders));
    localStorage.setItem("render_folder", JSON.stringify(current_folders));

    // setRenderFolder(current_folders);
    // setFolders(temp_folders);
    if (setRenderFolder !== null && setFolders !== null) {
      setRenderFolder(current_folders);
      setFolders(temp_folders);
    }
  } else {
    Object.keys(temp_folders.children).forEach((f) => {
      sortable_keys.push({ id: f, name: temp_folders.children[f].name });
    });
    sortable_keys.sort((a, b) => compareFunctionDesc(a, b));
    let temp_child = { ...temp_folders.children };
    temp_child = {};
    sortable_keys.forEach((val) => {
      temp_child[val.id] = temp_folders.children[val.id];
    });
    temp_folders.children = temp_child;
    localStorage.setItem("all_folder", JSON.stringify(temp_folders));
    localStorage.setItem("render_folder", JSON.stringify(temp_folders));

    // setRenderFolder(temp_folders);
    // setFolders(temp_folders);
    if (setRenderFolder !== null && setFolders !== null) {
      setRenderFolder(temp_folders);
      setFolders(temp_folders);
    }
  }

  //setSortOption("descending");
}
