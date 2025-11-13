import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import api from '../../Components/API';
import { useCurrentUser } from '../../Components/Redux/Hooks';
import { useDispatch } from 'react-redux';
import { UpdateMemories } from '../../Components/Redux/Auth/Auth';

type prop = {
  memo?: {
    memoryId: number;
    memoryText: string;
    memoryCreateDate: string;
    memoryUpdateDate: string;
    memoryMood: number | null;  
    memorySummary: string | null;
    userId: number;
    isFavorite: boolean;
  },
  readonly?: boolean | null;
}

const Newpage: React.FC<prop> = ({ memo, readonly }) => {
  const [text, setText] = useState<string>(memo?.memoryText || localStorage.getItem("draft") || "");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleString("tr-TR").split('T')[0]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const location = useLocation();
  const [readonlyState, setReadonlyState] = useState<boolean>(readonly || false);
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);

  const [last8Days, setLast8Days] = useState<string[]>([]);
  useEffect(() => {
  const today = new Date();
  const days: string[] = [];

  for (let i = 0; i <= 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const trDate = d.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Europe/Istanbul",
    });

    const [day, month, year] = trDate.split(".");
    days.push(`${year}-${month}-${day}`);
  }

  setLast8Days(days);
}, []);

useEffect(() => {
  if (memo) {
    setText(memo.memoryText)};
}, [memo]);

 const availableDays = useMemo(() => {
  if (!last8Days || last8Days.length === 0) return null;

  return last8Days.filter(d =>
    !user?.memories?.some(m => m.memoryCreateDate?.startsWith(d))
  );
}, [last8Days, user]);

 
 
   useEffect(() => {

     if (availableDays == null) return;
     if (availableDays.length > 0) 
       setSelectedDate(availableDays[0]);
     
//   if (
//     location.pathname === "/newpage" &&
//     availableDays.length === 0 &&
//     user?.memories?.length
//   ) {
// //     const lastday = user?.memories?.reduce((latest, current) => {
// //   if (!latest) return current;
// //   return new Date(current.memoryCreateDate) > new Date(latest.memoryCreateDate)
// //     ? current
// //     : latest;
// // }, null);

//     // if (lastday) {
//     //   navigate(`/memory/${lastday.memoryId}`);
//     // }
//   }
}, [location.pathname, availableDays]);


  const handleSave = async () => {
    if (readonlyState) return;
    if (text === "") return;
    if (!user?.id) {
      console.error("Kullanıcı bulunamadı.");
      return;
    }
setLoading(true);
    try {
      const response = await api.post("/Memory", {
        memoryText: text,
        userId: user.id,
        memoryCreateDate: selectedDate
      });

      if (response.status === 201) {
        dispatch(UpdateMemories({
          memoryId: response.data.newMemoryId,
          memoryText: text,
          memoryCreateDate: selectedDate,
          memoryUpdateDate: null,
          userId: user.id,
          memoryMood: memo?.memoryMood ?? response.data.memoryMood ?? null,
          memorySummary: memo?.memorySummary ?? response.data.memorySummary ??  null,
          isFavorite: memo?.isFavorite
        }));
        setReadonlyState(true);
        localStorage.removeItem("draft");
        setLoading(false)
        navigate(`/memory/${response.data.newMemoryId}`)
      }
    } catch (error) {
      console.error("Error saving memory:", error);
    }
  };

  const handleUpdate = async () => {  
    if (!memo) return;
    try {
      const response = await api.put(`/Memory/${memo.memoryId}`, {
        memoryText: text,
        userId: memo.userId,
        memoryCreateDate: memo.memoryCreateDate
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(UpdateMemories({
          userId: memo.userId,
          memoryId: memo.memoryId,
          memoryText: text,
          memoryCreateDate: memo.memoryCreateDate,
          memoryUpdateDate: new Date().toLocaleString("tr-TR").split('T')[0],
          memoryMood: memo.memoryMood, 
          memorySummary: memo.memorySummary,
          isFavorite:memo.isFavorite 
        }));
        setReadonlyState(true);
      }
    } catch (error) {
      console.error("Error updating memory:", error);
    }
  };
  useEffect(() => {
    if (location.pathname === "/newpage") {
      localStorage.setItem("draft", text);
    }
    const el = textareaRef.current;
    if (el) {
      const prevScrollTop = window.scrollY;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
      const isFocused = document.activeElement === el;
      const isAtEnd = isFocused && el.selectionStart === el.value.length;
      if (isAtEnd) {
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        window.scrollTo(0, prevScrollTop);
      }
    }
  }, [text, location.pathname]);
console.log(selectedDate);





if ( user == null) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-3 text-gray-700">
            <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <span>Yükleniyor...</span>
          </div>
        </div>
      );
    }

