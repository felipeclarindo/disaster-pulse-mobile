import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MotoCard from "../../components/MotoCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Moto } from "../../types";

const motos: Moto[] = [
  {
    id: "M1",
    setorName: "OK",
    setorDescription: "OK",
    setorColorRgb: "#00FF00",
    plate: "ABC1234",
    setorId: "1",
  },
  {
    id: "M2",
    setorName: "Em Manutenção",
    setorDescription: "Motos pronta ser retirada",
    setorColorRgb: "#FFA500",
    plate: "DAC1263",
    setorId: "2",
  },
  {
    id: "M3",
    setorName: "Pronta",
    setorDescription: "",
    setorColorRgb: "#0000FF",
    plate: "DAC1534",
    setorId: "3",
  },
  {
    id: "M4",
    setorName: "OK",
    setorDescription: "Motos em boas condições",
    setorColorRgb: "#00FF00",
    plate: "ADA123",
    setorId: "1",
  },
  {
    id: "M5",
    setorName: "Em Manutenção",
    setorDescription: "Motos com problemas técnicos",
    setorColorRgb: "#FFA500",
    plate: "ADA1313",
    setorId: "2",
  },
  {
    id: "M6",
    setorName: "Pronta",
    setorDescription: "Motos pronta ser retirada",
    setorColorRgb: "#0000FF",
    plate: "ADA1313",
    setorId: "3",
  },
  {
    id: "M7",
    setorName: "OK",
    setorDescription: "Motos em boas condições",
    setorColorRgb: "#00FF00",
    plate: "ASG1241",
    setorId: "1",
  },
  {
    id: "M8",
    setorName: "Em Manutenção",
    setorDescription: "Motos com problemas técnicos",
    setorColorRgb: "#FFA500",
    plate: "ADS5113",
    setorId: "2",
  },
];

const PatioPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        title="Pátio de Motos"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <FlatList
        data={motos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => <MotoCard {...item} />}
      />

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
    padding: 16,
  },
});

export default PatioPage;
