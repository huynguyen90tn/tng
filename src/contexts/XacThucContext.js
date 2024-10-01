 // XacThucContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const XacThucContext = createContext();

export const XacThucProvider = ({ children }) => {
  const [nguoiDung, setNguoiDung] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setNguoiDung(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <XacThucContext.Provider value={{ nguoiDung }}>
      {children}
    </XacThucContext.Provider>
  );
};
