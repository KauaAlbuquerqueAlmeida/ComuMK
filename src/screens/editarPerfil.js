import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import app from "../../firebaseConfig";

export default function EditarPerfil({ navigation, route }) {
  const { usuarioMock } = route.params;

  const [nome, setNome] = useState(usuarioMock.nome || "");
  const [email, setEmail] = useState(usuarioMock.email || "");
  const [senha, setSenha] = useState("");

  const salvarAlteracoes = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;

    try {
      if (user) {
        if (email) await updateEmail(user, email);
        if (senha) await updatePassword(user, senha);

        const usuarioRef = doc(db, "usuarios", user.uid);
        await updateDoc(usuarioRef, {
          nome,
          email,
        });

        alert("Perfil atualizado com sucesso!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />
      <Text style={styles.title}>Editar Perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8b949e"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nova senha (opcional)"
        placeholderTextColor="#8b949e"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={salvarAlteracoes}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#c9d1d9",
  },
  cancelButtonText: {
    color: "#0d1117",
  },
});
