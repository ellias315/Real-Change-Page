import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AuthStateProps {
  isAuthenticated: boolean;
  userData: any;
}

const initialState: AuthStateProps = {
  isAuthenticated: false,
  userData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

export const { setAuthState, setUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;