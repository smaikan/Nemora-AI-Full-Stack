import * as React from "react";
import Header from "../Sidebar/Header";
import SidebarMenu from "../Sidebar/SidebarMenu";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  loggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileDrawer = ({ open, onClose, loggedIn }: Props) => {
  return (
    <div className={`${open ? "fixed" : "hidden"} inset-0 z-50`}>
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        role="button"
        aria-label="Kapat"
      />
      <aside
        className={`absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-gradient-start to-gradient-end dark:from-primary-dark dark:to-primary-light border-r-2 border-edge-primary dark:border-edge-dark-primary p-4 flex flex-col translate-x-0 transition-transform duration-200`}
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="text-lg font-semibold text-content-secondary dark:text-content-dark-secondary">
            Nemora
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-white/80 dark:bg-panel-dark/80"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="border-b border-edge-primary/30 dark:border-edge-dark-primary/30 mb-3" />
        <div className="mb-3">
          <Header loggedIn={loggedIn} onNavigate={onClose} />
        </div>
        <nav className="flex-1 overflow-auto">
          <ul className="space-y-1">
            <li>
              <SidebarMenu route="/" onClick={onClose}>Ana Sayfa</SidebarMenu>
            </li>
            <li>
              <SidebarMenu route="/newpage" onClick={onClose}>Yeni Sayfa</SidebarMenu>
            </li>
            <li>
              <SidebarMenu route="/memories" onClick={onClose}>Anılarım</SidebarMenu>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default MobileDrawer;
