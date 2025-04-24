// Paginainicial.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useIsFocused } from "@react-navigation/native";

export function Paginainicial({ navigation, route }) {
  const { usuarioMock } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);
  const isFocused = useIsFocused();

  const primeiraLetra = usuarioMock.nome.charAt(0).toUpperCase();

  useEffect(() => {
    if (isFocused) {
      // Verifica se há novas mensagens simuladas em AsyncStorage
      verificarNotificacoes();
    }
  }, [isFocused]);

  const verificarNotificacoes = async () => {
    try {
      const novasMensagensChatGeral = await AsyncStorage.getItem("mensagensChatGeral");
      const mensagens = JSON.parse(novasMensagensChatGeral) || [];
      const novas = mensagens.filter((msg) => msg.destinatario === "geral");

      if (novas.length > 0) {
        const notificacoesGeradas = novas.map((msg, index) => ({
          id: `${index}-${Date.now()}`,
          titulo: `Nova mensagem de ${msg.remetente}`,
          mensagem: msg.texto,
        }));
        setNotificacoes(notificacoesGeradas);
      }
    } catch (err) {
      console.error("Erro ao verificar notificações:", err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => setNotificationVisible(true)}
        >
          <Icon name="envelope" size={22} color="#c9d1d9" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileCircle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.profileLetter}>{primeiraLetra}</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Perfil */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{usuarioMock.nome}</Text>
            <Text style={styles.modalText}>{usuarioMock.email}</Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("EditarPerfil", { usuarioMock });
              }}
            >
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("login");
              }}
            >
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Notificações */}
      <Modal
        transparent
        visible={notificationVisible}
        animationType="slide"
        onRequestClose={() => setNotificationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: "70%" }]}>
            <Text style={styles.modalTitle}>Notificações</Text>

            {notificacoes.length === 0 ? (
              <Text style={{ color: "#8b949e", textAlign: "center" }}>
                Nenhuma notificação ainda.
              </Text>
            ) : (
              <FlatList
                data={notificacoes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: "#fff" }}>{item.titulo}</Text>
                    <Text style={{ color: "#8b949e", fontSize: 12 }}>
                      {item.mensagem}
                    </Text>
                  </View>
                )}
              />
            )}

            <TouchableOpacity onPress={() => setNotificationVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("chate")}>
        <Text style={styles.buttonText}>Chat Geral</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#161b22",
    borderBottomWidth: 1,
    borderBottomColor: "#2f333a",
  },
  notificationIcon: {
    marginRight: 15,
  },
  profileCircle: {
    backgroundColor: "#1da1f2",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profileLetter: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#161b22",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#c9d1d9",
    marginBottom: 5,
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#1da1f2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: "#ff5555",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeText: {
    color: "#8b949e",
    marginTop: 15,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1da1f2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    width: "80%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Paginainicial;