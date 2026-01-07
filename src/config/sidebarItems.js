// import {
//   HomeIcon,
//   ChartBarIcon,
//   CpuChipIcon,
//   UsersIcon,
//   BellAlertIcon,
//   DocumentTextIcon,
//   Cog6ToothIcon,
//   CreditCardIcon,
// } from "@heroicons/react/24/outline";

// export const sidebarItems = [
//   {
//     name: "Home",
//     url: "/home",
//     icon: HomeIcon,
//     roles: ["SUPER_ADMIN", "ADMIN", "USER"],
//   },
//   {
//     name: "Dashboard",
//     url: "/dashboard",
//     icon: ChartBarIcon,
//     roles: ["SUPER_ADMIN", "ADMIN"],
//   },
//   {
//     name: "Devices",
//     url: "/device",
//     icon: CpuChipIcon,
//     roles: ["SUPER_ADMIN", "ADMIN"],
//   },
//   {
//     name: "Users",
//     url: "/users",
//     icon: UsersIcon,
//     roles: ["SUPER_ADMIN"],
//   },
//   {
//     name: "Reports",
//     url: "/report",
//     icon: DocumentTextIcon,
//     roles: ["SUPER_ADMIN", "ADMIN", "USER"],
//   },
//   {
//     name: "Billing",
//     url: "/billing",
//     icon: CreditCardIcon,
//     roles: ["SUPER_ADMIN"],
//   },
//   {
//     name: "Alerts",
//     url: "/alert-report",
//     icon: BellAlertIcon,
//     roles: ["SUPER_ADMIN", "ADMIN", "USER"],
//   },
//   {
//     name: "Settings",
//     url: "/settings",
//     icon: Cog6ToothIcon,
//     roles: ["SUPER_ADMIN"],
//   },
// ];

import {
 // HomeIcon,
  ChartBarIcon,
  CpuChipIcon,
  UsersIcon,
  BellAlertIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  BoltIcon, // ✅ new icon for Meters
} from "@heroicons/react/24/outline";

export const sidebarItems = [
  // {
  //   name: "Home",
  //   url: "/home",
  //   icon: HomeIcon,
  //   roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  // },
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: ChartBarIcon,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Meters",
    url: "/meters",
    icon: BoltIcon, // ✅ different from Devices
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Devices",
    url: "/device",
    icon: CpuChipIcon,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Users",
    url: "/users",
    icon: UsersIcon,
    roles: ["SUPER_ADMIN"],
  },
  {
    name: "Reports",
    url: "/report",
    icon: DocumentTextIcon,
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    name: "Billing",
    url: "/billing",
    icon: CreditCardIcon,
    roles: ["SUPER_ADMIN"],
  },
  {
    name: "Alerts",
    url: "/alert-report",
    icon: BellAlertIcon,
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    name: "Settings",
    url: "/settings",
    icon: Cog6ToothIcon,
    roles: ["SUPER_ADMIN"],
  },
];
