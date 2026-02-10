import { NavLink } from "react-router-dom";
import { sidebarItems } from "../config/sidebarItems";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import logoFull from "../assets/embel-logo-full.png";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobile, isOpen, setIsOpen }) => {
  const role = localStorage.getItem("role");

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-56 bg-white text-slate-600 transition-transform duration-300 shadow-[20px_0_40px_rgba(0,0,0,0.1)] ${isOpen ? "translate-x-0" : "-translate-x-full"}`
    : `${isCollapsed ? "w-14" : "w-56"} bg-white text-slate-600 transition-all duration-300 flex flex-col shadow-[8px_0_30px_-10px_rgba(0,0,0,0.1)] border-r border-slate-100 z-20`;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={sidebarClasses}>
        <div
          className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "justify-between"
            } px-4 h-16 bg-white`}
        >
          {(!isCollapsed || isMobile) ? (
            <div className="flex items-center overflow-hidden">
              <img src={logoFull} alt="AMR Logo" className="h-8 w-auto object-contain" />
            </div>
          ) : (
            /* Toggle Button when collapsed - Centered in header */
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-blue-500 transition-all"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-slate-400" />
            </button>
          )}

          {/* Desktop Sidebar Toggle (Hamburger) - Expanded State */}
          {!isMobile && !isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-300 hover:text-blue-500 transition-all group"
            >
              <Bars3Icon className="w-5 h-5 group-hover:scale-110" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">


          {sidebarItems
            .filter((item) => {
              if (!item.roles.includes(role)) return false;
              if (role === 'ADMIN') {
                const assignedMeters = JSON.parse(localStorage.getItem('assignedMeters') || '[]');
                // If the item is Water, Gas, or Energy, check if it's assigned
                if (item.name === 'Water' && !assignedMeters.includes('WATER')) return false;
                if (item.name === 'Gas' && !assignedMeters.includes('GAS')) return false;
                if (item.name === 'Energy' && !assignedMeters.includes('ELECTRIC')) return false;
              }
              return true;
            })
            .map((item) => {
              const Icon = item.icon;

              // Dynamic labels/urls for Role specific view
              let displayName = item.name;
              let targetUrl = item.url;
              if (role === 'USER' && item.name === 'Dashboard') {
                displayName = 'Solar';
                targetUrl = '/solar-dashboard';
              }

              // Add badges to specific items
              const showBadge = item.name === "Device" || item.name === "Alerts/Alarms";
              const badgeCount = item.name === "Device" ? 3 : item.name === "Alerts/Alarms" ? 1 : 0; // Mock counts

              return (
                <NavLink
                  key={item.name}
                  to={targetUrl}
                  title={isCollapsed && !isMobile ? displayName : ""}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group
                    ${isActive
                      ? "bg-blue-600 text-white shadow-[0_10px_15px_-3px_rgba(37,99,235,0.3)]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                    ${isCollapsed && !isMobile ? "justify-center px-0 w-10 h-10 mx-auto" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`h-5 w-5 flex-shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      {(!isCollapsed || isMobile) && (
                        <span className="flex-1 truncate">{displayName}</span>
                      )}

                      {/* Badge */}
                      {(!isCollapsed || isMobile) && showBadge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm transition-colors
                            ${isActive ? 'bg-white text-blue-600' : 'bg-orange-500 text-white'}
                          `}>
                          {badgeCount}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
        </nav>

        {/* Footer */}
        {(!isCollapsed || isMobile) && (
          <div className="px-4 py-4 border-t border-slate-50 text-center">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-300">
              &copy; 2026 Embel Tech
            </p>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
