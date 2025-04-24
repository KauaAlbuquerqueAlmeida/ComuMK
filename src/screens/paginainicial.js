import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, StatusBar } from "react-native";

export function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const handleCadastro = () => {
    const usuarioMock = {
      nome,
      email,
    };
    navigation.navigate("PaginaPrincipal", { usuarioMock });
  };

  return (
    <View style={stylesCadastro.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <Text style={stylesCadastro.title}>Cadastro</Text>

      <TextInput
        style={stylesCadastro.input}
        placeholder="Nome"
        placeholderTextColor="#8b949e"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={stylesCadastro.input}
        placeholder="Email"
        placeholderTextColor="#8b949e"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={stylesCadastro.button} onPress={handleCadastro}>
        <Text style={stylesCadastro.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Paginainicial({ navigation, route }) {
  const { usuarioMock } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const primeiraLetra = usuarioMock.nome.charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.profileCircle} onPress={() => setModalVisible(true)}>
          <Text style={styles.profileLetter}>{primeiraLetra}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
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

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("chate")}>
        <Text style={styles.buttonText}>Chate</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Conversar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da tela de Cadastro
const stylesCadastro = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2f333a",
    backgroundColor: "#161b22",
    color: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1da1f2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

// Estilos da Página Principal
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
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
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  secondaryButton: {
    backgroundColor: "#c9d1d9",
  },
  secondaryButtonText: {
    color: "#0d1117",
  },
});

export default Paginainicial;
