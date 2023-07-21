import React, { createContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import EditProfile from "../screens/EditProfile";

const Stack = createStackNavigator();

export default ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },

          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};
