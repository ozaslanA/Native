import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <Text>SignUpPage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SignUpPage;