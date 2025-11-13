import api from "../../Components/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserInfo } from "../../Components/Redux/Auth/Auth";
import { getUserInfo } from "../../Components/Redux/Auth/AuthService";
import { useDispatch } from "react-redux";

type LoginProps = {
    loggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    setCreate?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({loggedIn, setCreate}: LoginProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [newuser, setNewuser] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState<string | null>(null);
    
    const UsertoStore = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = await getUserInfo(); 
            if (user) {
                dispatch(setUserInfo(user)); 
            }
        }
    };

    const LoginHandler = async () => {
        try {
            const response = await api.post("user/login", {
                userEmail: newuser.email,
                userPassword: newuser.password
            });
            localStorage.setItem("token", response.data.token);
            setError(null);
            UsertoStore();
            loggedIn(true);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError("E-posta veya şifre hatalı."); 
        }
    };
    
    return (
        <div className='flex flex-col max-h-screen md:min-h-screen w-full justify-center items-center'>
             {error && (
                            <div className="w-[45rem] text-sm font-medium text-content-secondary dark:text-content-dark-secondary bg-red-300 dark:bg-red-800 px-3 py-2 text-center ">
                                {error}
                            </div>
                        )}
            <div className="bg-white mt-30 md:mt-0 p-8 rounded-lg flex flex-col md:flex-row justify-center items-center shadow-md h-[30rem] md:h-[25rem] w-[25rem] md:w-[45rem]">
                <div className="w-max pr-16 pl-10 flex flex-col pb-8 mb-8 border-b-2 md:border-b-0 md:border-r-2 border-edge-lighter dark:border-edge-dark-light">
                    <div className='text-3xl font-bold mb-12 text-center text-content-secondary dark:text-content-dark-secondary'>Giriş Yap</div>

                    

                    <form
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault(); 
                                LoginHandler();    
                            }
                        }}
                        className='flex justify-center items-center w-60 flex-col gap-4'
                    >
                        <input
                            onChange={(e)=>setNewuser(prev=>({...prev,email:e.target.value}))}
                            type="text"
                            placeholder='E-mail'
                            className='border placeholder-gray-400 border-gray-300 dark:border-edge-dark-light rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary'
                        />
                        <input
                            onChange={(e)=>setNewuser(prev=>({...prev,password:e.target.value}))}
                            type="password"
                            placeholder='Şifre'
                            className='border placeholder-gray-400 border-gray-300 dark:border-edge-dark-light rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary'
                        />

                        <div
                            onClick={()=>LoginHandler()}
                            className='bg-button-light dark:bg-button-dark-primary text-center text-content-secondary dark:text-content-dark-secondary cursor-pointer w-28 font-bold py-2 rounded-md hover:bg-button-hover dark:hover:bg-button-dark-hover transition duration-200'
                        >
                            Giriş Yap
                        </div>

                       
                    </form>
                </div>

                <div className='md:pl-10 flex flex-col items-center w-max'>
                    <div className='text-3xl font-bold mb-8 md:mb-12 text-center text-content-secondary dark:text-content-dark-secondary'>Hesabın yok mu?</div>
                    <div className='text-content-secondary hidden md:block  dark:text-content-dark-secondary mb-6'>
                        Hesabın yoksa endişelenme! Hemen kayıt ol ve anılarını güvenle saklamaya başla.
                    </div>
                    <div
                        onClick={()=>setCreate(true)}
                        className='bg-button-light dark:bg-button-dark-primary text-center text-content-secondary dark:text-content-dark-secondary cursor-pointer w-28 font-bold py-2 rounded-md hover:bg-button-hover dark:hover:bg-button-dark-hover transition duration-200'
                    >
                        Kayıt Ol
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
