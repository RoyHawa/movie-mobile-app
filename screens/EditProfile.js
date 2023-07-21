import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { auth, db } from "../config/firebase";
import { MyContext } from "../App";
import "firebase/firestore";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import * as MediaLibrary from "expo-media-library";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Icons from "react-native-vector-icons/MaterialIcons";
import { updateProfile } from "firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";

export default function AssetExample() {
  const [permissionMedia, requestMedia] = MediaLibrary.usePermissions();
  const navigation = useNavigation();
  const { item, setItem } = useContext(MyContext);

  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(item.photoURL);

  const handleAuthenticate = async () => {
    const hasBiometrics = await LocalAuthentication.hasHardwareAsync();
    if (hasBiometrics) {
      const result = await LocalAuthentication.authenticateAsync({
        cancelLabel: "Cancel",
        fallbackToPasscode: true,
        promptMessage: "Unlock your phone to edit profile",
      });
      if (result.success) {
        console.log("Authentication successful!");
      } else {
        navigation.goBack();
      }
    } else {
      console.log("Biometrics not available on this device");
    }
  };
  useEffect(() => {
    handleAuthenticate();
  }, []);

  const uploadImage = async (uri) => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const storage = getStorage();
      const lref = ref(storage, `users/${userId}/image.jpg`);
      const img = await fetch(uri);
      const bytes = await img.blob();
      await uploadBytes(lref, bytes);
      await getDownloadURL(lref).then(async (url) => {
        await updateProfile(firebase.auth().currentUser, {
          photoURL: url,
        });
        setItem({ ...item, photoURL: url });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const pickImage = async () => {
    if (permissionMedia.status !== "granted") {
      const { status } = await requestMedia();
      if (status !== "granted") {
        return <View />;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);

      await uploadImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "flex-start",
      }}
    >
      <View
        style={{
          flex: 0.2,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderWidth: 1,
            borderColor: "white",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            marginBottom: 5,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              overflow: "hidden",
            }}
          />
        </View>
        <TouchableOpacity onPress={pickImage}>
          <Text style={{ color: "blue", fontSize: 20, textAlign: "center" }}>
            Choose Image
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            marginTop: 50,
            width: "101%",
            borderWidth: 1,
            borderColor: "white",
            height: 50,
            justifyContent: "center",
          }}
        >
          {isEditing ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TextInput
                value={item.displayName}
                onChangeText={(text) => {
                  setItem({ ...item, displayName: text });
                }}
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 25,
                  marginRight: 10,
                }}
              />
              <Button
                title={"done"}
                onPress={async () => {
                  setIsEditing(false);
                  await updateProfile(firebase.auth().currentUser, {
                    displayName: item.displayName,
                  });
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsEditing(true);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 25,

                  width: "90%",
                  textAlign: "center",
                }}
              >
                {item.displayName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            marginLeft: 50,
          }}
        >
          <Text
            style={{
              color: "white",
              marginTop: 50,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Email
          </Text>
          <Text style={{ color: "white", paddingLeft: 10 }}>{item.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
