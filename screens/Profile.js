import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../App";
import { auth } from "../config/firebase";

const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export default function AssetExample() {
  const navigation = useNavigation();
  const { item, setItem } = useContext(MyContext);
  // const item = {
  //   displayName: "Fname Lname",
  //   email: "email@email.com",
  //   photoURL:
  //     "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
  // };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            // borderRadius: 30,
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            marginRight: 0,
          }}
        >
          <Image
            source={{
              uri: item.photoURL,
            }}
            style={{
              //  borderRadius: "50%",
              width: 100,
              height: 100,
              overflow: "hidden",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          />
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            width: 100,
            textAlign: "center",
            paddingTop: 30,
          }}
        >
          {item.displayName}
        </Text>
      </View>
      <View>
        <Button
          title={"Edit Profile"}
          onPress={() => {
            navigation.navigate("Edit Profile");
          }}
        />

        <Button title={"Log out"} onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
