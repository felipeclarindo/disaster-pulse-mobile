// AlertStatisticsPage.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  Platform,
  ToastAndroid,
  Alert as RNAlert,
} from "react-native";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Alert } from "../../model/Alert";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const AlertStatisticsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const API_BASE = "http://192.168.0.2:5272/api/alerts";

  const showToast = (message: string) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      RNAlert.alert("Aviso", message);
    }
  };

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      setAlerts(response.data);
    } catch (error) {
      console.error("Erro ao buscar alertas:", error);
      showToast("Não foi possível carregar os alertas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const countByCriticality = () => {
    const counts: { [key: number]: number } = {};
    alerts.forEach((alert) => {
      counts[alert.criticality] = (counts[alert.criticality] || 0) + 1;
    });
    return counts;
  };

  const countByCountry = () => {
    const counts: { [key: number]: number } = {};
    alerts.forEach((alert) => {
      counts[alert.countryId] = (counts[alert.countryId] || 0) + 1;
    });
    return counts;
  };

  const criticalityCounts = countByCriticality();
  const countryCounts = countByCountry();

  return (
    <View style={styles.container}>
      <Header
        title="Estatísticas dos Alertas"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <ScrollView contentContainerStyle={styles.content}>
        {(() => {
          if (loading) {
            return <ActivityIndicator size="large" color="#fff" />;
          } else if (alerts.length === 0) {
            return (
              <Text style={styles.noAlerts}>Nenhum alerta encontrado.</Text>
            );
          } else {
            return (
              <>
                <Text style={styles.sectionTitle}>Alertas por Criticidade</Text>
                {Object.entries(criticalityCounts).map(([level, count]) => (
                  <Text key={level} style={styles.statText}>
                    Criticidade {level}: {count} alerta(s)
                  </Text>
                ))}

                <Text style={styles.sectionTitle}>Alertas por País (ID)</Text>
                {Object.entries(countryCounts).map(([countryId, count]) => (
                  <Text key={countryId} style={styles.statText}>
                    País {countryId}: {count} alerta(s)
                  </Text>
                ))}
              </>
            );
          }
        })()}
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  content: { padding: 16 },
  noAlerts: { color: "#fff", textAlign: "center", marginTop: 20 },
  sectionTitle: {
    color: "#FC7032",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  statText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 6,
  },
});

export default AlertStatisticsPage;
