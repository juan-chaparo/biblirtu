import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MyUserState {
  email: String;
  id: number;
  userType: number;
  nameUser: String;
  isLoged: boolean;
}

const localState =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState: MyUserState = {
  email: "",
  id: 0,
  userType: 0,
  nameUser: "",
  isLoged: false,
};
const userSlice = createSlice({
  name: "userSlice",
  initialState: localState ? JSON.parse(localState) : initialState,
  reducers: {
    saveUser: (
      state,
      action: PayloadAction<{
        email: String;
        id: number;
        userType: number;
        nameUser: String;
      }>
    ) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.nameUser = action.payload.nameUser;
      state.userType = action.payload.userType;
      state.isLoged = true;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logoutUser: (state) => {
      localStorage.removeItem("user");
      state = initialState;
    },
  },
});

export const { saveUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
