import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { generateCompleteReport } from "../../utils";

const ReportPage = () => {
  const relatorioCompleto = generateCompleteReport();
  const navigation = useNavigation();

  const shareReport = async () => {
    try {
      const fileUri = `${FileSystem.cacheDirectory}relatorio_completo.txt`;
      await FileSystem.writeAsStringAsync(fileUri, relatorioCompleto, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(fileUri, {
        mimeType: "text/plain",
        dialogTitle: "Compartilhar Relatório Completo",
      });
    } catch (error: any) {
      Alert.alert(
        "Erro",
        `Não foi possível compartilhar o arquivo: ${error.message}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Relatório"
        onMenuPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Relatório Completo do Pátio</Text>
        <View style={styles.card}>
          <Text style={styles.relatorioTexto}>{relatorioCompleto}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={shareReport}>
          <Text style={styles.buttonText}>Compartilhar Relatório</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#54C65B",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#1F1F1F",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#3A6E33",
  },
  relatorioTexto: {
    fontSize: 14,
    color: "#C7D6B9",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ReportPage;
