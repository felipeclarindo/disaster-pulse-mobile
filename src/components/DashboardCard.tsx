import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { DashboardCardProps } from "../types";

const DashboardCard = ({ stats }: DashboardCardProps) => (
  <View style={styles.dashboard}>
    {Object.entries(stats).map(([key, value]) => (
      <View key={key} style={styles.statCard}>
        <Text style={styles.statNumber}>{value}</Text>
        <Text style={styles.statLabel}>{key}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    width: Dimensions.get("window").width / 3 - 18,
    backgroundColor: "#2A2A2A",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FC7032",
  },
  statLabel: {
    fontSize: 14,
    color: "#C7D6B9",
    marginTop: 4,
    textAlign: "center",
  },
});

export default DashboardCard;
