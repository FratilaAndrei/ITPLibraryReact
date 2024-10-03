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
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PAGE_ROUTE } from "../data/routes";
import { API_URL, auth22 } from "../firebase/firebase";

export type userContextModel = {
  // users: User[];
  currentUser: User | null;
  // setCurrentUser: Dispatch<SetStateAction<User | null>>;
  isUserLogged: boolean;
  loading: boolean;
  logOut: () => void;
  registerUser: (email: string, password: string) => void;
  logInUser: (email: string, password: string) => void;
};

const initialContext = {
  // users: [],
  currentUser: null,
  // setCurrentUser: null,
  loading: true,
  logOut: () => {},
  registerUser: () => {},
  isUserLogged: false,
  logInUser: () => {},
};

export const UserContext = createContext<userContextModel>(initialContext);

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth22, (user) => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });

    const unsubscribe = onAuthStateChanged(auth22, async (user) => {
      console.log("---------------------------------->>>", user);
      if (user) {
        try {
          // const token = await user.getIdTokenResult();
          const token = await user.getIdTokenResult(false);
          const refreshToken = user.refreshToken;
          // const mockExpirationTime = new Date(Date.now() - 1000);

          const expirationTime = new Date(token.expirationTime).setHours(
            22,
            39,
            0,
            0
          );

          // Firebase impiedica lucru direct cu Refresh Token, se ocupa el automat la 30zile
          // token expires in 1h

          const currentTime = new Date().getTime();
          // const currentTime = new Date().getTime();

          if (expirationTime < currentTime) {
            // if (mockExpirationTime < currentTime) {
            await signOut(auth22);
            setCurrentUser(null);
            window.location.href = `${HOME_PAGE_ROUTE}`;
          } else {
            setCurrentUser(user);
            setIsUserLogged(true);
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
          await auth22.signOut();
          setCurrentUser(null);
          setIsUserLogged(false);
          window.location.href = `${HOME_PAGE_ROUTE}`;
        }
      } else {
        // setCurrentUser(null);
        //Decomenteaza
        //   if (
        //     location.pathname !== HOME_PAGE_ROUTE &&
        //     location.pathname !== LOGIN_ROUTE &&
        //     location.pathname !== REGISTER_ROUTE
        //   )
        //     window.location.href = `${HOME_PAGE_ROUTE}`;
        // }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // }, [location.pathname, navigate]);
  const logOut = () => {
    signOut(auth22);
    document.cookie = "Auth-jwt=;max-age=0";
    window.location.href = `${HOME_PAGE_ROUTE}`;
  };

  const setTokenInCookie = async (user: User) => {
    const token = await user.getIdToken();
    // daca pun true, dau force la refresh token
    // const options = {
    //   maxAge: 1000 * 60 * 15, // 15 min token
    //   sameSite: "strict",
    //   secure: true,
    // };
    // document.cookie = `Auth-jwt=${token}; max-age=${options.maxAge}; path=/; secure=${options.secure}; samesite=${options.sameSite}`;
    document.cookie = `Auth-jwt=${token}; path=/; secure; sameSite= strict`;
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
      setIsUserLogged(true);
      setUsers([...users, actualUser]);
      await setTokenInCookie(actualUser);
      await saveUserInDB(actualUser, password);
      navigate(HOME_PAGE_ROUTE);
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
      console.log(userCredentials);
      setCurrentUser(user);
      setIsUserLogged(true);
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
        // setCurrentUser,
        loading,
        logOut,
        registerUser,
        logInUser,
        // users,
        isUserLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
