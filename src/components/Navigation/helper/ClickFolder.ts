import { FolderContextTypes, Path } from "@/types/FolderTypes";

export default function ClickFolder(
  folder_id: string,
  folderArguments: FolderContextTypes
) {
  const { path, renderFolder, setCurrentPath, setRenderFolder } =
    folderArguments;

  const temp_path: Path[] = [...path]; //get all the path
  temp_path.push(
    { id: folder_id, name: renderFolder.children[folder_id].name } //set the current path for the element that is clicked
  );
  localStorage.setItem("path", JSON.stringify(temp_path));
  setCurrentPath !== null && setCurrentPath(temp_path); //update the path
  //set the current folder to render
  const folder_to_render = renderFolder.children[folder_id];
  setRenderFolder !== null && setRenderFolder(folder_to_render);
  localStorage.setItem("render_folder", JSON.stringify(folder_to_render));
}
