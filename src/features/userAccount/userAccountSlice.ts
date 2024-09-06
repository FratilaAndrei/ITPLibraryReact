import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginInitialType,
  registerValuesType,
} from "../../components/Auth/AuthValidationSchema";

export type userStateModel = {
  registerArray: registerValuesType[];
  isAccountRegistered: boolean;
  isAccountLoggedIn: boolean;
};
const getInitialUserState = (): registerValuesType[] => {
  const REGISTER_STORAGE = localStorage.getItem("register-form");
  return REGISTER_STORAGE ? JSON.parse(REGISTER_STORAGE) : [];
};

const initialState: userStateModel = {
  registerArray: getInitialUserState(),
  isAccountRegistered: false,
  isAccountLoggedIn: false,
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    saveRegisterData: (state, action: PayloadAction<registerValuesType>) => {
      state.registerArray.push(action.payload);
      localStorage.setItem(
        "register-form",
        JSON.stringify(state.registerArray)
      );
    },
    checkIfUserExists: (state, action: PayloadAction<registerValuesType>) => {
      const existingAccount = state.registerArray.find(
        (user) => user.email === action.payload.email
      );
      if (!existingAccount) {
        state.registerArray.push(action.payload);
        state.isAccountRegistered = true;
        localStorage.setItem(
          "register-form",
          JSON.stringify(state.registerArray)
        );
      }
    },

    findAccount: (state, action: PayloadAction<loginInitialType>) => {
      const accountExists = state.registerArray.some(
        (user: registerValuesType) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      state.isAccountLoggedIn = accountExists;
      if (state.isAccountLoggedIn) {
        alert("Login Succesfull");
        console.log("Logat");
      } else {
        console.log("Nu logat");
        alert("Login Failed");
      }
    },

    setIsAccountRegistered: (state, action: PayloadAction<boolean>) => {
      state.isAccountRegistered = action.payload;
    },
  },
});

export const {
  saveRegisterData,
  checkIfUserExists,
  findAccount,
  setIsAccountRegistered,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;
