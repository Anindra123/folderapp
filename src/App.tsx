import React, { useState } from "react";
import "./App.css";
import CreatFolderDialog from "./components/CreateFolderDialog";
import Folder from "./components/Folder";
import Navigation from "./components/Navigation";



function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<any>({});
  const [renderFolder, setRenderFolder] = useState<any>({});
  const [path, setCurrentPath] = useState<string[]>([]);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [selectedID, setSelectID] = useState("");
  function handleAlert(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setSelectID(e.currentTarget.id);
    setAlertOpen(!isAlertOpen);
  }

  function handleNavigation(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    //check if current folders is accessed
    if (path[path.length - 1] === path[Number(e.currentTarget.id)]) return;
    let temp_folder = { ...folders };

    //get all the folders that is under the current path
    path.slice(0, Number(e.currentTarget.id) + 1).forEach((p) => {
      temp_folder = temp_folder[p];
    });

    //set the navigation bar to have the new path
    const newPath = path.slice(0, Number(e.currentTarget.id) + 1);

    setCurrentPath(newPath);

    setRenderFolder(temp_folder);
  }
  function handleSubmit() {
    const temp_folder = { ...renderFolder };
    temp_folder[folderName] = {}; //adding new folder to current object
    setRenderFolder(temp_folder); // setting it to render

    const all_folder_temp = { ...folders }; //getting all the folders
    let currentFolders = all_folder_temp; //create a mutable copy of the current folders

    //creating a flatlist
    // since i need to create subfolder on deeply nested object
    path.forEach((p) => {
      const currKey = p;
      currentFolders[currKey] = currentFolders[currKey] || {};
      currentFolders = currentFolders[currKey];
    });

    //assigning new folder on that flatlist
    currentFolders[folderName] = {};

    setFolders(all_folder_temp);
    setDialogOpen(false);
  }
  function BackToHome() {
    setRenderFolder({ ...folders });

    setCurrentPath([]);
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const temp_folders = { ...folders };

    let current_folders = temp_folders;
    //remove the nested object
    if (path.length > 0) {
      path.forEach((p) => {
        current_folders[p] = current_folders[p] || {};
        current_folders = current_folders[p];
      });
      delete current_folders[e.currentTarget.id];

      //update the current folders
      setFolders(temp_folders);
      setRenderFolder(current_folders);
    } else {
      //remove all subfolders from the folder
      let temp_paths = current_folders[e.currentTarget.id];
      temp_paths = {};
      current_folders[e.currentTarget.id] = temp_paths;

      //remove the folder key
      delete current_folders[e.currentTarget.id];

      //update the folder object
      setFolders(temp_folders);
      setRenderFolder(temp_folders);
    }
    setAlertOpen(!isAlertOpen);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const temp_path: string[] = [...path]; //get all the path
    temp_path.push(
      e.currentTarget.id //set the current path for the element that is clicked
    );
    setCurrentPath(temp_path); //update the path

    //set the current folder to render
    const folder_to_render = renderFolder[e.currentTarget.id];
    setRenderFolder(folder_to_render);
  }
  return (
    <>
      <CreatFolderDialog
        setDialogOpen={setDialogOpen}
        setFolderName={setFolderName}
        handleSubmit={handleSubmit}
        isOpen={dialogOpen}
      />
      <Navigation
        handleBackToHome={BackToHome}
        handleNavigation={handleNavigation}
        path={path}
      />
      <Folder
        handleAlert={handleAlert}
        isAlertOpen={isAlertOpen}
        selectedID={selectedID}
        setAlertOpen={setAlertOpen}
        handleDelete={handleDelete}
        renderFolder={renderFolder}
        handleClick={handleClick}
      />
    </>
  );
}

export default App;
