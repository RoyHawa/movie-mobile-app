import React, { useState } from "react";
import { Text, View, StyleSheet, BottomTabNavigator } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import UserTab from "./userTab";
import MovieDetails from "../screens/MovieDetails";

const Stack = createStackNavigator();

export default function mainStack() {
  return (
    <Stack.Navigator
      tabBarOptions={{
        tabStyle: {
          backgroundColor: "black",
          paddingTop: 10,
        },
        labelStyle: {
          fontSize: 9,
        },
      }}
    >
      <Stack.Screen
        name="Tab"
        component={UserTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-sharp"
              size={24}
              color={focused ? "#006AFF" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Movie Details"
        component={MovieDetails}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="video-camera"
              size={24}
              color={focused ? "#006AFF" : "grey"}
            />
          ),
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
            fontSize:20
          },
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
