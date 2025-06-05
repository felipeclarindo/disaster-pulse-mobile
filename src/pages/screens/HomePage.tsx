import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImageModal from "../../components/ImageModal";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BarChart } from "react-native-chart-kit";
import Separator from "../../components/ui/Separator";
import { UserProps } from "../../types";
import DashboardCard from "../../components/DashboardCard";
import { HomeScreenNavigationProp } from "../../types/navigation";

const chartConfig = {
  backgroundGradientFrom: "#121212",
  backgroundGradientTo: "#121212",
  color: (opacity = 1) => `rgba(163, 230, 53, ${opacity})`,
  labelColor: () => "#C7D6B9",
  barPercentage: 0.5,
  decimalPlaces: 0,
};

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showRelatorioButtons, setShowRelatorioButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagemSource, setImagemSource] = useState<number | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const loadUser = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem("user");
      if (json) setUser(JSON.parse(json));
    } catch (e) {
      console.error("Erro ao carregar usuário:", e);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const stats = { OK: 5, "Em Manutenção": 3, Pronta: 1 };
  const labels = Object.keys(stats);
  const values = Object.values(stats);

  const showImage = () => {
    setLoading(true);
    setShowRelatorioButtons(false);
    setTimeout(() => {
      setImagemSource(require("../../assets/patio.png"));
      setShowRelatorioButtons(true);
      setLoading(false);
      setModalVisible(true);
    }, 2000);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleRedirectToPatio = () => navigation.navigate("patio");
  const handleRedirectToReport = () => navigation.navigate("report");

  return (
    <View style={styles.container}>
      <Header
        title="Home"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Bem-vindo{user ? `, ${user.user}` : ""}!
        </Text>

        <Text style={styles.subtitle}>Dashboard de Mapeamento</Text>

        <BarChart
          data={{ labels, datasets: [{ data: values }] }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          yAxisLabel=""
          yAxisSuffix=""
        />

        <Separator />

        <DashboardCard stats={stats} />

        <Text style={styles.subtitle}>
          Acompanhe as motos no pátio e gere relatórios em tempo real.
        </Text>

        <Pressable
          onPress={showImage}
          disabled={loading}
          style={({ pressed }) => [
            styles.mainButton,
            pressed && { opacity: 0.8 },
            loading && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.mainButtonText}>
            Mostrar Imagem e Gerar Relatório
          </Text>
        </Pressable>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#54C65B" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}

        {imagemSource !== null && (
          <ImageModal
            visible={modalVisible}
            onClose={handleCloseModal}
            imageSource={imagemSource}
          />
        )}

        {showRelatorioButtons && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRedirectToReport}
            >
              <Text style={styles.buttonText}>Ver Relatório</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleRedirectToPatio}
            >
              <Text style={styles.buttonText}>Ir para o Pátio</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#54C65B",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#54C65B",
    marginTop: 16,
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
  mainButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    elevation: 5,
  },
  mainButtonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "700",
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#54C65B",
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "#DFF0D8",
    fontSize: 14,
    fontWeight: "700",
  },
  logoutButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default HomePage;
