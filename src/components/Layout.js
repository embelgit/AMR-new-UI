import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMeterType, setSelectedMeterType] = useState(null);

  // Handle Resize for Mobile/Desktop check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Reset on desktop
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* SIDEBAR (Left) */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* CONTENT AREA (Right) */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* TOP NAVBAR */}
        <TopNavbar
          onMenuClick={() => setIsSidebarOpen(true)}
          isMobile={isMobile}
          selectedMeterType={selectedMeterType}
          setSelectedMeterType={setSelectedMeterType}
        />

        {/* MAIN PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <Outlet context={{ selectedMeterType, setSelectedMeterType }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
