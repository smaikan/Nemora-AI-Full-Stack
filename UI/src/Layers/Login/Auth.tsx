import { useState } from 'react'
import Signup from './Signup';
import Login from './Login';
type AuthType = {
    loggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Auth = ({loggedIn}:AuthType) => {
    const [isCreate, setCreate] = useState(false);
  return (
    <div className='max-h-screen w-full flex justify-center items-center'> {isCreate ? <Signup setCreate={setCreate} loggedIn={loggedIn}/> : <Login setCreate={setCreate} loggedIn={loggedIn}/>} </div>
  )
}

export default Auth