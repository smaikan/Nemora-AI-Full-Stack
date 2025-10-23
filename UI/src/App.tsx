import { Route, Routes } from "react-router-dom"
import Sidebar from "./Components/Sidebar"
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
console.log(1,user);
  return (
   <div className="bg-[#f6ede4] flex min-h-screen">
   {isLoggedIn && <Sidebar loggedIn={setIsLoggedIn} />}
    <Routes>
      {!isLoggedIn && <Route path="authentication" element={<Auth loggedIn={setIsLoggedIn} />} />}
        <Route element={<PrivateRoute isLogged={isLoggedIn} />}>
            <Route path="/" element={<Mainpage/>}/>
            <Route path="newpage" element={<Newpage />} />
            <Route path="memories" element={<Memories user = {user}/>} />
            <Route path="/memory/:id" element={<Memorypage />} />
        </Route>  
    </Routes>

    </div>
  )
}

export default App
