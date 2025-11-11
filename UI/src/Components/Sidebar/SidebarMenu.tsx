import { FilePlus, House, LogOut, NotebookTabs, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  route?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const SidebarMenu: React.FC<SidebarItemProps> = ({ onClick, route, children }) => {
  return (
    <NavLink
      to={route}
      onClick={onClick}
      className={({ isActive }) =>
        `relative flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-colors duration-150
         ${isActive ? "bg-base dark:bg-panel-dark text-content-secondary dark:text-content-dark-secondary shadow-inner" : "text-content-secondary/90 dark:text-content-dark-secondary/90 hover:bg-panel-alt2 dark:hover:bg-panel-dark-alt" }`
      }
      aria-current="page"
    >
      {({ isActive }: { isActive: boolean }) =>
        <>
          {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-edge-primary dark:bg-edge-dark-primary rounded-r-md" />}
          <span className="flex items-center gap-3 w-full pl-1">
        
         {route == "/newpage" 
          ? (<FilePlus className={`w-4 h-4 ${isActive ? "text-content-secondary dark:text-content-dark-secondary" : "text-icon-inactive dark:text-content-dark-muted"}`} />) 
          : route == "/" ? (<House className={`w-4 h-4 ${isActive ? "text-content-secondary dark:text-content-dark-secondary" : "text-icon-inactive dark:text-content-dark-muted"}`} />) 
          : route == "/memories" ? (<NotebookTabs className={`w-4 h-4 ${isActive ? "text-content-secondary dark:text-content-dark-secondary" : "text-icon-inactive dark:text-content-dark-muted"}`} />)
          : route == "/authentication" ? (<LogOut className={`w-4 h-4 ${isActive ? "text-content-secondary dark:text-content-dark-secondary" : "text-icon-inactive dark:text-content-dark-muted"}`} />) 
          : (<Settings className={`w-4 h-4 ${isActive ? "text-content-secondary dark:text-content-dark-secondary" : "text-icon-inactive dark:text-content-dark-muted"}`} />)
         }   
            <span className="truncate">{children}</span>
            
          </span>
        </>
      }
    </NavLink>
  );
};

export default SidebarMenu;