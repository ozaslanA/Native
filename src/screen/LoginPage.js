import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Loading, CustomTextInput, CustomButton } from "../components/index";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const [isloading, setİsloading] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/findeks.png")}
        style={styles.image}
      />
      <CustomTextInput
        title="Email"
        isSecureText={false}
        handleOnChangeText={email}
        handleValue={setEmail}
        handlePlaceHolder="Enter Your Email"
      />
      <CustomTextInput
        title="password"
        isSecureText={true}
        handleOnChangeText={setPassword}
        handleValue={password}
        handlePlaceHolder="Enter Your Password"
      />

      <CustomButton
        buttonText="login"
        setWidth="80%"
        handleOnPress={() => setİsloading(true)}
      />

      <CustomButton
        buttonText="Sign Up"
        setWidth="80%"
        handleOnPress={() => navigation.navigate("SignUp")}
      />

      {isloading ? (
        <Loading changeİsLoading={() => setİsloading(false)} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "tomato",
  },

  image: {
    marginBottom: 10,
    width: 100,
    height: 70,
  },
});
