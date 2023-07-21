import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SectionList,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  Animated,
} from "react-native";
import { Entypo, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const apiKey = "84f03b5d05a58cac4ca05e8abb176d7c";

async function fetchMoviesForGenre(genre) {
  // const url = `https://api.themoviedb.org/3/discover/movie?api_key=84f03b5d05a58cac4ca05e8abb176d7c&with_genres=28`;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre.id}`;
  const response = await fetch(url);
  const data = await response.json();
  const movies = data.results.map(
    ({ id, title, poster_path, overview, vote_average }) => ({
      id,
      title,
      poster_path,
      overview,
      vote_average,
    })
  );
  return movies;
}
const MovieItem = ({ movie, handleMoviePress }) => {
  return (
    <TouchableOpacity
      onPress={() => handleMoviePress(movie)}
      style={{ width: 120, marginRight: 10 }}
    >
      <View style={{ margin: 10 }}>
        <Image
          style={{ width: 100, height: 150 }}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
        />
        <Text style={{ marginTop: 5, color: "#e6e3e3" }}>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MovieList = ({ genre, handleMoviePress }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMoviesForGenre(genre);
      setMovies(movies);
    };
    getMovies();
  }, []);

  return (
    <View style={{ width: "100%", height: 300,marginLeft:5 }}>
      <Text style={{ color: "white", fontSize: 20,fontWeight:"bold" }}>{genre.name}</Text>
      <FlatList
        data={movies}
        horizontal
        renderItem={({ item }) => (
          <MovieItem movie={item} handleMoviePress={handleMoviePress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{}}
      />
    </View>
  );
};

export default function Movies() {
  const [genres, setGenres] = useState([]);
  const navigation = useNavigation();

  const handleMoviePress = (movie) => {
    navigation.navigate("Movie Details", { movie });
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }, []);

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
        <Text style={styles.headerText}>Movies</Text>
        <View></View>
      </View>
      <ScrollView style={{ flex: 0.9, width: "100%" }}>
        {genres.map((obj) => (
          <MovieList genre={obj} handleMoviePress={handleMoviePress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",

    backgroundColor: "black",
  },
  header: {
    marginTop: 10,

    flex: 0.1,
    width: "87%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: { color: "white", fontSize: 25, fontWeight: "bold", paddingTop: 2 },
});
