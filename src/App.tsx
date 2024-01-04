import React, { useState } from "react";
import "./App.css";
import CreatFolderDialog from "./components/CreateFolderDialog";
import Folder from "./components/Folder";
import Navigation from "./components/Navigation";
import { v4 as uuidv4 } from 'uuid'

interface Path {
  id: string,
  name: string
}

const rootfolder = {
  name: "root",
  created: "",
  children: {}
}

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<any>(rootfolder);
  const [renderFolder, setRenderFolder] = useState<any>(rootfolder);
  const [path, setCurrentPath] = useState<Array<Path>>([]);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [selectedID, setSelectID] = useState("");
  const [folderErr, setFolderErr] = useState("");


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
      temp_folder = temp_folder.children[p.id];
    });

    //set the navigation bar to have the new path
    const newPath = path.slice(0, Number(e.currentTarget.id) + 1);

    setCurrentPath(newPath);

    setRenderFolder(temp_folder);
  }
  function handleSubmit() {
    setFolderErr("");

    if (folderName.trim().length === 0) {
      setFolderErr("Folder name cannot be empty");
      return;
    }

    const temp_folder = { ...renderFolder };
    const folder_id = uuidv4();
    const date = new Date();
    const folder_info = { name: folderName, created: date.toLocaleDateString(), children: {} };

    temp_folder.children[folder_id] = folder_info //adding new folder to current object
    setRenderFolder(temp_folder); // setting it to render

    const all_folder_temp = { ...folders }; //getting all the folders
    let currentFolders = all_folder_temp; //create a mutable copy of the current folders

    if (path.length > 0) {


      path.forEach((p) => {

        currentFolders.children[p.id] = currentFolders.children[p.id] || {}
        currentFolders = currentFolders.children[p.id];
      })
      currentFolders.children[folder_id] = folder_info;

    }
    else {
      currentFolders.children[folder_id] = folder_info;
    }



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
        current_folders.children[p.id] = current_folders.children[p.id] || {};
        current_folders = current_folders.children[p.id];
      });

      delete current_folders.children[e.currentTarget.id];

      //update the current folders
      setFolders(temp_folders);
      setRenderFolder(current_folders);
    } else {
      //remove all subfolders from the folder
      let temp_paths = current_folders.children[e.currentTarget.id];
      temp_paths = {};
      current_folders.children[e.currentTarget.id] = temp_paths;

      //remove the folder key
      delete current_folders.children[e.currentTarget.id];

      //update the folder object
      setFolders(temp_folders);
      setRenderFolder(temp_folders);
    }
    setAlertOpen(!isAlertOpen);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const temp_path: Path[] = [...path]; //get all the path
    temp_path.push(
      { id: e.currentTarget.id, name: renderFolder.children[e.currentTarget.id].name } //set the current path for the element that is clicked
    );
    setCurrentPath(temp_path); //update the path

    //set the current folder to render
    const folder_to_render = renderFolder.children[e.currentTarget.id];
    setRenderFolder(folder_to_render);
  }
  return (
    <>
      <CreatFolderDialog
        setDialogOpen={setDialogOpen}
        setFolderName={setFolderName}
        handleSubmit={handleSubmit}
        isOpen={dialogOpen}
        folderError={folderErr}
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
