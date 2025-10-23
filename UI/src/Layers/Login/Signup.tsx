import { useState } from "react";
import api from "../../Components/API";
import { setUserInfo } from "../../Components/Redux/Auth/Auth";
import { getUserInfo } from "../../Components/Redux/Auth/AuthService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

type Props = {
    loggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
    setCreate?: React.Dispatch<React.SetStateAction<boolean>>;
}
type NewUser = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repassword: string;
};


const Signup = ({loggedIn, setCreate}:Props) => {
    const [error , setError] = useState<string | null>(null);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
const[newuser,setNewuser]=useState<NewUser>({
    name:"",
    surname:"",
    email:"",
    password:"",
    repassword:""
})



const UsertoStore = async () => {
        const token = localStorage.getItem("token");
          if (token) {
            
              const user = await getUserInfo(); 
              if (user) {
                dispatch(setUserInfo(user)); 
              } 
          }
    }
    const LoginHandler = async () => {
        try {
           const response = await api.post("user/login",
            {
                userEmail: newuser.email,
                userPassword: newuser.password
            }
           )
           localStorage.setItem("token", response.data.token);
           UsertoStore();
            loggedIn(true);
            navigate("/");
            
        } catch (error) {
            console.error(error);
        }
        
    }
    
    const SignupHandler = async () => {
        if(newuser.password !== newuser.repassword){
            setError("Şifreler uyuşmuyor");
            return;
        }
        try {
    const response = await api.post("/user", {
  userName: newuser.name,
  userSurname: newuser.surname,
  userEmail: newuser.email,
  userPassword: newuser.password,});
  
  LoginHandler();
    console.log("Sunucudan dönen:", response.data);
  } catch (error) {
    console.error("İstek hatası:", error);
  }
    }

  return (
   <div className='flex min-h-screen w-full justify-center items-center '>
        <div className="bg-white p-8 rounded-lg flex items-center shadow-md  w-[45rem]">
            <div className="w-max pr-16 pl-10 flex flex-col border-r-2 border-[#e2cfba]">
            <div className='text-3xl font-bold mb-12 text-center text-[#5e5346]'>Üye Ol</div>
            <form onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      SignupHandler();    
    }
  }} className='flex justify-center items-center w-60 flex-col gap-4'>
                <input onChange={(e)=>setNewuser(prev=>({...prev,name:e.target.value}))} type="text" placeholder='Ad' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e2b680]'/>
                <input onChange={(e)=>setNewuser(prev=>({...prev,surname:e.target.value}))} type="text" placeholder='Soyad' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e2b680]'/>
                <input onChange={(e)=>setNewuser(prev=>({...prev,email:e.target.value}))} type="email" placeholder='E-mail' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e2b680]'/>
                <input onChange={(e)=>setNewuser(prev=>({...prev,password:e.target.value}))} type="password" placeholder='Şifre' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e2b680]'/>
                <input onChange={(e)=>setNewuser(prev=>({...prev,repassword:e.target.value}))} type="password" placeholder='Şifre Tekrarı' className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e2b680]'/>
                <div onClick={()=>SignupHandler()} className='bg-[#ffd7aa] text-center text-[#5e5346] cursor-pointer w-28 font-bold py-2 rounded-md hover:bg-[#e2b680] transition duration-200'>Üye Ol</div>
                </form>
            </div>

            <div className='pl-10 flex flex-col items-center w-max'>
                <div className='text-3xl font-bold mb-12 text-center text-[#5e5346]'>Zaten bir hesabın var mı?</div>
               
                <div onClick={()=>setCreate(false)} className='bg-[#ffd7aa] text-center text-[#5e5346] cursor-pointer w-28 font-bold py-2 rounded-md hover:bg-[#e2b680] transition duration-200'>Giriş Yap</div>
            </div>
        </div>
    </div>
  )
}

export default Signup