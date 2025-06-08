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
  ToastAndroid,
  Platform,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { AlertsScreenNavigationProp } from "../../types/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Alert } from "../../model/Alert"; // Your Alert model definition
import axios from "axios";

const AlertsPage = () => {
  const navigation = useNavigation<AlertsScreenNavigationProp>();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    topic: "",
    description: "",
    countryId: 0,
    criticality: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

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
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Detalhes do erro do backend (fetch):",
          error.response.data
        );
      }
      RNAlert.alert("Erro", "Não foi possível carregar os alertas.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (
      !form.topic.trim() ||
      !form.description.trim() ||
      !form.countryId ||
      form.criticality < 1 ||
      form.criticality > 5
    ) {
      RNAlert.alert("Erro", "Preencha todos os campos corretamente.");
      return false;
    }
    return true;
  };

  const handleCreateOrUpdate = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      if (isEditing && editingId) {
        await axios.put(`${API_BASE}/${editingId}`, form);
        showToast("Alerta editado com sucesso!");
      } else {
        const newId =
          alerts.length > 0 ? Math.max(...alerts.map((a) => a.id)) + 1 : 1;
        setAlerts((prev) => [...prev, { id: newId, ...form }]);
        showToast("Alerta criado com sucesso!");
      }
      setModalVisible(false);
      setSaving(false);
    } catch (error) {
      setSaving(false);
      RNAlert.alert("Erro", "Não foi possível salvar o alerta.");
    }
  };

  const handleDelete = (id: number) => {
    RNAlert.alert("Confirmar exclusão", "Deseja excluir este alerta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_BASE}/${id}`);
            fetchAlerts();
            showToast("Alerta excluído com sucesso!");
          } catch (error) {
            console.error("Erro ao excluir alerta:", error);
            let errorMessage = "Não foi possível excluir o alerta.";
            if (axios.isAxiosError(error)) {
              if (error.response) {
                if (
                  typeof error.response.data === "object" &&
                  error.response.data !== null
                ) {
                  errorMessage =
                    error.response.data.message ||
                    JSON.stringify(error.response.data);
                } else {
                  errorMessage = String(error.response.data) || errorMessage;
                }
                console.error(
                  "Detalhes da resposta de erro do backend (excluir):",
                  error.response.data
                );
              } else if (error.request) {
                errorMessage =
                  "Erro de rede ou servidor não respondeu. Verifique sua conexão ou o status do servidor.";
                console.error(
                  "Erro na requisição (sem resposta):",
                  error.request
                );
              } else {
                errorMessage = "Erro interno ao configurar a requisição.";
                console.error(
                  "Erro na configuração da requisição:",
                  error.message
                );
              }
            }
            RNAlert.alert("Erro", errorMessage);
          }
        },
      },
    ]);
  };

  const openModalToCreate = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({ topic: "", description: "", countryId: 0, criticality: 0 });
    setModalVisible(true);
  };

  const openModalToEdit = (alert: Alert) => {
    setIsEditing(true);
    setEditingId(alert.id);
    setForm({
      topic: alert.topic,
      description: alert.description,
      countryId: alert.countryId,
      criticality: alert.criticality,
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Alertas"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={openModalToCreate}
        >
          <Text style={styles.createButtonText}>+ Criar Alerta</Text>
        </TouchableOpacity>

        {(() => {
          if (loading) {
            return (
              <ActivityIndicator
                size="large"
                color="#FC7032"
                style={{ marginTop: 30 }}
              />
            );
          } else if (alerts.length === 0) {
            return (
              <Text style={styles.noAlerts}>Nenhum alerta encontrado.</Text>
            );
          } else {
            return (
              <FlatList
                data={alerts}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
                renderItem={({ item }) => (
                  <View style={styles.alertItem}>
                    <Text style={styles.alertTitle}>{item.topic}</Text>
                    <Text style={styles.alertDescription}>
                      {item.description}
                    </Text>
                    <Text style={styles.alertDescription}>
                      País: {item.countryId}
                    </Text>
                    <Text style={styles.alertDescription}>
                      Criticidade: {item.criticality}
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
            );
          }
        })()}

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
                editable={!saving}
              />
              <TextInput
                style={styles.input}
                placeholder="Descrição"
                placeholderTextColor="#ccc"
                value={form.description}
                onChangeText={(text) => setForm({ ...form, description: text })}
                editable={!saving}
              />
              <TextInput
                style={styles.input}
                placeholder="ID do País"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={form.countryId.toString()}
                onChangeText={(text) =>
                  setForm({ ...form, countryId: parseInt(text) || 0 })
                }
                editable={!saving}
              />
              <TextInput
                style={styles.input}
                placeholder="Criticidade (1 a 5)"
                placeholderTextColor="#ccc"
                keyboardType="numeric"
                value={form.criticality.toString()}
                onChangeText={(text) =>
                  setForm({ ...form, criticality: parseInt(text) || 0 })
                }
                editable={!saving}
              />
              <TouchableOpacity
                style={[styles.saveButton, saving && { opacity: 0.7 }]}
                onPress={handleCreateOrUpdate}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>
                    {isEditing ? "Salvar Alterações" : "Criar"}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => !saving && setModalVisible(false)}
                disabled={saving}
              >
                <Text style={styles.cancelButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 10,
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
  noAlerts: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
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
    justifyContent: "flex-end",
    marginTop: 10,
  },
  edit: {
    color: "#3EB489",
    marginRight: 20,
    fontWeight: "bold",
  },
  delete: {
    color: "#FC7032",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalBox: {
    backgroundColor: "#292929",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#3EB489",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    color: "#FC7032",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AlertsPage;
