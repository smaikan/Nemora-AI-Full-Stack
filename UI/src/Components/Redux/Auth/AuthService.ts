import api from "../../API";




export const getUserInfo = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await api.get(`/user/loggeduser`);
    return response.data;
  } catch (error) {
    console.error("Kullanıcı bilgisi alınamadı:", error);
    return null;
  }
};
