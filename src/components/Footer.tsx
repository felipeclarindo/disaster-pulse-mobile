import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  home: undefined;
  account: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Footer = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const buttons: {
    name: keyof RootStackParamList;
    icon: React.ComponentProps<typeof Feather>["name"];
    label: string;
  }[] = [
    { name: "home", icon: "home", label: "Home" },
    { name: "account", icon: "user", label: "Conta" },
  ];

  return (
    <View style={styles.container}>
      {buttons.map(({ name, icon, label }) => {
        const isActive = route.name === name;
        return (
          <TouchableOpacity
            key={name}
            style={[styles.button, isActive && styles.activeButton]}
            onPress={() => navigation.navigate(name as any)}
            activeOpacity={0.7}
          >
            <Feather
              name={icon}
              size={24}
              color={isActive ? "#FC7032" : "#fc6f32d5"}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#121212",
    paddingVertical: 14,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
    elevation: 10,
  },
  button: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  activeButton: {
    borderTopWidth: 2,
    borderTopColor: "#FC7032",
    paddingTop: 7,
  },
  label: {
    color: "#fc6f32d8",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  activeLabel: {
    color: "#FC7032",
    fontWeight: "700",
  },
});

export default Footer;
