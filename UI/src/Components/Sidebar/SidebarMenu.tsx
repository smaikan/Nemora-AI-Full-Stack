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
         ${isActive ? "bg-[#f6ede4] text-[#5e5346] shadow-inner" : "text-[#5e5346]/90 hover:bg-[#f6e3d0]" }`
      }
      aria-current="page"
    >
      {({ isActive }: { isActive: boolean }) =>
        <>
          {isActive && <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#5e5346] rounded-r-md" />}
          <span className="flex items-center gap-3 w-full pl-1">
        
         {route == "/newpage" 
          ? (<FilePlus className={`w-4 h-4 ${isActive ? "text-[#5e5346]" : "text-[#8a7a60]"}`} />) 
          : route == "/" ? (<House className={`w-4 h-4 ${isActive ? "text-[#5e5346]" : "text-[#8a7a60]"}`} />) 
          : route == "/memories" ? (<NotebookTabs className={`w-4 h-4 ${isActive ? "text-[#5e5346]" : "text-[#8a7a60]"}`} />)
          : route == "/authentication" ? (<LogOut className={`w-4 h-4 ${isActive ? "text-[#5e5346]" : "text-[#8a7a60]"}`} />) 
          : (<Settings className={`w-4 h-4 ${isActive ? "text-[#5e5346]" : "text-[#8a7a60]"}`} />)
         }   
            <span className="truncate">{children}</span>
            
          </span>
        </>
      }
    </NavLink>
  );
};

export default SidebarMenu;