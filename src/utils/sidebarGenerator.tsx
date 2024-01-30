import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const sidebarGenerator = (items: TUserPath[]) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item?.name && item?.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item?.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child?.name && child?.path) {
            return {
              key: child.name,
              label: <NavLink to={`${child.path}`}>{child.name}</NavLink>,
            };
          }
        }) as TSidebarItem[],
      });
    }
    return acc;
  }, []);

  return sidebarItems;
};
