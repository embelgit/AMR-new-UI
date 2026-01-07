// import {
//   FaHome,
//   FaChartBar,
//   FaUsers,
//   FaCog,
//   FaBell,
//   FaMicrochip,
// } from "react-icons/fa";

// export const menuConfig = {
//   SUPER_ADMIN: [
//     { name: "Home", path: "/home", icon: <FaHome /> },
//     { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//     { name: "Devices", path: "/device", icon: <FaMicrochip /> },
//     { name: "Users", path: "/users", icon: <FaUsers /> },
//     { name: "Settings", path: "/settings", icon: <FaCog /> },

//   ],

//   ADMIN: [
//     { name: "Home", path: "/home", icon: <FaHome /> },
//     { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//     { name: "Devices", path: "/device", icon: <FaMicrochip /> },
//     { name: "Alerts", path: "/alerts", icon: <FaBell /> },
//     { name: "Users", path: "/users", icon: <FaUsers /> },
//     { name: "Settings", path: "/settings", icon: <FaCog /> },
//   ],

//   USER: [
//     { name: "Home", path: "/home", icon: <FaHome /> },
//     { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
//   ],
// };

import {
  FaHome,
  FaChartBar,
  FaUsers,
  FaCog,
  FaBell,
  FaMicrochip,
  FaTachometerAlt, // ✅ new icon for Meters
} from "react-icons/fa";

export const menuConfig = {
  SUPER_ADMIN: [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Devices", path: "/device", icon: <FaMicrochip /> },
    { name: "Meters", path: "/meters", icon: <FaTachometerAlt /> }, // ✅ changed icon
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ],

  ADMIN: [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Devices", path: "/device", icon: <FaMicrochip /> },
    { name: "Meters", path: "/meters", icon: <FaTachometerAlt /> }, // ✅ changed icon
    { name: "Alerts", path: "/alerts", icon: <FaBell /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ],

  USER: [
    { name: "Home", path: "/home", icon: <FaHome /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
  ],
};
