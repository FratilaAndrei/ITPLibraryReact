import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { registerValuesType } from "../components/Auth/AuthValidationSchema";

export type registerContextType = {
  registerArray: registerValuesType[];
  saveRegisterData: (data: registerValuesType) => void;
  checkIfUserExists: (data: registerValuesType) => void;
  findEmail: (data: registerValuesType) => boolean;
};

const registerInitialContext = {
  registerArray: [],
  saveRegisterData: () => {},
  checkIfUserExists: () => {},
  findEmail: () => false,
};

export const RegisterContext = createContext<registerContextType>(
  registerInitialContext
);

const RegisterProvider: FC<PropsWithChildren> = ({ children }) => {
  const getInitialRegisterState = (): registerValuesType[] => {
    const REGISTER_STORAGE = localStorage.getItem("register-form");
    return REGISTER_STORAGE ? JSON.parse(REGISTER_STORAGE) : [];
  };
  const [registerArray, setRegisterArray] = useState<registerValuesType[]>(
    getInitialRegisterState()
  );

  const saveRegisterData = (registerForm: registerValuesType) => {
    setRegisterArray((prev) => [...prev, registerForm]);
  };

  const findEmail = (registerForm: registerValuesType) => {
    const emailExists = registerArray.find(
      (item) => item.email === registerForm.email
    );

    if (emailExists) {
      return true;
    } else {
      return false;
    }
  };

  const checkIfUserExists = (registerForm: registerValuesType) => {
    const existingAccount = registerArray.find(
      (item) => item.email === registerForm.email
    );
    if (!existingAccount) {
      saveRegisterData(registerForm);
    }
  };

  useEffect(() => {
    localStorage.setItem("register-form", JSON.stringify(registerArray));
  }, [registerArray]);

  return (
    <RegisterContext.Provider
      value={{ registerArray, saveRegisterData, checkIfUserExists, findEmail }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
