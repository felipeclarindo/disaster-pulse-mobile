import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../../types/navigation";
import Separator from "../../components/ui/Separator";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!user || !password) {
      Alert.alert("Atenção", "Preencha e-mail e senha.");
      return;
    }
    const userData = { user, email: "teste@gmail.com" };
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      navigation.navigate("drawer");
    } catch (err) {
      Alert.alert("Erro", "Não foi possível realizar o login.");
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Usuário"
          placeholderTextColor="#888"
          style={styles.input}
          keyboardType="default"
          autoCapitalize="words"
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não tem conta?{" "}
          <Text
            onPress={() => navigation.navigate("register")}
            style={styles.linkText}
          >
            Cadastre-se
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 45,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FC7032",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 50,
    backgroundColor: "#1F1F1F",
    borderColor: "#FC7032",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FC7032",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: { color: "#121212", fontSize: 16, fontWeight: "700" },
  footerText: { textAlign: "center", color: "#C7D6B9", fontSize: 14 },
  linkText: {
    color: "#FC7032",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  logo: {
    width: 250,
    height: 200,
    alignSelf: "center",
    marginBottom: 40,
  },
});

export default LoginPage;
