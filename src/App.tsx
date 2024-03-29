import React, { useState } from "react";
import { Path } from "./types/FolderTypes";
import "./App.css";
import Navigation from "./components/Navigation";
import { FolderContext } from "./context/FolderContext";
import CreateFolderModal from "./components/Create/CreateFolderModal";
import FolderGrid from "./components/FolderGrid";



const rootfolder = JSON.stringify({
  name: "root",
  color: "#000000",
  created: "",
  children: {}
})



function App() {

  const [folders, setFolders] = useState<any>(JSON.parse(
    localStorage.getItem("all_folder") || rootfolder
  ));
  const [renderFolder, setRenderFolder] = useState<any>(JSON.parse(localStorage.getItem("render_folder") || rootfolder));
  const [path, setCurrentPath] = useState<Array<Path>>(JSON.parse(
    localStorage.getItem("path") || JSON.stringify([])
  ));


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

    localStorage.setItem("path", JSON.stringify(newPath));
    localStorage.setItem("render_folder", JSON.stringify(temp_folder));
    setCurrentPath(newPath);

    setRenderFolder(temp_folder);
  }

  function BackToHome() {
    localStorage.setItem("render_folder", JSON.stringify(folders));
    localStorage.setItem("all_folder", JSON.stringify(folders));
    localStorage.setItem("path", JSON.stringify([]));

    setRenderFolder({ ...folders });

    setCurrentPath([]);
  }





  return (
    <div className="w-full h-screen gap flex flex-row" >
      <div className="bg-gray-300 max-w-80 w-full h-full">
        <div className="mt-10">
          <h1 className="text-3xl font-bold">Folder App</h1>
        </div>

        <FolderContext.Provider value={{
          folders: folders,
          setFolders: setFolders,
          path: path,
          setCurrentPath: setCurrentPath,
          setRenderFolder: setRenderFolder,
          renderFolder: renderFolder
        }}>
          <CreateFolderModal />
        </FolderContext.Provider>
      </div>
      <div className="flex-1">
        <Navigation
          handleBackToHome={BackToHome}
          handleNavigation={handleNavigation}
          path={path}
        />


        <FolderContext.Provider value={{
          folders: folders
          , setFolders: setFolders
          , path: path
          , setCurrentPath: setCurrentPath
          , setRenderFolder: setRenderFolder
          , renderFolder: renderFolder
        }}>
          <FolderGrid />
        </FolderContext.Provider>
      </div>
    </div>
  );
}

export default App;
