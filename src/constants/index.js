import { HomeIcon, SettingIcon, EditIcon, LogoutIcon, Management, NotificationIcon, InventoryIcon, DashboardIcon, MenuIcon } from "../assets/svgs";

const listMenuBasedOnUser = {
  user: [
    {
      path: "/user/home",
      icon: HomeIcon,
    },
    {
      path: "/user/orders",
      icon: NotificationIcon,
    },
    {
      path: "/user/setting",
      icon: SettingIcon,
    },
  ],
  staff: [
    {
      path: "/staff/home",
      icon: HomeIcon,
    },
    {
      path: "/staff/dashboard",
      icon: DashboardIcon,
    },
    {
      path: "/staff/inventory",
      icon: InventoryIcon,
    },
    {
      path: "/staff/report",
      icon: EditIcon,
    },
    {
      path: "/staff/dailymenu",
      icon: MenuIcon,
    },
    {
      path: "/staff/preorders",
      icon: NotificationIcon,
    },
    {
      path: "/staff/setting",
      icon: SettingIcon,
    },
  ],
  admin: [
    {
      path: "/admin/home",
      icon: HomeIcon,
    },
    {
      path: "/admin/dashboard",
      icon: DashboardIcon,
    },
    {
      path: "/admin/inventory",
      icon: InventoryIcon,
    },
    {
      path: "/admin/orders",
      icon: NotificationIcon,
    },
    {
      path: "/admin/management",
      icon: Management,
    }
  ],
};

export { listMenuBasedOnUser };
