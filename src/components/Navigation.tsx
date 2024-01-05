import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/ui-components/ui/tooltip";

import React from "react";

interface Path {
  id: string,
  name: string
}

interface NavigationProps {
  path: Path[];
  handleNavigation: (
    val: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  handleBackToHome: (
    val: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;

}

export default function Navigation({
  path,
  handleNavigation,
  handleBackToHome,

}: NavigationProps) {
  return (
    <div className="mt-4 mx-10 flex flex-row items-center justify-between bg-gray-200 rounded-lg p-5">

      <div className="flex flex-row gap-x-3 items-center">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="flex items-center">
                <a
                  onClick={handleBackToHome}
                  className="flex flex-row items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                    />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          <p className="">/</p>
        </div>
        {path.map((p, i) => (
          <div key={i} className="flex flex-row items-center gap-x-2">
            <a
              id={`${i}`}
              onClick={(e) => handleNavigation(e)}
              className="  cursor-pointer hover:text-gray-950 underline flex flex-row items-center justify-center"
            >
              {p.name}
            </a>
            <div>
              <p className="">/</p>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}
