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
import app from '../../firebaseConfig';

const Cadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setnome] = useState('');

  const criarConta = () => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, senha, nome)
      .then(() => {
        alert('Conta criada com sucesso!');
        navigation.navigate('login');
      })
      .catch((error) => {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao criar conta. Verifique os dados.');
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/comumk.png')} // ajuste o caminho
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
        placeholder=" nome"
        placeholderTextColor="#ccc"
        onChangeText={setnome}
        secureTextEntry={true}
        autoCapitalize="nome"
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
    backgroundColor: '#89CFF0', // azul pastel
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
