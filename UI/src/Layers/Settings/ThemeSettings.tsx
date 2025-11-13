import { useState, useEffect } from "react";
import { Moon, Sun, Palette, Laptop } from "lucide-react";

type Theme = "theme-yellow" | "theme-blue" | "dark";

const ThemeSettings = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("theme-yellow");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("theme-yellow", theme === "theme-yellow");
    document.documentElement.classList.toggle("theme-blue", theme === "theme-blue");
    localStorage.setItem("theme", theme);
  };

  const themes = [
    {
      id: "theme-yellow" as Theme,
      name: "Sarı Tema",
      description: "Varsayılan açık renk teması",
      icon: Sun,
      preview: "bg-[#f6ede4] from-base to-panel-alt",
    },
    {
      id: "theme-blue" as Theme,
      name: "Mavi Tema",
      description: "Modern mavi renk teması",
      icon: Laptop,
      preview: "bg-[#edf3fb] from-base to-panel-alt",
    },
    {
      id: "dark" as Theme,
      name: "Koyu Tema",
      description: "Göz yormayan koyu renk teması",
      icon: Moon,
      preview: "bg-gradient-to-br from-base-dark to-panel-dark",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-panel dark:bg-panel-dark rounded-xl p-6 shadow-sm border border-edge-tertiary dark:border-edge-dark-secondary">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 dark:bg-primary-dark/20 rounded-lg">
            <Palette className="w-5 h-5 text-primary dark:text-primary-light" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-content-primary dark:text-content-dark-primary">
              Tema Seçimi
            </h2>
            <p className="text-sm text-content-secondary/70 dark:text-content-dark-secondary/70">
              Uygulamanın görünümünü tercihinize göre özelleştirin
            </p>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-primary dark:border-primary-light shadow-lg scale-[1.02]"
                    : "border-edge-tertiary dark:border-edge-dark-secondary hover:border-edge-primary dark:hover:border-edge-dark-primary"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary dark:bg-primary-light rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
                <div
                  className={`w-full h-24 rounded-lg mb-4 ${theme.preview} border border-edge-tertiary dark:border-edge-dark-secondary`}
                />
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-primary/20 dark:bg-primary-dark/30"
                        : "bg-panel-alt dark:bg-panel-dark-alt"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isSelected
                          ? "text-primary dark:text-primary-light"
                          : "text-content-secondary dark:text-content-dark-secondary"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        isSelected
                          ? "text-content-primary dark:text-content-dark-primary"
                          : "text-content-secondary dark:text-content-dark-secondary"
                      }`}
                    >
                      {theme.name}
                    </h3>
                    <p className="text-xs text-content-secondary/70 dark:text-content-dark-secondary/70">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-panel-alt dark:bg-panel-dark-alt rounded-lg border border-edge-tertiary dark:border-edge-dark-secondary">
          <p className="text-sm text-content-secondary dark:text-content-dark-secondary">
            <span className="font-medium">Aktif Tema:</span>{" "}
            {currentTheme === "dark" ? "Koyu Tema" : currentTheme === "theme-yellow" ? "Sarı Tema" : "Mavi Tema"}
          </p>
          <p className="text-xs text-content-secondary/70 dark:text-content-dark-secondary/70 mt-1">
            Tema tercihiniz tarayıcınızda saklanır ve bir sonraki ziyaretinizde otomatik olarak uygulanır.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
