import Newpage from '../newpage'
import { useCurrentUser } from '../../Components/Redux/Hooks'
import { useParams } from 'react-router-dom';

const Memorypage = () => {
    const { id } = useParams();
    const memo= useCurrentUser()?.memories.find(m => m.memoryId === Number(id));
  return (
    <div className='min-h-screen w-full flex justify-center'><Newpage readonly={true} memo={memo} /></div>
  )
}

export default Memorypage