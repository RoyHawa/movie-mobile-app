import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Share,
  Modal,
  Linking,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Calendar from "expo-calendar";
const apiKey = "84f03b5d05a58cac4ca05e8abb176d7c";
export default function MovieDetails() {
  const { movie } = useRoute().params;

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = "at " + tempDate.getHours() + " : " + tempDate.getMinutes();
    setText(fDate + "\n" + fTime);
    console.log(fDate + " (" + fTime + " )");
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Movie:${movie.title}\nRating:${movie.vote_average}/10\nOverview:${movie.overview}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const createEvent = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        let calendar;
        if (Platform.OS === "ios") {
          calendar = await Calendar.getDefaultCalendarAsync();
        } else {
          const calendars = await Calendar.getCalendarsAsync(
            Calendar.EntityTypes.EVENT
          );
          calendar =
            calendars.find(({ isPrimary }) => isPrimary) || calendars[0];
        }
        const startDate = date;
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
        const dic = {
          title: `Watch ${movie.title}`,
          startDate,
          endDate,
        };
        await Calendar.createEventAsync(calendar.id, dic);
        setText("");
        setModalVisible(false);
        Alert.alert(`Event added`);
      } else {
        Linking.openSettings();
        return;
      }
    } catch (e) {
      console.log("Error creating event:", e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={{
            height: 300,
            width: 300,
            marginTop: 30,
            resizeMode: "contain",
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {movie.title}
        </Text>
        <Text style={{ color: "white", marginTop: 10, fontSize: 15 }}>
          Rating:{movie.vote_average}/10
        </Text>
      </View>
      <View style={{ marginLeft: 20, marginTop: 20 }}>
        <Text
          style={{
            color: "white",
            textAlign: "left",
            fontSize: 25,
            marginBottom: 10,
          }}
        >
          Overview
        </Text>
        <ScrollView style={{ height: 100 }}>
          <Text style={{ color: "white" }}>{movie.overview}</Text>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <Button
          title="Schedule Watch Time"
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="share" size={24} color="blue" />
          <Button
            title="share"
            onPress={onShare}
            style={{ backgroundColor: "red", color: "blue" }}
          />
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          {text ? (
            <>
              <Text style={styles.text}>{text}</Text>
            </>
          ) : (
            <Text style={styles.text}>Pick a Date and Time!</Text>
          )}
          <View
            style={{ flexDirection: "row", marginTop: 30, marginBottom: 15 }}
          >
            <Button title="Date Picker" onPress={() => showMode("date")} />

            <Button title="Time Picker" onPress={() => showMode("time")} />
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              minimumDate={new Date()}
              style={{ marginBottom: 50 }}
            />
          )}

          {text && (
            <Button title="Add Movie event" onPress={() => createEvent()} />
          )}
          <Button
            title={"Cancel"}
            onPress={() => {
              setDate(new Date());
              setText("");
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "black",
  },
  text: { color: "white", fontSize: 30 },
});
