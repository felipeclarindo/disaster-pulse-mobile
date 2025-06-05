import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
  onMenuPress: () => void;
};

const Header = ({ title, onMenuPress }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <Feather name="menu" size={28} color="#54C65B" />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Image
        source={require("../assets/favicon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    elevation: 12,
  },
  menuButton: {
    padding: 4,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#54C65B",
    marginHorizontal: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
});

export default Header;
