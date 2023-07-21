import React, { useState } from "react";
import { Text, View, StyleSheet, BottomTabNavigator } from "react-native";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import Movies from "../screens/Movies";
import SettingsNavigator from "./profileStack";
import SearchMovieName from "../screens/SearchMovieName";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileStack from "./profileStack";
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
import { MaterialCommunityIcons } from "@expo/vector-icons";
function MoviesDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#171717",
          width: 250,
          height: "100%",
        },
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerLabelStyle: {
          fontWeight: "bold",
          fontSize: 16,
          marginLeft: 16,
        },
      }}
    >
      <Drawer.Screen
        name="Movies"
        component={Movies}
        options={{
          drawerIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="popcorn"
              size={24}
              color={focused ? "#006AFF" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchMovieName}
        options={{
          drawerIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={24}
              color={focused ? "#006AFF" : "grey"}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function UserTab() {
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Movies"
        component={MoviesDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="popcorn"
              size={24}
              color={focused ? "#006AFF" : "grey"}
            />
          ),
          headerShown: false,
          title: "",
        }}
      />
      <Tab.Screen
        name="Profile Stack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={24}
              color={focused ? "#006AFF" : "grey"}
            />
          ),
          headerShown: false,
          title: "",
        }}
      />
    </Tab.Navigator>
  );
}
