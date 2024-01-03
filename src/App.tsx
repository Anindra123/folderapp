
import { useState } from 'react'
import './App.css'
import CreatFolderDialog from './components/CreateFolderDialog';
import Folder from './components/Folder';
import Navigation from './components/Navigation';



const initial_folder: any = {
  folder1: {},
  folder2: { sub1: {}, sub2: { subsub1: {} } },
}



function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState(initial_folder);
  const [renderFolder, setRenderFolder] = useState(initial_folder);
  const [path, setCurrentPath] = useState<string[]>([]);

  function handleNavigation(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    //check if current folders is accessed
    if (path[path.length - 1] === path[Number(e.currentTarget.id)]) return;
    let temp_folder = { ...folders }

    //get all the folders that is under the current path
    path.slice(0, Number(e.currentTarget.id) + 1).forEach((p) => {

      temp_folder = temp_folder[p]
    })

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
    // since i need to creat subfolder on deeply nested object
    path.map(p => {
      const currKey = p;
      currentFolders[currKey] = currentFolders[currKey] || {}
      currentFolders = currentFolders[currKey]
    })

    //assigning new folder on that flatlist
    currentFolders[folderName] = {};

    setFolders(all_folder_temp);
    setDialogOpen(false);
  }
  function BackToHome() {
    setRenderFolder({ ...folders })

    setCurrentPath([]);
  }

  function handleDelete(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    let temp_folders = { ...folders };

    temp_folders = Object.keys(temp_folders)
      .filter((f) => f.includes(e.currentTarget.id));

    console.log(temp_folders);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const temp_path: string[] = [...path]; //get all the path
    temp_path.push(e.currentTarget //set the current path for the element that is clicked
      .id);
    setCurrentPath(temp_path) //update the path

    //set the current folder to render
    const folder_to_render = renderFolder[e.currentTarget.id];
    setRenderFolder(folder_to_render);
  }
  return (
    <>

      <CreatFolderDialog setDialogOpen={setDialogOpen} setFolderName={setFolderName} handleSubmit={handleSubmit} isOpen={dialogOpen} />
      <Navigation handleBackToHome={BackToHome} handleNavigation={handleNavigation} path={path} />
      <Folder renderFolder={renderFolder} handleClick={handleClick} />

    </>
  )
}

export default App
