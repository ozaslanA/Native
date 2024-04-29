import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import { CustomTextInput, CustomButton, Loading } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/userSlice";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .required("İsim zorunludur."),
});

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.user);
  const handleRegister = () => {
    dispatch(register({ email, password }));
  };
  if (isLoading) {
    return <Loading />;
  }

  const handleNameChange = (text) => {
    setName(text);
    // Her değer değiştiğinde doğrulama yap
    validationSchema
      .validate({ name: text })
      .then(() => setNameError(""))
      .catch((error) => setNameError(error.errors[0]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image
          source={require("../../assets/signUp1.png")}
          style={styles.image}
        />
        <Text style={styles.signUp}>Sign Up</Text>
      </View>
      <View style={styles.textInputContainer}>
        <CustomTextInput
          title="Name"
          isSecureText={false}
          handleOnChangeText={handleNameChange}
          handleValue={name}
          handlePlaceHolder="Enter Your Name"
        />
        {nameError !== "" && <Text style={{ color: "red" }}>{nameError}</Text>}

        <CustomTextInput
          title="Email"
          isSecureText={false}
          handleOnChangeText={setEmail}
          handleValue={email}
          handlePlaceHolder="Enter Your Email"
        />
        <CustomTextInput
          title="Password"
          isSecureText={true}
          handleOnChangeText={setPassword}
          handleValue={password}
          handlePlaceHolder="Enter Your Password"
        />
      </View>
      <View style={styles.loginOptions}>
        <CustomButton
          buttonText="Giriş Yap"
          setWidth="80%"
          buttonColor="blue"
          pressedButtonColor="gray"
          handleOnPress={handleRegister}
        />
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ fontWeight: "bold" }}
        >
          <Text>Already have a an account? Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "tomato",
  },
  signUp: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
    color: "white",
  },
  textInputContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    flex: 2,
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    justifyContent: "center",
  },
  loginOptions: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 30,
    marginTop: 30,
  },
});

export default SignUpPage;
