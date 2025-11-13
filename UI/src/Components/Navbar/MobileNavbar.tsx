import * as React from "react";
import { useState } from "react";
import { Menu } from "lucide-react";
import MobileDrawer from "./MobileDrawer";

type Props = {
  loggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavbar = ({ loggedIn }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="w-full h-14 flex items-center justify-between px-4 bg-gradient-to-b from-gradient-start to-gradient-end dark:from-primary-dark dark:to-primary-light border-b-2 border-edge-primary dark:border-edge-dark-primary">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-white/80 dark:bg-panel-dark/80"
          aria-label="Menüyü Aç"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="text-sm md:text-base font-semibold text-content-secondary dark:text-content-dark-secondary">
          Nemora
        </div>
        <div className="w-9" />
      </header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} loggedIn={loggedIn} />
    </>
  );
};

export default MobileNavbar;
