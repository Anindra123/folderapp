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

const rootfolder = JSON.stringify({
  name: "root",
  created: "",
  children: {}
})

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<any>(JSON.parse(
    localStorage.getItem("all_folder") || rootfolder
  ));
  const [renderFolder, setRenderFolder] = useState<any>(JSON.parse(localStorage.getItem("render_folder") || rootfolder));
  const [path, setCurrentPath] = useState<Array<Path>>(JSON.parse(
    localStorage.getItem("path") || JSON.stringify([])
  ));
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [selectedID, setSelectID] = useState("");
  const [folderErr, setFolderErr] = useState("");
  const [sortType, setSortType] = useState("");
  //const [sortOption, setSortOption] = useState("");
  const [isSortOpen, setSortDialog] = useState(false);



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

    localStorage.setItem("path", JSON.stringify(newPath));
    localStorage.setItem("render_folder", JSON.stringify(temp_folder));
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

    localStorage.setItem("render_folder", JSON.stringify(temp_folder));

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

    localStorage.setItem("all_folder", JSON.stringify(folders));
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
      localStorage.setItem("render_folder", JSON.stringify(current_folders));

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
      localStorage.setItem("render_folder", JSON.stringify(temp_folders));

      setRenderFolder(temp_folders);
    }
    localStorage.setItem("all_folder", JSON.stringify(folders));
    setAlertOpen(!isAlertOpen);
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const temp_path: Path[] = [...path]; //get all the path
    temp_path.push(
      { id: e.currentTarget.id, name: renderFolder.children[e.currentTarget.id].name } //set the current path for the element that is clicked
    );
    localStorage.setItem("path", JSON.stringify(temp_path));
    setCurrentPath(temp_path); //update the path
    //set the current folder to render
    const folder_to_render = renderFolder.children[e.currentTarget.id];
    setRenderFolder(folder_to_render);
    localStorage.setItem("render_folder", JSON.stringify(folder_to_render));
  }

  //handle the sorting comparison
  function compareFunctionAsc(a: { id: string, name: string }, b: { id: string, name: string }) {
    //checks if all the character in the current string are less than the next string
    if (a.name < b.name) {
      return -1;
    }
    //checks if all the character in the current string are greter than the next string
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function compareFunctionDesc(a: { id: string, name: string }, b: { id: string, name: string }) {
    //checks if all the character in the current string are less than the next string
    // return high value for inverse effect
    if (a.name < b.name) {
      return 1;
    }
    //checks if all the character in the current string are greater than the next string
    // return low value for inverse effect
    if (a.name > b.name) {
      return -1;
    }
    return 0;
  }

  function sortFolderAscending() {
    const temp_folders = { ...folders };

    const sortable_keys: Array<{ id: string, name: string }> = [];
    let current_folders = temp_folders;
    if (path.length > 0) {

      path.forEach(p => {
        current_folders.children[p.id] = current_folders.children[p.id] || {}
        current_folders = current_folders.children[p.id]
      })

      Object.keys(current_folders.children).forEach((f) => {
        sortable_keys.push({ id: f, name: current_folders.children[f].name });
      })
      sortable_keys.sort((a, b) => compareFunctionAsc(a, b))
      let temp_child = { ...current_folders.children };
      temp_child = {}
      sortable_keys.forEach(val => {
        temp_child[val.id] = current_folders.children[val.id]
      })
      current_folders.children = temp_child;
      localStorage.setItem("all_folder", JSON.stringify(temp_folders));
      localStorage.setItem("render_folder", JSON.stringify(current_folders));
      setRenderFolder(current_folders);
      setFolders(temp_folders);

    } else {
      Object.keys(temp_folders.children).forEach((f) => {
        sortable_keys.push({ id: f, name: temp_folders.children[f].name });
      })
      sortable_keys.sort((a, b) => compareFunctionAsc(a, b))
      let temp_child = { ...temp_folders.children };
      temp_child = {}
      sortable_keys.forEach(val => {
        temp_child[val.id] = temp_folders.children[val.id]
      })
      temp_folders.children = temp_child;

      localStorage.setItem("all_folder", JSON.stringify(temp_folders));
      localStorage.setItem("render_folder", JSON.stringify(temp_folders));
      setRenderFolder(temp_folders);
      setFolders(temp_folders);


    }

    //setSortOption("ascending");
  }

  function sortFolderDescending() {
    const temp_folders = { ...folders };
    const sortable_keys: Array<{ id: string, name: string }> = [];
    let current_folders = temp_folders;
    if (path.length > 0) {

      path.forEach(p => {
        current_folders.children[p.id] = current_folders.children[p.id] || {}
        current_folders = current_folders.children[p.id]
      })

      Object.keys(current_folders.children).forEach((f) => {
        sortable_keys.push({ id: f, name: current_folders.children[f].name });
      })
      sortable_keys.sort((a, b) => compareFunctionDesc(a, b))
      let temp_child = { ...current_folders.children };
      temp_child = {}
      sortable_keys.forEach(val => {
        temp_child[val.id] = current_folders.children[val.id]
      })
      current_folders.children = temp_child;

      localStorage.setItem("all_folder", JSON.stringify(temp_folders));
      localStorage.setItem("render_folder", JSON.stringify(current_folders));

      setRenderFolder(current_folders);
      setFolders(temp_folders);

    } else {
      Object.keys(temp_folders.children).forEach((f) => {
        sortable_keys.push({ id: f, name: temp_folders.children[f].name });
      })
      sortable_keys.sort((a, b) => compareFunctionDesc(a, b))
      let temp_child = { ...temp_folders.children };
      temp_child = {}
      sortable_keys.forEach(val => {
        temp_child[val.id] = temp_folders.children[val.id]
      })
      temp_folders.children = temp_child;
      localStorage.setItem("all_folder", JSON.stringify(temp_folders));
      localStorage.setItem("render_folder", JSON.stringify(temp_folders));

      setRenderFolder(temp_folders);
      setFolders(temp_folders);

    }

    //setSortOption("descending");
  }

  // function handleSort() {
  //   if (sortOption === "ascending") {
  //     console.log(sortOption);
  //     sortFolderAscending();
  //   }
  //   if (sortOption === "descending") {
  //     console.log(sortOption);
  //     sortFolderDescending();
  //   }
  // }

  function handleSortOption(e: string) {
    if (sortType === "Name") {
      if (e === "ascending") {
        sortFolderAscending();
      }
      if (e === "descending") {
        sortFolderDescending();
      }
    }
    //setSortOption(() => e);
    // if (sortType === "Name") {

    //   if ( sortOption === "ascending") {
    //     setSortOption("ascending");
    //     // const temp_folders = { ...folders };

    //     // const sortable_keys: Array<{ id: string, name: string }> = [];
    //     // let current_folders = temp_folders;
    //     // if (path.length > 0) {

    //     //   path.forEach(p => {
    //     //     current_folders.children[p.id] = current_folders.children[p.id] || {}
    //     //     current_folders = current_folders.children[p.id]
    //     //   })

    //     //   Object.keys(current_folders.children).forEach((f) => {
    //     //     sortable_keys.push({ id: f, name: current_folders.children[f].name });
    //     //   })
    //     //   sortable_keys.sort((a, b) => compareFunctionAsc(a, b))
    //     //   let temp_child = { ...current_folders.children };
    //     //   temp_child = {}
    //     //   sortable_keys.forEach(val => {
    //     //     temp_child[val.id] = current_folders.children[val.id]
    //     //   })
    //     //   current_folders.children = temp_child;

    //     //   setRenderFolder(current_folders);
    //     //   setFolders(temp_folders);

    //     // } else {
    //     //   Object.keys(temp_folders.children).forEach((f) => {
    //     //     sortable_keys.push({ id: f, name: temp_folders.children[f].name });
    //     //   })
    //     //   sortable_keys.sort((a, b) => compareFunctionAsc(a, b))
    //     //   let temp_child = { ...temp_folders.children };
    //     //   temp_child = {}
    //     //   sortable_keys.forEach(val => {
    //     //     temp_child[val.id] = temp_folders.children[val.id]
    //     //   })
    //     //   temp_folders.children = temp_child;

    //     //   setRenderFolder(temp_folders);
    //     //   setFolders(temp_folders);


    //     // }
    //     // setSortOption("ascending");
    //     sortFolderAscending();
    //   }
    //   if ( sortOption === "descending") {
    //     // const temp_folders = { ...folders };
    //     // const sortable_keys: Array<{ id: string, name: string }> = [];
    //     // let current_folders = temp_folders;
    //     // if (path.length > 0) {

    //     //   path.forEach(p => {
    //     //     current_folders.children[p.id] = current_folders.children[p.id] || {}
    //     //     current_folders = current_folders.children[p.id]
    //     //   })

    //     //   Object.keys(current_folders.children).forEach((f) => {
    //     //     sortable_keys.push({ id: f, name: current_folders.children[f].name });
    //     //   })
    //     //   sortable_keys.sort((a, b) => compareFunctionDesc(a, b))
    //     //   let temp_child = { ...current_folders.children };
    //     //   temp_child = {}
    //     //   sortable_keys.forEach(val => {
    //     //     temp_child[val.id] = current_folders.children[val.id]
    //     //   })
    //     //   current_folders.children = temp_child;
    //     //   setRenderFolder(current_folders);
    //     //   setFolders(temp_folders);

    //     // } else {
    //     //   Object.keys(temp_folders.children).forEach((f) => {
    //     //     sortable_keys.push({ id: f, name: temp_folders.children[f].name });
    //     //   })
    //     //   sortable_keys.sort((a, b) => compareFunctionDesc(a, b))
    //     //   let temp_child = { ...temp_folders.children };
    //     //   temp_child = {}
    //     //   sortable_keys.forEach(val => {
    //     //     temp_child[val.id] = temp_folders.children[val.id]
    //     //   })
    //     //   temp_folders.children = temp_child;

    //     //   setRenderFolder(temp_folders);
    //     //   setFolders(temp_folders);

    //     // }
    //     // setSortOption("descending");
    //     sortFolderDescending();

    //   }
    // }
    //localStorage.setItem("all_folder", JSON.stringify(folders));
    //handleSort();
  }






  function handleSortDialogOpen() {
    const dialog = document.querySelector("dialog");
    if (isSortOpen) {
      dialog?.close();
      setSortDialog(!isSortOpen)
    }
    else {
      dialog?.show();
      setSortDialog(!isSortOpen)
    }
  }
  return (
    <div className="w-full h-screen gap flex flex-row">
      <div className="bg-gray-300 max-w-80 w-full h-full">
        <div className="mt-10">
          <h1 className="text-3xl font-bold">Folder App</h1>
        </div>
        <CreatFolderDialog
          setDialogOpen={setDialogOpen}
          setFolderName={setFolderName}
          handleSubmit={handleSubmit}
          isOpen={dialogOpen}
          folderError={folderErr}
        />
      </div>
      <div className="flex-1">
        <Navigation
          handleBackToHome={BackToHome}
          handleNavigation={handleNavigation}
          path={path}
        />
        <div className="mt-5 flex flex-row relative items-start mx-10">

          <a onClick={handleSortDialogOpen} className="flex hover:bg-gray-400 flex-row bg-gray-300 rounded-lg gap-x-3 cursor-pointer items-center p-3">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
              </svg>

            </div>
            <div>
              <p className="text-lg font-semibold" >Sort</p>
            </div>
          </a>
          <dialog className="bg-gray-200 max-w-40 m-0 absolute mt-16 w-full shadow-xl rounded-lg">
            <div className="flex flex-row gap-x-3 p-3">
              <input type="radio" name="sort-type" value="Name" onChange={e => setSortType(e.currentTarget.value)} />
              <label>Name</label>

            </div>
            <div className="h-0.5 w-full bg-gray-300"></div>
            <div>


              <div className="flex flex-row p-3  items-center gap-x-3">
                <input type="radio" name="sort-option" value="ascending" onChange={e => handleSortOption(e.target.value)} />
                <label>Ascending</label>
              </div>

              <div className="flex flex-row p-3  items-center gap-x-3">
                <input type="radio" name="sort-option" value="descending" onChange={e => handleSortOption(e.target.value)} />
                <label>Descending</label>
              </div>
            </div>
          </dialog>
        </div>
        <div>

        </div>
        <Folder
          handleAlert={handleAlert}
          isAlertOpen={isAlertOpen}
          selectedID={selectedID}
          setAlertOpen={setAlertOpen}
          handleDelete={handleDelete}
          renderFolder={renderFolder}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default App;
