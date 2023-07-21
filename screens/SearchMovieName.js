import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollList,
  Platform,
  Button,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Entypo, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
const apiKey = "84f03b5d05a58cac4ca05e8abb176d7c";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
let calcLeftMargin = windowWidth * 0.05;

export default function SearchMovieName() {
  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState();

  const handleChangeText = (value) => {
    setText(value);
  };

  const renderMovies = (movie) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: "row",marginBottom:15,alignItems:"center" }}
        onPress={() => {
          navigation.navigate("Movie Details", { movie });
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={{ borderRadius: 15, width: 80, height: 100 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 15,
            marginLeft:20
          }}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const onSearch = async () => {
    console.log("in onsearch");
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${text}`;
    // const url = `https://api.themoviedb.org/3/search/movie?api_key=84f03b5d05a58cac4ca05e8abb176d7c&query=titanic`;
    const response = await fetch(url);
    const data = await response.json();
    setSearchResults(data.results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <SimpleLineIcons name="menu" size={25} color="#006AFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Find Movie</Text>
        <View></View>
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="'#212121'"
          value={text}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={onSearch}>
          <Ionicons name="ios-search-sharp" size={30} color="blue" />
        </TouchableOpacity>
      </View>

      <View style={styles.results}>
        {searchResults && (
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity style={{ textAlign: "center" }}>
              <Ionicons
                name="ios-close"
                size={40}
                color="red"
                onPress={() => {
                  setSearchResults(null);
                  setText("");
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={searchResults}
          renderItem={({ item }) => renderMovies(item)}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginLeft:10}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
  header: {
    marginTop: 20,
    width: "87%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  text: { color: "white", fontSize: 20, fontWeight: "bold", paddingTop: 2 },
  search: {
    flexDirection: "row",
    width: "87%",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#212121",
    borderRadius: 10,
    fontSize: 16,
    color: "white",
    padding: 5,
  },
  results: {
    width: "90%",
    flex:1
  },
});
