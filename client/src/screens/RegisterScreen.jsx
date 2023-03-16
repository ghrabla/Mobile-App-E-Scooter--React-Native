import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const apiUrl = Constants.expoConfig.extra.apiUrl;

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/user/register`, {
        name: fullName,
        email,
        password,
      });
      console.log(res.data);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.log(error.response.data.message);
      Alert.alert("Error", error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 300, height: 300, marginBottom: 20 }}
          source={require("../../assets/animation/scooter.gif")}
        />
      </View>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFullName(text)}
          // value={fullName}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#1E90FF" />
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleRegister}>
              Register
            </Text>
          </TouchableOpacity>
        )}
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity>
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
    alignItems: "center",
  },
  input: {
    marginVertical: 12,
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    fontSize: 16,
    shadowColor: "#000",
  },
  link: {
    color: "#1E90FF",
    fontWeight: "bold",
    marginLeft: 5,
  },
  button: {
    marginTop: 24,
    width: "100%",
    padding: 14,
    backgroundColor: "#1E90FF",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RegisterScreen;
