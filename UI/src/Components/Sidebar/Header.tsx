import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Auth/Auth';
import SidebarMenu from './SidebarMenu'
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../Redux/Hooks';

type HeaderProps = {
  loggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ loggedIn }: HeaderProps) => {
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
    navigate('/authentication');
    loggedIn(false);
    console.log("Logged out");  
  };
  return (
    <>
    <div className='h-10 mb-3 w-full  font-extrabold  flex items-center justify-center  text-black'>
        <div className="flex items-center gap-3 w-full">
        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-lg font-semibold text-[#5e5346] shadow">
          {initials}
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-[#463b2d] leading-4">{name + " " + surname}</div>
          <div className="text-xs text-[#463b2d]/70 mt-0.5">{email}</div>
          <div className="text-xs text-[#5e5346]/60 mt-1">{memoryCount} anı</div>
        </div>
      </div>
        </div>
        <div className='mb-8  pb-2 border-b-[1px] border-[#5e5346]'> 
        <SidebarMenu route="yok">Hesap Ayarları</SidebarMenu>
        <SidebarMenu onClick={handleLogout} route="/authentication">Çıkış Yap</SidebarMenu>
        </div>
        
    </>
        
  )
}

export default Header