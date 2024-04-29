import { Image, StyleSheet, View } from "react-native";
import { Loading, CustomTextInput, CustomButton } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../redux/userSlice";
import { login, autoLogin } from "../redux/userSlice";
import { useEffect, useState } from "react";

export default function LoginPage({ navigation }) {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/findeks.png")}
        style={styles.image}
      />
      <CustomTextInput
        title="Email"
        isSecureText={false}
        handleOnChangeText={(text) => setEmail(text.toLowerCase())}
        handleValue={email}
        handlePlaceHolder="Enter Your Email"
      />
      <CustomTextInput
        title="password"
        isSecureText={true}
        handleOnChangeText={(password) => setPassword(password)}
        handleValue={password}
        handlePlaceHolder="Enter Your Password"
      />

      <CustomButton
        buttonText="login"
        setWidth="80%"
        handleOnPress={() => dispatch(login({ email, password }))}
      />

      <CustomButton
        buttonText="Sign Up"
        setWidth="80%"
        handleOnPress={() => navigation.navigate("SignUp")}
      />

      {isLoading ? (
        <Loading changeİsLoading={() => dispatch(setIsLoading(false))} />
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
