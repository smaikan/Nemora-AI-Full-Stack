import { FC } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, PenLine } from "lucide-react";

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gradient-landing-start to-gradient-landing-end dark:from-background-dark dark:to-surface-dark text-gray-800 dark:text-content-dark-primary overflow-hidden">
      {/* Logo ve Başlık */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="p-3 bg-blue-100 rounded-2xl shadow-sm">
          <PenLine className="text-blue-600 w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Nemora Diary
        </h1>
      </motion.div>

      {/* Açıklama Metni */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-lg text-gray-600 max-w-lg text-center mb-12 leading-relaxed"
      >
        Günlüklerini yaz, düşüncelerini analiz ettir.  
        <span className="text-blue-600 font-medium">Nemora AI</span> senin için
        ruh halini çözümler ve her anını anlamlı hale getirir.
      </motion.p>

      {/* Arka plan efekti / görsel */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative w-64 h-64 mb-12"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200 via-indigo-200 to-purple-200 rounded-full blur-3xl opacity-60 animate-pulse" />
        <Sparkles className="absolute inset-0 m-auto text-blue-500 w-20 h-20 opacity-80" />
      </motion.div>

      {/* Kullanmaya Başla Butonu */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/authentication")}
        className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-semibold shadow-lg transition-all duration-200"
      >
        Kullanmaya Başla
      </motion.button>

      {/* Alt Bilgi */}
      <footer className="mt-12 text-sm text-gray-400 select-none">
        © {new Date().getFullYear()} Nemora AI — Tüm hakları saklıdır.
      </footer>
    </div>
  );
};

export default LandingPage;
