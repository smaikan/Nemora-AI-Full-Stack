import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Auth/Auth';
import SidebarMenu from './SidebarMenu'
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Redux/Hooks';

type HeaderProps = {
  loggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onNavigate?: () => void;
};

const Header = ({ loggedIn, onNavigate }: HeaderProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const name = user?.name || '';
  const surname = user?.surname || '';  
  const email = user?.email || '';
  const initials = name
    .split(' ')
    .map((s: string) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const memoryCount = user?.memories?.length ?? 0;

  const handleLogout = () => {
    dispatch(logout()); 
    loggedIn(false);
    navigate('/');
    localStorage.setItem("theme", "theme-yellow");
const themes = ["dark", "theme-blue", "theme-yellow"];
themes.forEach(t => document.documentElement.classList.remove(t));   
document.documentElement.classList.add("theme-yellow");
    onNavigate?.();
  };
  return (
    <>
    <div className='h-10 mb-3 w-full  font-extrabold  flex items-center justify-center  text-black dark:text-content-dark-primary'>
        <div className="flex items-center gap-3 w-full">
        <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-panel-dark/90 flex items-center justify-center text-lg font-semibold text-content-secondary dark:text-content-dark-secondary shadow">
          {initials}
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-content-primary dark:text-content-dark-primary leading-4">{name + " " + surname}</div>
          <div className="text-xs text-content-primary/70 dark:text-content-dark-primary/70 mt-0.5">{email}</div>
          <div className="text-xs text-content-secondary/60 dark:text-content-dark-secondary/60 mt-1">{memoryCount} anı</div>
        </div>
      </div>
        </div>
        <div className='mb-8  pb-2 border-b-[1px] border-edge-primary dark:border-edge-dark-primary'> 
        <SidebarMenu route="/settings" onClick={onNavigate}>Ayarlar</SidebarMenu>
        <SidebarMenu onClick={handleLogout} route="/welcome">Çıkış Yap</SidebarMenu>
        </div>
        
    </>
        
  )
}

export default Header