if (location.pathname === "/newpage" &&  user !== null && availableDays?.length == 0) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="flex items-center space-x-3 text-gray-700">
           
            <span className='text-3xl' > <span className='text-red-700 mr-8'>X</span> Son bir haftanın bütün sayfaları dolu. </span>
          </div>
        </div>
      );
    }


  return (
    <div className='flex min-h-screen w-full justify-center'>
      <div className='w-[45rem] bg-[#f6ede4] relative flex max-h-full pt-14 px-5 my-2 border-[3px] border-[#f8c994] dark:border-primary-dark shadow-2xl rounded'>

        <div className='absolute top-1 right-3 text-gray-700/70 dark:text-content-dark-secondary/70 flex flex-col items-end gap-[2px]'>
          {location.pathname !== "/newpage" 
          ? <div className=" text-gray-400 dark:text-content-dark-muted mb-1">{new Date(memo.memoryCreateDate).toLocaleDateString("tr-TR")}</div> 
          : <select
            value={selectedDate}
            onChange={(e) =>{setReadonlyState(false); setText(""); setSelectedDate(e.target.value)}}
            className="border border-primary dark:border-primary-dark rounded px-2 py-[2px] text-gray-700 dark:text-content-dark-primary bg-panel dark:bg-panel-dark cursor-pointer hover:bg-panel-hover dark:hover:bg-panel-dark-alt"
          >
            {availableDays?.map((d) => (
              <option key={d} value={d}>
                {d === new Date().toLocaleDateString("tr-TR")
                  ? `Bugün(${new Date(d).toLocaleDateString("tr-TR")})`
                  : new Date(d).toLocaleDateString("tr-TR")}
              </option>
            ))}
          </select> }
        </div>

        <textarea
          readOnly={readonlyState}
          ref={textareaRef}
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="w-full font-hand font-extralight caret-caret text-xl min-h-full text-content-primary dark:text-content-dark-primary bg-transparent outline-none resize-none p-4 overflow-y-auto"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 36px, rgb(248, 201, 148) 37px)",
            backgroundPositionY: "8px",
            lineHeight: "37px",
            letterSpacing: "0.5px",
          }}
        />

        {readonly !== undefined
          ? (
            <button
              onClick={() => {
                if (readonlyState) {
                  setReadonlyState(false);
                  setTimeout(() => textareaRef.current?.focus(), 0);
                } else {
                  void handleUpdate();
                  setText("");
                }
              }}
              className={`group absolute left-3 top-2 
                                h-10 px-6 min-w-20 rounded-lg font-semibold select-none 
                                shadow-md hover:shadow-none
                                flex justify-center items-center gap-2 text-content-tertiary dark:text-content-dark-primary
                                ${readonlyState ? "bg-button-disabled dark:bg-button-dark-active" : "bg-button-active dark:bg-button-dark-primary"}`}
            >
              {readonlyState ? "Günlük Sayfasını Düzenle" : "Değişiklikleri Kaydet"}
            </button>
          )
          : (
            <button
  disabled={readonlyState}
  onClick={() => handleSave()}
  className={`h-9 w-18 absolute ${loading && "w-32 transition-none duration-initial "} left-3 top-2 border-2 flex justify-center items-center text-sm select-none font-semibold rounded-md transition-all duration-200
    ${readonlyState
      ? "cursor-not-allowed w-20 border-gray-400 dark:border-edge-dark-light bg-gray-300 dark:bg-panel-dark-alt text-gray-500 dark:text-content-dark-muted opacity-70 shadow-none"
      : "cursor-pointer border-[#f8c994] dark:border-primary bg-[#f5e3cc] dark:bg-panel-dark-alt text-content-primary dark:text-content-dark-primary hover:shadow-md active:scale-[0.97]"
    }`}
>
  {loading? "Kaydediliyor...": readonlyState ? "Kaydedildi" : "Kaydet"}
</button>

          )
        }

      </div>
    </div>
  )
}

export default Newpage;
