import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, provider, db } from './firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { collection, doc, getDoc, setDoc, onSnapshot, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
          });
        }

        // Set up real-time listener for the user document
        const unsubscribeUserDoc = onSnapshot(userRef, (doc) => {
          console.log("Current data: ", doc.data());
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribeUserDoc();
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);

  const findUsers = async () => {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map(doc => doc.data());
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, findUsers }}>
      {children}
    </AuthContext.Provider>
  );
};