import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";

const Loading = ({ username, changeİsLoading }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => changeİsLoading()}
        style={styles.closeButtonContainer}
      >
        <Text style={styles.closeButton}>x</Text>
      </Pressable>
      <ActivityIndicator size={"large"} color={"blue"} />
      <Text style={styles.loginText}> {username} Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 1000,
    height: "100%",
    backgroundColor: "tomato",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginTop: 20,
  },
  closeButtonContainer: {
    backgroundColor: "black",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 50,
  },
  closeButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
