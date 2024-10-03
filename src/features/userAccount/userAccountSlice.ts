import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginInitialModel,
  registerValuesModel,
  userModel,
} from "../../components/Auth/AuthValidationSchema";

// import { v4 as uuidv4 } from "uuid";

export type userStateModel = {
  registerArray: registerValuesModel[];
  users: userModel[];
  isAccountRegistered: boolean;
  isAccountLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  loggedAccount: userModel;
};
// const getInitialUserState = (): registerValuesModel[] => {
//   const REGISTER_STORAGE = localStorage.getItem("register-form");
//   return REGISTER_STORAGE ? JSON.parse(REGISTER_STORAGE) : [];
// };

const initialState: userStateModel = {
  registerArray: [],
  users: [],
  loading: false,
  error: null,
  isAccountRegistered: false,
  isAccountLoggedIn: false,
  loggedAccount: {
    email: "",
    password: "",
  },
};

export const userAccountSlice = createSlice({
  name: "userAccount",
  initialState,
  reducers: {
    saveRegisterData: (state, action: PayloadAction<registerValuesModel>) => {
      state.registerArray.push(action.payload);
      // localStorage.setItem(
      //   "register-form",
      //   JSON.stringify(state.registerArray)
      // );
    },
    checkIfUserExists: (state, action: PayloadAction<registerValuesModel>) => {
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

    findAccount: (state, action: PayloadAction<loginInitialModel>) => {
      // const accountExists = state.registerArray.some(
      //   (user: registerValuesModel) =>
      //     user.email === action.payload.email &&
      //     user.password === action.payload.password
      // );
      const accountExists = state.users.some(
        (user: userModel) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );

      state.isAccountLoggedIn = accountExists;
      if (state.isAccountLoggedIn) {
        alert("Login Succesfull");
      } else {
        alert("Login Failed");
      }
    },

    setIsAccountRegistered: (state, action: PayloadAction<boolean>) => {
      state.isAccountRegistered = action.payload;
    },

    fetchUserRequest: (state) => {
      state.loading = true;
    },

    fetchUserSuccess: (state, action: PayloadAction<userModel[]>) => {
      state.loading = false;
      state.users = action.payload;
    },

    fetchUserFail: (state) => {
      state.loading = false;
    },

    saveNewUser: (state, action: PayloadAction<userModel>) => {
      const newUser = {
        email: action.payload.email,
        password: action.payload.password,
      };
      state.loggedAccount = newUser;
      state.users.push(newUser);
    },
  },
});

export const {
  saveRegisterData,
  checkIfUserExists,
  findAccount,
  setIsAccountRegistered,
  fetchUserFail,
  fetchUserRequest,
  fetchUserSuccess,
  saveNewUser,
} = userAccountSlice.actions;

export default userAccountSlice.reducer;
