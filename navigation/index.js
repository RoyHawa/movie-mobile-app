import React, { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import MainStack from "./mainStack";
import AuthStack from "./authStack";
import { MyContext } from "../App";
export default RootNavigation = () => {
  const { item, setItem } = useContext(MyContext);
  const { user } = useAuth();

  return user && item ? <MainStack /> : <AuthStack />;

};
