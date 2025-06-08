import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  DrawerActions,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AlertsScreenNavigationProp } from "../../types/navigation";

// Constante para a URL base da API
const API_BASE = "http://192.168.0.2:5272/api/alerts";

type AlertDetail = {
  id: number;
  timestamp: string;
  message: string;
};

type AlertData = {
  id: number;
  topic: string;
  description: string;
  criticality: number;
  countryId: number;
  history: AlertDetail[];
};

const AlertDetailsPage = () => {
  const navigation = useNavigation<AlertsScreenNavigationProp>();
  const route =
    useRoute<RouteProp<{ params: { alertId: number } }, "params">>();
  const { alertId } = route.params;

  const [alert, setAlert] = useState<AlertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<AlertDetail | null>(
    null
  );

  const fetchAlertDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/${alertId}`);
      setAlert(response.data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados do alerta.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertDetails();
  }, []);

  const openModal = (history: AlertDetail) => {
    setSelectedHistory(history);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Detalhes do Alerta"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : alert ? (
          <>
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>{alert.topic}</Text>
              <Text style={styles.alertDescription}>{alert.description}</Text>
              <Text style={styles.alertDescription}>
                Criticidade: {alert.criticality}
              </Text>
              <Text style={styles.alertDescription}>
                País ID: {alert.countryId}
              </Text>
            </View>

            <Text style={styles.historyTitle}>Histórico do Alerta</Text>

            <FlatList
              data={alert.history}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.historyItem}
                  onPress={() => openModal(item)}
                >
                  <Text style={styles.historyTimestamp}>{item.timestamp}</Text>
                  <Text style={styles.historyMessage} numberOfLines={1}>
                    {item.message}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
            />

            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                  <Text style={styles.modalTitle}>Detalhes do Histórico</Text>
                  <Text style={styles.modalText}>
                    {selectedHistory?.timestamp}
                  </Text>
                  <Text style={styles.modalText}>
                    {selectedHistory?.message}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Text style={{ color: "#fff" }}>Alerta não encontrado.</Text>
        )}
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
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  alertInfo: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  alertTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  alertDescription: {
    color: "#ccc",
    marginTop: 6,
  },
  historyTitle: {
    color: "#FC7032",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  historyItem: {
    backgroundColor: "#2c2c2c",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyTimestamp: {
    color: "#bbb",
    fontSize: 14,
  },
  historyMessage: {
    color: "#eee",
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#2c2c2c",
    width: "85%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    color: "#FC7032",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    color: "#eee",
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#FC7032",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AlertDetailsPage;
