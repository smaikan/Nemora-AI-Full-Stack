import { Route, Routes, Navigate } from "react-router-dom"
import DesktopNavbar from "./Components/Navbar/DesktopNavbar"
import MobileNavbar from "./Components/Navbar/MobileNavbar"
import Newpage from "./Layers/newpage"
import { useEffect, useState } from "react";
import Auth from "./Layers/Login/Auth";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./Components/Redux/Auth/AuthService";
import { setUserInfo } from "./Components/Redux/Auth/Auth";
import { useCurrentUser } from "./Components/Redux/Hooks";
import PrivateRoute from "./Components/Privateroute";
import Memories from "./Layers/memories";
import Memorypage from "./Layers/memories/Memorypage";
import Mainpage from "./Layers/mainpage";
import LandingPage from "./Layers/Login/LandingPage";
import SettingsLayout from "./Layers/Settings/SettingsLayout";
import UserSettings from "./Layers/Settings/UserSettings";
import ThemeSettings from "./Layers/Settings/ThemeSettings";
function App() {
  const token = localStorage.getItem("token");  
   const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false); 
   const dispatch = useDispatch();
   const user = useCurrentUser();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const fetchUser = async () => {
      const user = await getUserInfo(); 
      if (user) {
        dispatch(setUserInfo(user)); 
      }
    };

    fetchUser();
  }
}, [dispatch]);


useEffect(() => {
  // localStorage'da tema yoksa varsayılanı 'theme-yellow' yap
  const savedTheme = localStorage.getItem("theme");
  const themeToApply = savedTheme || "theme-yellow";

  document.documentElement.classList.remove("theme-yellow", "theme-blue", "dark");
  document.documentElement.classList.add(themeToApply);

  // Eğer ilk defa açılıyorsa kaydet
  if (!savedTheme) {
    localStorage.setItem("theme", "theme-yellow");
  }
}, []);

  return (
   <div className="bg-base dark:bg-black flex min-h-screen">
   {isLoggedIn && (
     <>
       <div className="hidden md:block md:flex-none">
         <DesktopNavbar loggedIn={setIsLoggedIn} />
       </div>
       <div className="block md:hidden fixed top-0 left-0 right-0 z-40">
         <MobileNavbar loggedIn={setIsLoggedIn} />
       </div>
     </>
   )}

    <div className="flex-1 min-w-0 pt-14 md:pt-0 text-sm md:text-base leading-relaxed md:leading-normal">
      <Routes>
      
      {!isLoggedIn && <Route path="authentication" element={<Auth loggedIn={setIsLoggedIn} />} /> }
      {!isLoggedIn && <Route path="/welcome" element={<LandingPage/>}/>}
        <Route element={<PrivateRoute isLogged={isLoggedIn} />}>
            <Route path="/" element={<Mainpage/>}/>
            <Route path="newpage" element={<Newpage />} />
            <Route path="memories" element={<Memories user = {user}/>} />
            <Route path="/memory/:id" element={<Memorypage />} />
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="/settings/user" replace />} />
              <Route path="user" element={<UserSettings />} />
              <Route path="theme" element={<ThemeSettings />} />
            </Route>
        </Route>  
      </Routes>
    </div>

    </div>
  )
}

export default App
