import { NavLink, Outlet } from "react-router-dom";
import { User, Palette } from "lucide-react";

const SettingsLayout = () => {
  return (
    <div className="px-6 py-8 max-w-6xl mx-auto min-h-screen w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-content-primary dark:text-content-dark-primary">Ayarlar</h1>
        <p className="text-sm text-content-secondary/80 dark:text-content-dark-secondary/80 mt-1">
          Hesap ve görünüm ayarlarınızı buradan yönetebilirsiniz.
        </p>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-6">
      

       
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

        
          <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            <NavLink
              to="/settings/user"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-panel-alt2 dark:bg-interactive-dark-selected text-content-primary dark:text-content-dark-primary shadow-sm"
                    : "text-content-secondary dark:text-content-dark-secondary hover:bg-panel-alt dark:hover:bg-panel-dark-alt"
                }`
              }
            >
              <User className="w-5 h-5" />
              <span>Hesap Bilgileri</span>
            </NavLink>

            <NavLink
              to="/settings/theme"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-panel-alt2 dark:bg-interactive-dark-selected text-content-primary dark:text-content-dark-primary shadow-sm"
                    : "text-content-secondary dark:text-content-dark-secondary hover:bg-panel-alt dark:hover:bg-panel-dark-alt"
                }`
              }
            >
              <Palette className="w-5 h-5" />
              <span>Tema</span>
            </NavLink>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default SettingsLayout;

