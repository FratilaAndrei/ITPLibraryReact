import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { auth22 } from "../firebase/firebase";

export type userContextModel = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  logOut: () => void;
};

const initialContext = {
  currentUser: null,
  setCurrentUser: null,
  loading: true,
  logOut: null,
};

export const UserContext = createContext<userContextModel>(initialContext);

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth22, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const logOut = () => {
    signOut(auth22);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, loading, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
