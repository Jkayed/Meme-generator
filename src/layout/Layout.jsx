import { useContext, createContext, useState, useRef } from "react";
import { Outlet} from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import "../css/App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
const SidebarContext = createContext();
function Layout({ children }) {
  const [expanded, setExpanded] = useState(true);
  const { user, isAuthenticated } = useAuth0();

  return (
    <div className="flex">
      <aside className={`h-screen ${expanded ? "w-52" : ""}`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm z-0 fixed">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="#"
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <IoIosMenu />
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            {isAuthenticated ? (
              <img
                src={isAuthenticated ? user.picture : "#"}
                className="w-10 h-10 rounded-md"
              />
            ) : (
              <CgProfile className="w-10 h-10 rounded-md" />
            )}
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-27 ml-3" : "w-0"}
            `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">
                  {isAuthenticated
                    ? user.nickname
                    : "Please log in to use features"}
                </h4>
                <span className="text-xs text-gray-600">
                  {isAuthenticated ? user.email : ""}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-28 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6 whitespace-nowrap
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
