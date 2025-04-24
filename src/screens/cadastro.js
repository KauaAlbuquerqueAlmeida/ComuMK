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
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  const criarConta = async () => {
    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Adiciona usuário ao Firestore
      await addDoc(collection(db, 'usuarios'), {
        uid: user.uid,
        nome: nome,
        email: user.email,
      });

      alert('Conta criada com sucesso!');
      navigation.navigate('login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao criar conta. Verifique os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/comumk.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#ccc"
        onChangeText={setSenha}
        secureTextEntry={true}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#ccc"
        onChangeText={setNome}
        autoCapitalize="words"
      />

      <TouchableOpacity style={styles.button} onPress={criarConta}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.loginText}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#89CFF0',
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
  },
  loginText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Cadastro;
