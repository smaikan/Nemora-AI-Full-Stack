import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Memory {
    memoryId: number;
    userId: number;
    memoryText: string;
    memoryCreateDate: string;
    memoryUpdateDate: string;
    memoryMood: number | null;
    memorySummary: string | null;
    isFavorite: boolean;
}
interface setFavorite{
  memoryId: number;
  isFavorite: boolean;
}

interface postUser {
    userId: number; 
    userName: string;
    userSurname: string;
    userEmail: string;  
    userMemories: Memory[];
}

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    memories: Memory[];
}

interface AuthState {
  user: User | null;
};

const initialState:AuthState = {
  user: null,
};




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<postUser>) {
    state.user = {
    id: action.payload.userId,
    name: action.payload.userName,
    surname: action.payload.userSurname,
    email: action.payload.userEmail,
    memories: action.payload.userMemories,
  };
    },
    logout(state) {
            state.user = null;
            localStorage.removeItem("token");
    },
    UpdateMemories(state, action: PayloadAction<Memory>) {
      if (!state.user) return;
      const idx = state.user.memories.findIndex(m => m.memoryId === action.payload.memoryId);
      if (idx !== -1) {
        state.user.memories[idx] = action.payload;
      } else {
        state.user.memories.push(action.payload);
      }
    },
    UpdateFavorite(state, action: PayloadAction<setFavorite>) {
      if (!state.user) return;
      const idx = state.user.memories.findIndex(
        (m) => m.memoryId === action.payload.memoryId
      );
      if (idx !== -1) {
        state.user.memories[idx] = {
          ...state.user.memories[idx], 
          isFavorite: action.payload.isFavorite, 
        };
      } else {
        console.log("memory bulunamadı.")
      }
    },
  },
});     


export default authSlice.reducer;
export const {UpdateMemories,logout, setUserInfo, UpdateFavorite} = authSlice.actions;