import { PenLine } from 'lucide-react';
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
    <aside className="sticky top-0 left-0 h-screen min-w-64 bg-gradient-to-b from-gradient-start to-gradient-end dark:from-primary-dark dark:to-primary-light border-r-2 border-edge-primary dark:border-edge-dark-primary p-4 flex flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div
          
          onClick={() => navigate('/newpage')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { navigate('/newpage'); } }}
          aria-label="Yeni sayfa"
          aria-pressed={isNewpageActive}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-focus-ring dark:focus:ring-primary ${
            isNewpageActive
              ? 'bg-white/70 dark:bg-panel-dark/70 border border-edge-primary/20 dark:border-edge-dark-primary/20 shadow-none' 
              : 'bg-white/90 dark:bg-panel-dark/90 shadow hover:scale-105 hover:shadow-lg'
          }`}
        >
          <PenLine className="text-blue-600 dark:text-blue-400 w-6 h-6 " />
        </div>

        <div>
          <div className="text-lg font-semibold text-content-secondary dark:text-content-dark-secondary">Nemora</div>
          <div className="text-xs text-content-secondary/80 dark:text-content-dark-secondary/80">Dijital Günlük</div>
        </div>
      </div>

      <div className="border-b border-edge-primary/30 dark:border-edge-dark-primary/30 mb-4" />

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