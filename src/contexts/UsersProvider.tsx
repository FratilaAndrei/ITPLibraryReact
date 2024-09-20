import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_ROUTE } from "../data/routes";
import { API_URL, auth22 } from "../firebase/firebase";

export type userContextModel = {
  // users: User[];
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  logOut: () => void;
  registerUser: (email: string, password: string) => void;
  logInUser: (email: string, password: string) => void;
};

const initialContext = {
  // users: [],
  currentUser: null,
  setCurrentUser: null,
  loading: true,
  logOut: null,
  registerUser: null,
  logInUser: null,
};

export const UserContext = createContext<userContextModel>(initialContext);

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth22, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const logOut = () => {
    signOut(auth22);
    document.cookie = "jwt=;max-age=0"; // reset cookie
  };

  const setTokenInCookie = async (user: User) => {
    const token = await user.getIdToken(true);
    const options = {
      maxAge: 1000 * 60 * 15, // 15 min token
      sameSite: "strict",
      secure: true,
    };
    document.cookie = `jwt=${token}; max-age=${options.maxAge}; path=/; secure=${options.secure}; samesite=${options.sameSite}`;
    console.log("Token saved in cookies:", token);
  };
  const saveUserInDB = async (user: User, password: string) => {
    const userId = user.uid;
    try {
      const userData = {
        email: user.email,
        id: user.uid,
        password: password,
        createdAt: new Date().toISOString(),
      };
      await axios.put(`${API_URL}/users/${userId}.json`, userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerUser = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth22,
        email,
        password
      );
      const actualUser = user.user;
      setCurrentUser(actualUser);
      setUsers([...users, actualUser]);
      await setTokenInCookie(actualUser);
      await saveUserInDB(actualUser, password);
      navigate(HOME_PAGE_ROUTE);
      console.log("USER_TOKEN", user.user.getIdToken(true));
    } catch (error) {
      console.log(error.message);
    }
  };

  const logInUser = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth22,
        email,
        password
      );
      const user = userCredentials.user;
      setCurrentUser(user);
      await setTokenInCookie(user);
      navigate(HOME_PAGE_ROUTE);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loading,
        logOut,
        registerUser,
        logInUser,
        // users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
