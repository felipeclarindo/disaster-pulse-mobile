// AlertDetailsPage.tsx

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AlertsScreenNavigationProp } from "../../types/navigation";

type AlertDetail = {
  id: number;
  timestamp: string;
  message: string;
};

type AlertMock = {
  id: number;
  topic: string;
  description: string;
  criticality: number;
  countryId: number;
  history: AlertDetail[];
};

const mockAlert: AlertMock = {
  id: 1,
  topic: "Fogo na Floresta Amazônica",
  description: "Alerta de fogo detectado em área de floresta na região Norte.",
  criticality: 5,
  countryId: 55,
  history: [
    { id: 1, timestamp: "2025-06-01 10:23", message: "Alerta criado" },
    {
      id: 2,
      timestamp: "2025-06-02 08:10",
      message: "Equipe de resgate acionada",
    },
    {
      id: 3,
      timestamp: "2025-06-03 14:45",
      message: "Fogo controlado parcialmente",
    },
  ],
};

const AlertDetailsPage = () => {
  const navigation = useNavigation<AlertsScreenNavigationProp>();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<AlertDetail | null>(
    null
  );

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
        ) : (
          <>
            <View style={styles.alertInfo}>
              <Text style={styles.alertTitle}>{mockAlert.topic}</Text>
              <Text style={styles.alertDescription}>
                {mockAlert.description}
              </Text>
              <Text style={styles.alertDescription}>
                Criticidade: {mockAlert.criticality}
              </Text>
              <Text style={styles.alertDescription}>
                País ID: {mockAlert.countryId}
              </Text>
            </View>

            <Text style={styles.historyTitle}>Histórico do Alerta</Text>

            <FlatList
              data={mockAlert.history}
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
