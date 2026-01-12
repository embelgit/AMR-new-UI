import { NavLink } from "react-router-dom";
import { sidebarItems } from "../config/sidebarItems";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const role = localStorage.getItem("role");

  return (
    <aside
      className={`${isCollapsed ? "w-20" : "w-72"
        } h-[calc(100vh-64px)] bg-gradient-to-b from-blue-900 to-blue-700 text-white transition-all duration-300 flex flex-col shadow-xl`}
    >
      {/* Toggle Button Header */}
      <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4 py-4 border-b border-blue-800`}>
        {!isCollapsed && (
          <span className="text-lg font-semibold text-white">Sidebar</span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2.5 rounded-lg hover:bg-blue-800 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-2 overflow-y-auto">
        {sidebarItems
          .filter((item) => item.roles.includes(role))
          .map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.url}
                title={isCollapsed ? item.name : ""}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200
                  ${isActive
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "text-blue-100 hover:bg-blue-800 hover:text-white"
                  }
                  ${isCollapsed ? "justify-center px-3" : ""}`
                }
              >
                <Icon className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="px-4 py-4 border-t border-blue-800">
          <p className="text-xs text-blue-300 text-center">AMR Dashboard v1.0</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
