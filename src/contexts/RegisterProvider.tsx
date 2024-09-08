import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  loginInitialModel,
  registerValuesModel,
} from "../components/Auth/AuthValidationSchema";

export type registerContextType = {
  registerArray: registerValuesModel[];
  saveRegisterData: (data: registerValuesModel) => void;
  checkIfUserExists: (data: registerValuesModel) => void;
  findEmail: (data: registerValuesModel) => boolean;
  findAccount: (data: loginInitialModel) => boolean;
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
  const getInitialRegisterState = (): registerValuesModel[] => {
    const REGISTER_STORAGE = localStorage.getItem("register-form");
    return REGISTER_STORAGE ? JSON.parse(REGISTER_STORAGE) : [];
  };
  const [registerArray, setRegisterArray] = useState<registerValuesModel[]>(
    getInitialRegisterState()
  );

  const [isAccountRegistered, setIsAccountRegistered] = useState(false);

  const saveRegisterData = (registerForm: registerValuesModel) => {
    setRegisterArray((prev) => [...prev, registerForm]);
  };

  const findEmail = (registerForm: registerValuesModel) => {
    const emailExists = registerArray.find(
      (item) => item.email === registerForm.email
    );

    if (emailExists) {
      return true;
    } else {
      return false;
    }
  };
  const findAccount = (account: loginInitialModel) => {
    const accountExists = registerArray.find(
      (item) =>
        item.email === account.email && item.password === account.password
    );

    return !!accountExists;
  };

  const checkIfUserExists = (registerForm: registerValuesModel) => {
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
