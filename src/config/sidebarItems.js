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
  BeakerIcon, // ✅ icon for Water
  FireIcon, // ✅ icon for Gas
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
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    name: "Water",
    url: "/water-dashboard",
    icon: BeakerIcon,
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    name: "Gas",
    url: "/gas-dashboard",
    icon: FireIcon,
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    name: "Energy",
    url: "/energy-dashboard",
    icon: BoltIcon,
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    name: "Devices",
    url: "/devices-meters",
    icon: CpuChipIcon,
    roles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    name: "Users",
    url: "/users",
    icon: UsersIcon,
    roles: ["SUPER_ADMIN", "ADMIN"],
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
    name: "Payloads",
    url: "/payloads",
    icon: ChartBarIcon,
    roles: ["SUPER_ADMIN", "ADMIN", "USER"],
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
