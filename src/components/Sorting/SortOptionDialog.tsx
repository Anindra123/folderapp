import { FolderContext } from "@/context/FolderContext";
import { useContext, useEffect, useRef, useState } from "react";
import sortFolderAscending from "./helper/SortFolderAscending";
import sortFolderDescending from "./helper/SortFolderDescending";



export default function SortOptionDialog() {
    const folderContext = useContext(FolderContext)
    const [sortType, setSortType] = useState("Name");
    const [isDialogOpen, setDialogOpen] = useState(false);

    const sortDialogRef = useRef<HTMLDialogElement>(null)

    function handleSortDialogOpen() {
        if (isDialogOpen) {
            setDialogOpen(false);

        }
        else {
            setDialogOpen(true);


        }

    }

    useEffect(() => {
        function handleClick(e: Event) {
            const target = e.target as HTMLElement;
            console.log(target);
            if (!target.classList.contains("sortDialogBtn")) {
                setDialogOpen(false);
            }
        }
        document.body.addEventListener("click", handleClick);
        return () => document.body.removeEventListener("click", handleClick)
    })

    function handleSortOption(e: string) {
        if (sortType === "Name") {
            if (e === "ascending") {
                sortFolderAscending(folderContext);
            }
            if (e === "descending") {
                sortFolderDescending(folderContext);
            }
        }
    }

    return (
        <div className="mt-5 flex flex-row relative items-start mx-10">

            <a onClick={handleSortDialogOpen} className="flex sortDialogBtn hover:bg-gray-400 flex-row bg-gray-300 rounded-lg gap-x-3 cursor-pointer items-center p-3">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 sortDialogBtn">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>

                </div>
                <div>
                    <p className="text-lg font-semibold sortDialogBtn" >Sort</p>
                </div>
            </a>
            <dialog ref={sortDialogRef} open className={`bg-gray-200 max-w-40 m-0  absolute mt-16 w-full shadow-xl  rounded-lg transition-all ease-in-out duration-500  ${isDialogOpen ? "opacity-100 translate-y-0 z-50" : "opacity-0 -z-50 translate-y-8"}`}>
                <div className="flex flex-row gap-x-3 p-3">
                    <input type="radio" checked={sortType === "Name"} name="sort-type" value="Name" onChange={e => setSortType(e.currentTarget.value)} />
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
    )
}