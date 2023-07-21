import React, { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "../App";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

async function getUserByEmail(curr) {
  const q = query(collection(db, "users"), where("email", "==", curr));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) {
    return null;
  }
  return querySnapshot.docs[0].data();
}
const auth = getAuth();
export default function AssetExample() {
  const { item, setItem } = useContext(MyContext);
  const navigation = useNavigation();
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });

  async function logIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      setItem(auth.currentUser);
    } catch (error) {
      setValue({
        error: error.message.includes("invalid-email")
          ? "Invalid Email"
          : "Invalid Password",
      });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 50, paddingBottom: 50,alignItems:"center" }}>
        <LinearGradient
          colors={["#e84f9d", "#A543F2", "#4889FE"]}
          style={{
            width:150,
            height:150,
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

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        style={styles.input}
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
      />
      <Text style={styles.errorText}>{value.error}</Text>
      <LinearGradient
        colors={["#e84f9d", "#A543F2", "#4889FE"]}
        style={{ padding: 16, borderRadius: 20, width: 150, marginTop: 30 }}
      >
        <TouchableOpacity onPress={logIn}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={{ color: "white", alignItems: "center", marginTop: 5 }}>
        Don't Have An Account?
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          <Text style={{ color: "blue", fontWeight: "bold",paddingTop:20}}> Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  gradient: {
    borderRadius: 100,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    color: "#FFFFFF",
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 10,
    borderRadius: 25,
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
