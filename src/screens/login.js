// Kauã e Miguel Borges
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const tentarLogar = () => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        const usuarioMock = {
          nome: user.displayName || "Usuário",
          email: user.email,
          telefone: user.phoneNumber || "Não informado",
          uid: user.uid,
        };

        alert('Login realizado com sucesso!');
        setEmail("");
        setSenha("");
        navigation.navigate('Paginainicial', { usuarioMock });
      })
      .catch((error) => {
        console.error('Login falho:', error);
        alert('Email ou senha incorretos.');
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/comumk.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        onChangeText={setSenha}
        secureTextEntry={true}
        autoCapitalize="none"
        value={senha}
      />

      <TouchableOpacity style={styles.button} onPress={tentarLogar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cadastroButton}
        onPress={() => navigation.navigate('cadastro')}
      >
        <Text style={styles.cadastroText}>Criar uma conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  logo: { height: 120, width: 120, marginBottom: 30 },
  title: { fontSize: 24, color: '#fff', marginBottom: 20, fontWeight: 'bold' },
  input: { width: '100%', height: 48, backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 12, paddingHorizontal: 15, marginBottom: 16, borderWidth: 1, borderColor: '#444' },
  button: { width: '100%', backgroundColor: '#4CAF50', padding: 14, borderRadius: 12, marginTop: 10 },
  buttonText: { color: '#000', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  cadastroButton: { width: '100%', backgroundColor: '#89CFF0', padding: 14, borderRadius: 12, marginTop: 12 },
  cadastroText: { color: '#000', fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
});

export default Login;
