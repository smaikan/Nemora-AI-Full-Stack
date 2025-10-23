import Header from './Header'
import SidebarMenu from './SidebarMenu'
import { useNavigate, useLocation } from 'react-router-dom'

type SidebarProps = {
  loggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ loggedIn }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewpageActive = location.pathname === '/newpage';

  return (
    <aside className="sticky top-0 left-0 h-screen min-w-64 bg-gradient-to-b from-[#f8c994] to-[#f5e1b8] border-r-2 border-[#5e5346] p-4 flex flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div
          
          onClick={() => navigate('/newpage')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { navigate('/newpage'); } }}
          aria-label="Yeni sayfa"
          aria-pressed={isNewpageActive}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#5e5346] ${
            isNewpageActive
              ? 'bg-white/70 border border-[#5e5346]/20 shadow-none' // aktifken borderlar belirsin
              : 'bg-white/90 shadow hover:scale-105 hover:shadow-lg'
          }`}
        >
          <svg className="w-6 h-6 text-[#5e5346]" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </div>

        <div>
          <div className="text-lg font-semibold text-[#5e5346]">Nemora</div>
          <div className="text-xs text-[#5e5346]/80">Dijital Günlük</div>
        </div>
      </div>

      <div className="border-b border-[#5e5346]/30 mb-4" />

      <div className="mb-4">
        <Header loggedIn={loggedIn} />
      </div>

      <nav className="flex-1 overflow-auto">
        <ul className="space-y-1">
          <li>
            <SidebarMenu route="/">Ana Sayfa</SidebarMenu>
          </li>
          <li>
            <SidebarMenu route="/newpage">Yeni Sayfa</SidebarMenu>
          </li>
          <li>
            <SidebarMenu route="/memories">Anılarım</SidebarMenu>
          </li>
        </ul>
      </nav>

     
    </aside>
  )
}

export default Sidebar