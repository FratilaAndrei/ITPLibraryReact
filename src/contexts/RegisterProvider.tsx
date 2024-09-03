import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  loginInitialType,
  registerValuesType,
} from "../components/Auth/AuthValidationSchema";

export type registerContextType = {
  registerArray: registerValuesType[];
  saveRegisterData: (data: registerValuesType) => void;
  checkIfUserExists: (data: registerValuesType) => void;
  findEmail: (data: registerValuesType) => boolean;
  findAccount: (data: loginInitialType) => boolean;
  isAccountRegistered: boolean;
  setIsAccountRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

const registerInitialContext = {
  registerArray: [],
  saveRegisterData: () => {},
  checkIfUserExists: () => {},
  findEmail: () => false,
  findAccount: () => false,
  isAccountRegistered: false,
  setIsAccountRegistered: () => {},
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

  const [isAccountRegistered, setIsAccountRegistered] = useState(false);

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
  const findAccount = (account: loginInitialType) => {
    const accountExists = registerArray.find(
      (item) =>
        item.email === account.email && item.password === account.password
    );

    return !!accountExists;
  };

  const checkIfUserExists = (registerForm: registerValuesType) => {
    const existingAccount = registerArray.find(
      (item) => item.email === registerForm.email
    );
    if (!existingAccount) {
      saveRegisterData(registerForm);
      setIsAccountRegistered(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("register-form", JSON.stringify(registerArray));
  }, [registerArray]);

  return (
    <RegisterContext.Provider
      value={{
        registerArray,
        saveRegisterData,
        checkIfUserExists,
        findEmail,
        findAccount,
        isAccountRegistered,
        setIsAccountRegistered,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
