import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUser } from "../../Components/Redux/Hooks";
import { User, Mail, Lock, Save, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import api from "../../Components/API";
import { setUserInfo } from "../../Components/Redux/Auth/Auth";

const UserSettings = () => {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setPasswordError("");
    setPasswordSuccess("");
    if(formData.name === "" || formData.surname === "" || formData.email === "")
    {
      setError("Lütfen tüm alanları doldurun");
      return;
    }
    if(showPasswordSection)
    {
      if( formData.currentPassword === "" || formData.newPassword === "" || formData.confirmPassword === "")
      {
        setPasswordError("Lütfen tüm alanları doldurun");
        return;
      }
      if(formData.newPassword !== formData.confirmPassword)
      {
        setPasswordError("Yeni şifre ve onay şifresi uyuşmuyor");
        return;
      }
    }
    try{
      const payload: any = {
        UserName: formData.name,
        UserSurname: formData.surname,
        UserEmail: formData.email,
        UserPassword: null,
      };
      if (showPasswordSection) {
        payload.UserPassword = formData.newPassword;
      }
      await api.put("/user/updateuser", payload);
      if (user) {
        dispatch(
          setUserInfo({
            userId: user.id,
            userName: formData.name,
            userSurname: formData.surname,
            userEmail: user.email, 
            userMemories: user.memories,
          })
        );
      }
      setSuccess("Başarıyla güncellendi");
      if (showPasswordSection) {
        setPasswordSuccess("Şifre başarıyla güncellendi");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      }
    } catch (e) {
      setError("Bir hata oluştu: " + (e as any)?.message);
    }
  };


  return (
    <div className="space-y-6">
      <div className="bg-panel dark:bg-panel-dark rounded-xl p-6 shadow-sm border border-edge-tertiary dark:border-edge-dark-secondary">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 dark:bg-primary-dark/20 rounded-lg">
            <User className="w-5 h-5 text-primary dark:text-primary-light" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-content-primary dark:text-content-dark-primary">
              Hesap Bilgileri
            </h2>
            <p className="text-sm text-content-secondary/70 dark:text-content-dark-secondary/70">
              Kişisel bilgilerinizi güncelleyin
            </p>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2"
          >
            <AlertCircle className="w-4 h-4 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        {success && (
          <div
            role="status"
            className="mb-4 flex items-start gap-2 rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2"
          >
            <CheckCircle2 className="w-4 h-4 mt-0.5" />
            <span className="text-sm">{success}</span>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-content-primary dark:text-content-dark-primary mb-2"
              >
                Ad
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-edge-tertiary dark:border-edge-dark-secondary rounded-lg bg-white dark:bg-panel-dark-alt text-content-primary dark:text-content-dark-primary focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary transition-colors"
                placeholder="Adınız"
              />
            </div>

            <div>
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-content-primary dark:text-content-dark-primary mb-2"
              >
                Soyad
              </label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-edge-tertiary dark:border-edge-dark-secondary rounded-lg bg-white dark:bg-panel-dark-alt text-content-primary dark:text-content-dark-primary focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary transition-colors"
                placeholder="Soyadınız"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-content-primary dark:text-content-dark-primary mb-2"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                E-posta Adresi
              </div>
            </label>
            <input
            readOnly
            disabled
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border bg-gray-200 border-edge-tertiary dark:border-edge-dark-secondary rounded-lg  dark:bg-panel-dark-alt text-gray-400 dark:text-content-dark-primary focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary transition-colors"
              placeholder="ornek@email.com"
            />
            <p className="mt-1.5 text-xs text-content-secondary/60 dark:text-content-dark-secondary/60">
              E-posta adresiniz giriş yapmak için kullanılır
            </p>
          </div>

          <div className="pt-4 border-t border-edge-tertiary dark:border-edge-dark-secondary">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-button-primary dark:bg-button-dark-primary hover:bg-button-hover dark:hover:bg-button-dark-hover text-content-secondary dark:text-content-dark-secondary font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              <Save className="w-4 h-4" />
              Değişiklikleri Kaydet
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-panel-dark rounded-xl p-6 shadow-sm border border-edge-tertiary dark:border-edge-dark-secondary">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 dark:bg-primary-dark/20 rounded-lg">
              <Lock className="w-5 h-5 text-primary dark:text-primary-light" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-content-primary dark:text-content-dark-primary">
                Şifre Değiştir
              </h2>
              <p className="text-sm text-content-secondary/70 dark:text-content-dark-secondary/70">
                Hesabınızın güvenliği için düzenli olarak şifrenizi güncelleyin
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordSection(!showPasswordSection)}
            className="px-4 py-2 text-sm font-medium text-content-secondary dark:text-content-dark-secondary hover:bg-panel-alt dark:hover:bg-panel-dark-alt rounded-lg transition-colors"
          >
            {showPasswordSection ? "Gizle" : "Göster"}
          </button>
        </div>

        {showPasswordSection && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {passwordError && (
              <div
                role="alert"
                className="-mt-1 mb-1 flex items-start gap-2 rounded-lg border border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-2"
              >
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span className="text-sm">{passwordError}</span>
              </div>
            )}
            {passwordSuccess && (
              <div
                role="status"
                className="-mt-1 mb-1 flex items-start gap-2 rounded-lg border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5" />
                <span className="text-sm">{passwordSuccess}</span>
              </div>
            )}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-content-primary dark:text-content-dark-primary mb-2"
              >
                Mevcut Şifre
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 pr-10 border border-edge-tertiary dark:border-edge-dark-secondary rounded-lg bg-white dark:bg-panel-dark-alt text-content-primary dark:text-content-dark-primary focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary transition-colors"
                  placeholder="Mevcut şifrenizi girin"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary/60 dark:text-content-dark-secondary/60 hover:text-content-secondary dark:hover:text-content-dark-secondary"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-content-primary dark:text-content-dark-primary mb-2"
                >
                  Yeni Şifre
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 pr-10 border border-edge-tertiary dark:border-edge-dark-secondary rounded-lg bg-white dark:bg-panel-dark-alt text-content-primary dark:text-content-dark-primary focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary transition-colors"
                    placeholder="Yeni şifrenizi girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary/60 dark:text-content-dark-secondary/60 hover:text-content-secondary dark:hover:text-content-dark-secondary"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-content-primary dark:text-content-dark-primary mb-2"
                >
                  Yeni Şifre (Tekrar)
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 pr-10 border border-edge-tertiary dark:border-edge-dark-secondary rounded-lg bg-white dark:bg-panel-dark-alt text-content-primary dark:text-content-dark-primary focus:outline-none focus:ring-2 focus:ring-focus-ring dark:focus:ring-primary transition-colors"
                    placeholder="Yeni şifrenizi tekrar girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-content-secondary/60 dark:text-content-dark-secondary/60 hover:text-content-secondary dark:hover:text-content-dark-secondary"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-edge-tertiary dark:border-edge-dark-secondary">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-button-primary dark:bg-button-dark-primary hover:bg-button-hover dark:hover:bg-button-dark-hover text-content-secondary dark:text-content-dark-secondary font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                <Lock className="w-4 h-4" />
                Şifreyi Güncelle
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSettings;

