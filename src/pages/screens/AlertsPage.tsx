import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert as RNAlert,
  ActivityIndicator,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { AlertsScreenNavigationProp } from "../../types/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Alert } from "../../model/Alert";

const AlertsPage = () => {
  const navigation = useNavigation<AlertsScreenNavigationProp>();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<Alert>>({
    id: undefined,
    topic: "",
    description: "",
    countryId: 1,
    criticality: 0,
  });

  const API_BASE = "http://localhost:5272/api/alerts";

  const fetchAlerts = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setAlerts(data);
    } catch (err) {
      console.error("Erro ao buscar alertas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async () => {
    if (
      !form.topic ||
      !form.description ||
      !form.countryId ||
      !form.criticality
    ) {
      RNAlert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const method = isEditing && form.id ? "PUT" : "POST";
      const url = isEditing && form.id ? `${API_BASE}/${form.id}` : API_BASE;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setModalVisible(false);
      fetchAlerts();
    } catch (err) {
      console.error("Erro ao salvar alerta:", err);
    }
  };

  const handleDelete = async (id: number) => {
    RNAlert.alert("Confirmar exclusão", "Deseja excluir este alerta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          const deleteAlert = async () => {
            try {
              await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
              fetchAlerts();
            } catch (err) {
              console.error("Erro ao excluir alerta:", err);
            }
          };
          deleteAlert();
        },
      },
    ]);
  };

  const openModalToCreate = () => {
    setIsEditing(false);
    setForm({ topic: "", description: "", countryId: 1, criticality: 1 });
    setModalVisible(true);
  };

  const openModalToEdit = (alert: Alert) => {
    setIsEditing(true);
    setForm(alert);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title="Alertas"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <TouchableOpacity style={styles.createButton} onPress={openModalToCreate}>
        <Text style={styles.createButtonText}>+ Criar Alerta</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.alertItem}>
              <Text style={styles.alertTitle}>{item.topic}</Text>
              <Text style={styles.alertDescription}>{item.description}</Text>
              <Text style={styles.alertDescription}>
                Criticidade: {item.criticality}
              </Text>
              <Text style={styles.alertDescription}>
                País ID: {item.countryId}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => openModalToEdit(item)}>
                  <Text style={styles.edit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Text style={styles.delete}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Editar Alerta" : "Novo Alerta"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor="#ccc"
              value={form.topic}
              onChangeText={(text) => setForm({ ...form, topic: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor="#ccc"
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="ID do País"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={form.countryId?.toString()}
              onChangeText={(text) =>
                setForm({ ...form, countryId: parseInt(text) || 1 })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Criticidade"
              placeholderTextColor="#ccc"
              keyboardType="numeric"
              value={form.criticality?.toString()}
              onChangeText={(text) =>
                setForm({ ...form, criticality: parseInt(text) || 1 })
              }
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleCreateOrUpdate}
            >
              <Text style={styles.saveButtonText}>
                {isEditing ? "Salvar Alterações" : "Criar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  createButton: {
    backgroundColor: "#FC7032",
    padding: 10,
    margin: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  list: {
    padding: 10,
  },
  alertItem: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  alertTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  alertDescription: {
    color: "#ccc",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  edit: {
    color: "#4CAF50",
  },
  delete: {
    color: "#E53935",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#2c2c2c",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#444",
    color: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    color: "#E0E0E0",
    marginTop: 10,
    textAlign: "center",
  },
});

export default AlertsPage;
