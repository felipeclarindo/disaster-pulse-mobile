import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../../types/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#121212",
  backgroundGradientTo: "#121212",
  color: (opacity = 1) => `rgba(252, 112, 50, ${opacity})`,
  labelColor: () => "#C7D6B9",
  barPercentage: 0.6,
  decimalPlaces: 0,
};

const alertData = [
  { id: "1", title: "Chuva intensa em São Paulo", date: "06/06/2025" },
  { id: "2", title: "Alerta de deslizamento - RJ", date: "05/06/2025" },
  { id: "3", title: "Risco de enchente - Recife", date: "04/06/2025" },
];

const HomePage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const chartData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    datasets: [
      {
        data: [4, 2, 5, 3, 6, 1, 3],
      },
    ],
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <>
          <Header
            title="Dashboard de Alertas"
            onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />

          <View style={styles.cardContainer}>
            <Text style={styles.title}>Relatório</Text>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Total de Alertas Enviados</Text>
              <Text style={styles.cardValue}>24</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Predição Atual</Text>
              <Text style={styles.cardValue}>
                Risco de enchente nas próximas 6h
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Alertas por Dia (últimos 7 dias)
          </Text>
          <BarChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=""
          />

          <Text style={styles.sectionTitle}>Alertas Recentes</Text>
        </>
      }
      data={alertData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.alertItem}>
          <Text style={styles.alertTitle}>{item.title}</Text>
          <Text style={styles.alertDate}>{item.date}</Text>
        </View>
      )}
      ListFooterComponent={<Footer />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FC7032",
    marginTop: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FC7032",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1F1F1F",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: "#C7D6B9",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  chart: {
    borderRadius: 10,
  },
  alertItem: {
    backgroundColor: "#1E1E1E",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#FC7032",
  },
  alertTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  alertDate: {
    color: "#C7D6B9",
    fontSize: 12,
    marginTop: 4,
  },
});

export default HomePage;
