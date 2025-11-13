import Sidebar from "../Sidebar";
import * as React from "react";

type SidebarProps = {
  loggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const DesktopNavbar = ({ loggedIn }: SidebarProps) => {
  return <Sidebar loggedIn={loggedIn} />;
};

export default DesktopNavbar;
