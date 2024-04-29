import React from "react";
import { Formik } from "formik";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Yup from "yup";

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Email formatı uygun girilmedi")
    .required("Email alanı zorunludur"),
  password: Yup.string().required("Şifre Alanı zorunludur"),
});

const Error = ({ message }) => <Text>{message}</Text>;

const FormPage = () => {
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          errors,
          touched,
          handleBlur,
        }) => (
          <>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.input}
              inputMode="email"
              placeholder="Email"
            />
            {touched.email && errors.email && <Error message={errors.email} />}
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.input}
              secureTextEntry
              placeholder="Şifre"
            />
            {touched.password && errors.password && (
              <Error message={errors.password} />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Gönder</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default FormPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    height: 50,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "purple",
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
