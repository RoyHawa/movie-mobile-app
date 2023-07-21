import React, { createContext, useState, useEffect } from "react";
import "./config/firebase";
import RootNavigation from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import "firebase/firestore";
export const MyContext = createContext();

export default function App() {
  const [item, setItem] = useState(null);

  return (
    <MyContext.Provider value={{ item, setItem }}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </MyContext.Provider>
  );
}
