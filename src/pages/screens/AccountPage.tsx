import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { UserProps } from "../../types";
import { AccountScreenNavigationProp } from "../../types/navigation";

const AccountPage = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const navigation = useNavigation<AccountScreenNavigationProp>();

  const loadUser = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("user");
      if (json) {
        const parsed: UserProps = JSON.parse(json);
        setUser(parsed);
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("user");
            navigation.navigate("login");
          } catch (error) {
            console.error("Erro ao sair da conta:", error);
            Alert.alert("Erro", "Não foi possível sair da conta.");
          }
        },
      },
    ]);
  };

  const handleEditAccount = () => {
    Alert.alert("Editar Conta", "Funcionalidade ainda não implementada.");
  };

  return (
    <View style={styles.container}>
      <Header
        title="Minha Conta"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Informações da Conta</Text>

        {user && (
          <View style={styles.card}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{user.user}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        )}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleEditAccount}
            activeOpacity={0.7}
          >
            <Text style={styles.primaryButtonText}>Editar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FC7032",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#1F1F1F",
    borderColor: "#FC7032",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#C7D6B9",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginTop: 4,
  },
  buttonGroup: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#FC7032",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default AccountPage;
