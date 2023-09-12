import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../data/dummy";
import { useStateContext } from "../context/ContextProvider";
const SideBar = () => {
  const {activeMenu,setActiveMenu,screenSize,currentColor} = useStateContext();

  
  // Active Link CSS
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";

  //Normal Link CSS
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  //handle closing the side bar whenever you click on any of the content
  // for mobile devices only

  const handleCloseSideBar = ()=>{
    if(screenSize<=900 && activeMenu){
      setActiveMenu(false)
    }
  }

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              onClick={handleCloseSideBar}
            >
              <SiShopware />
              <span>Shoppy</span>
            </Link>
            {/* Cancel Button */}
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                //Toggle on off of side bar
                onClick={() => setActiveMenu(prevActiveMenu=>!prevActiveMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => {
              return (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => {
                    return (
                      <NavLink
                        key={link.name}
                        to={`/${link.name}`}
                        style={({isActive})=>({
                          backgroundColor : isActive ? currentColor: ''
                        })}
                        onClick={handleCloseSideBar}
                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                      >
                        {link.icon}
                        <span className="capitalize">{link.name}</span>
                      </NavLink>
                    )
                  })}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;