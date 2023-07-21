import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const auth = getAuth();

export default function AssetExample() {
  const navigation = useNavigation();
  const [name, setName] = useState({ firstName: "", lastName: "", name: "" });
  const [value, setValue] = useState({ email: "", password: "" });
  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }
    if (value.password.length < 6) {
      setValue({
        ...value,
        error: "Password at least 6 characters",
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      await updateProfile(userCredential.user, {
        displayName: value.name,
      });
      navigation.navigate("Log In");
    } catch (error) {
      setValue({
        ...value,
        error: error.message.includes("invalid-email")
          ? "Invalid Email"
          : error.message.includes("email-already-in-use")
          ? "Email Already In Use"
          : "Password Should Be At Least 6 Characters",
      });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20, paddingBottom: 40, alignItems: "center" }}>
        <LinearGradient
          colors={["#e84f9d", "#A543F2", "#4889FE"]}
          style={{
            width: 150,
            height: 150,
            borderTopLeftRadius: 75,
            borderTopRightRadius: 75,
            borderBottomLeftRadius: 75,
            borderBottomRightRadius: 75,
            padding: 25,
          }}
        >
          <MaterialCommunityIcons name="popcorn" size={100} color="white" />
        </LinearGradient>
        <Text style={{ color: "white", fontSize: 30, marginLeft: 10 }}>
          Popcorn Time
        </Text>
      </View>

      <Text style={{ color: "white", fontSize: 25,fontWeight:"bold", marginBottom: 25,marginTop:10 }}>
        CREATE ACCOUNT
      </Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor={"white"}
        style={styles.input}
        value={value.name}
        onChangeText={(text) => setValue({ ...value, name: text })}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={"white"}
        borderRadius={50}
        style={styles.input}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor={"white"}
        secureTextEntry={true}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        minlength="6"
      />

      <Text style={styles.errorText}>{value.error}</Text>
      <LinearGradient
        colors={["#e84f9d", "#A543F2", "#4889FE"]}
        style={{
          marginTop:20,
          borderRadius: 50,
          padding: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={{ color: "white", alignItems: "center", marginTop: 10 }}>
        Already Have An Account?
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={{ color: "blue", fontWeight: "bold" }}>Log In</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    backgroundColor: "black",
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  textinp: {
    paddingTop: 5,
    width: 250,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  button: {
    width: 93,
    height: 30,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    color: "#FFFFFF",
    borderColor: "#ccc",
    padding: 10,
    width: "60%",
    marginBottom: 10,
    borderRadius: 25,
  },
});
