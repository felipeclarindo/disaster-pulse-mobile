import React, { useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const ImageModal = ({ visible, onClose, imageSource }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não foi possível acessar a galeria.");
        setDownloading(false);
        return;
      }
      let uri: string | undefined;
      if (typeof imageSource === "number") {
        uri = Image.resolveAssetSource(imageSource).uri;
      } else if (Array.isArray(imageSource)) {
        uri = imageSource[0]?.uri;
      } else {
        uri = imageSource?.uri;
      }
      if (!uri) {
        Alert.alert("Erro", "URI da imagem não encontrada.");
        setDownloading(false);
        return;
      }
      const fileUri = FileSystem.cacheDirectory + uri.split("/").pop();
      await FileSystem.downloadAsync(uri, fileUri);
      await MediaLibrary.saveToLibraryAsync(fileUri);
      Alert.alert("Sucesso", "Imagem salva na galeria!");
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível salvar a imagem.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {imageSource ? (
            <>
              <Image
                source={imageSource}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <ActivityIndicator color="#121212" />
                ) : (
                  <Text style={styles.downloadButtonText}>Baixar Imagem</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.errorText}>Imagem não disponível</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#121212",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    maxWidth: 500,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#54C65B",
  },
  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  downloadButton: {
    backgroundColor: "#54C65B",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: "#121212",
    fontWeight: "700",
  },
  errorText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default ImageModal;
