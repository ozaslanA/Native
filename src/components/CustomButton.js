import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ buttonText, handleOnPress }) => {
  return (
    <Pressable
      onPress={handleOnPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "gray" : "#000066",
        },
        styles.button,
      ]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "80%",
    borderWidth: 2,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});
