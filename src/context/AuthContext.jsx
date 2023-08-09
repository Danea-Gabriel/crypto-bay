import { createContext, useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const signUp = (email, passwrd) => {
    createUserWithEmailAndPassword(auth, email, passwrd);
    return setDoc(doc(firestore, "users", email), {
      watchList: [],
    });
  };
  const signIn = (email, passwrd) => {
    return signInWithEmailAndPassword(auth, email, passwrd);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, signUp, signIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
