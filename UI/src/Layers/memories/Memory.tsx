
import { Link } from "react-router-dom";
import api from "../../Components/API";
import { useDispatch } from "react-redux";
import { UpdateFavorite } from "../../Components/Redux/Auth/Auth";

type MemoryItem = {
  id: number;
  date: string;
  excerpt?: string;
  mood?: number;
  isFavorite: boolean;
};

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
    : "Tarih yok";

const MemoryList: React.FC<MemoryItem> = ({ id, date, excerpt, mood, isFavorite }) => {
  const dispatch = useDispatch();

  const favoriteUpdate = async () => {
    try {
      const response = await api.put(`/Memory/favorite/${id}`)
      if (response.status >= 200 && response.status < 300) {
        dispatch(UpdateFavorite({
          memoryId: id,
          isFavorite: !isFavorite
        }));

      }
    } catch (error) {
      console.error("Error updating memory:", error);
    }
  };


  return (
    <div className="w-auto">
      <Link to={`/memory/${id}`} className="  mb-4 group">
        <div
          className={`relative bg-panel sm:w-52 md:w-60 dark:bg-panel-dark rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 border border-edge-tertiary dark:border-edge-dark-secondary overflow-hidden h-full ${isFavorite ? "ring-2 ring-ring" : ""
            }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              favoriteUpdate();
            }}
            title={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
            aria-pressed={isFavorite}
            className="absolute left-3 top-3 z-10 p-1 rounded-full bg-white/80 dark:bg-panel-dark-alt/80 hover:scale-105 transition-transform shadow"
          >
            {isFavorite ? (
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 21s-7.333-4.667-10-8.167C-0.667 7.667 4 3 7.333 5.333 9.333 6.999 12 9 12 9s2.667-2.001 4.667-3.667C20 3 24.667 7.667 22 12.833 19.333 16.333 12 21 12 21z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            )}
          </button>

          <div className="p-3 md:p-4 flex flex-col h-full">
            <div className="flex items-start ml-auto justify-between">
              <div className="text-xs text-content-secondary dark:text-content-dark-secondary">Mood: <span className="font-medium text-content-primary dark:text-content-dark-primary">{mood ? `${mood}/10` : "Analiz ediliyor..."}</span></div>
            </div>

            <div className="mt-3 flex-1">
              <h3 className="text-xs md:text-sm font-semibold text-content-primary dark:text-content-dark-primary leading-snug">
                {formatDate(date)}
              </h3>

              <p className="mt-2 text-xs md:text-sm flex text-content-secondary dark:text-content-dark-secondary h-10 overflow-hidden">
                <span className=" my-auto">{excerpt ?? "Son eklenen günlük sayfası."}</span>
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-content-secondary/80 dark:text-content-dark-secondary/80">Detayları Gör</span>
              <svg
                className="w-4 h-4 text-content-muted dark:text-content-dark-muted transition-colors group-hover:text-content-secondary dark:group-hover:text-content-dark-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MemoryList;