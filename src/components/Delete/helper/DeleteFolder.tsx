import { FolderContextTypes } from "@/types/FolderTypes";

export default function DeleteFolder(id: string | undefined, folderArguments: FolderContextTypes) {
    const { folders, setFolders, setRenderFolder, path } = folderArguments
    const temp_folders = { ...folders };

    let current_folders = temp_folders;
    //remove the nested object
    if (path.length > 0) {

        path.forEach((p) => {
            current_folders.children[p.id] = current_folders.children[p.id] || {};
            current_folders = current_folders.children[p.id];
        });

        if (id !== undefined) {

            delete current_folders.children[id];
        }

        localStorage.setItem("render_folder", JSON.stringify(current_folders));
        localStorage.setItem("all_folder", JSON.stringify(temp_folders));


        if (setFolders !== null && setRenderFolder !== null) {
            //update the current folders
            setFolders(temp_folders);
            setRenderFolder(current_folders);
        }
    } else {
        //remove all subfolders from the folder
        let temp_paths = current_folders.children[id ?? ""];
        temp_paths = {};
        current_folders.children[id ?? ""] = temp_paths;

        //remove the folder key
        delete current_folders.children[id ?? ""];

        //update the folder object
        // setFolders(temp_folders);
        localStorage.setItem("render_folder", JSON.stringify(temp_folders));
        localStorage.setItem("all_folder", JSON.stringify(temp_folders));

        if (setFolders !== null && setRenderFolder !== null) {
            setFolders(temp_folders);
            setRenderFolder(temp_folders);
        }
    }

}