import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Menu = (props: any) => {
  const navigation = useNavigation<any>();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.title}>Mottu Mapeamento</Text>
        <View style={styles.divider} />
        <DrawerItem
          label="Home"
          icon={() => <Feather name="home" size={20} color="#333" />}
          onPress={() => navigation.navigate("Home")}
          labelStyle={styles.label}
        />
        <DrawerItem
          label="Pátio"
          icon={() => <Feather name="map-pin" size={20} color="#333" />}
          onPress={() => navigation.navigate("Patio")}
          labelStyle={styles.label}
        />
        <DrawerItem
          label="Report"
          icon={() => <Feather name="file-text" size={20} color="#333" />}
          onPress={() => navigation.navigate("Report")}
          labelStyle={styles.label}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    paddingHorizontal: 16,
    color: "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 16,
  },
  label: {
    color: "#333",
    fontSize: 16,
  },
});

export default Menu;
