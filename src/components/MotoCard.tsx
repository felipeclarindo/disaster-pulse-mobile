import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Moto } from "../types";

interface MotoCardProps extends Moto {}

const MotoCard = ({
  id,
  plate,
  setorDescription,
  setorName,
  setorColorRgb,
  setorId,
}: MotoCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/moto.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{setorName}</Text>
      <Text style={styles.subtitle}>{setorDescription}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Setor ID:</Text>
        <Text style={styles.value}>{setorId}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Cor do Setor:</Text>
        <View
          style={[styles.colorSquare, { backgroundColor: setorColorRgb }]}
        />
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Placa:</Text>
        <Text style={styles.value}>{plate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 12,
    width: "47%",
    marginBottom: 16,
    marginHorizontal: "1.5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 8,
    marginBottom: 12,
  },
  colorSquare: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#54C65B",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#C7D6B9",
    textAlign: "center",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  value: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "500",
  },
});

export default MotoCard;
