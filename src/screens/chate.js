import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  where,
  onSnapshot
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

const ChatScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [usuarioEmail, setUsuarioEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) setUsuarioEmail(user.email);

    const q = query(collection(db, 'chat'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const mensagensArray = [];
      querySnapshot.forEach(doc => {
        mensagensArray.push({ id: doc.id, ...doc.data() });
      });
      setMensagens(mensagensArray);
    });

    return () => unsubscribe();
  }, []);

  const enviarMensagem = async () => {
    const user = auth.currentUser;
    if (!user || mensagem.trim() === '') return;

    let nomeUsuario = 'Usuário';

    try {
      const q = query(collection(db, 'usuarios'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        nomeUsuario = doc.data().nome;
      });
    } catch (error) {
      console.error("Erro ao buscar nome do usuário:", error);
    }

    await addDoc(collection(db, 'chat'), {
      texto: mensagem,
      autor: nomeUsuario,
      email: user.email,
      timestamp: serverTimestamp(),
    });

    setMensagem('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <FlatList
        data={mensagens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isUser = item.email === usuarioEmail;
          return (
            <View style={[styles.mensagemContainer, isUser ? styles.mensagemUsuario : styles.mensagemOutro]}>
              <Text style={styles.autor}>{item.autor}</Text>
              <Text style={styles.texto}>{item.texto}</Text>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Escreva uma mensagem..."
          placeholderTextColor="#ccc"
          style={styles.input}
        />
        <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
          <Text style={styles.botaoTexto}>ENVIAR</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 10,
  },
  mensagemContainer: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: '75%',
  },
  mensagemUsuario: {
    backgroundColor: '#0B93F6',
    alignSelf: 'flex-end',
  },
  mensagemOutro: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  autor: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  texto: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8,
  },
  botaoEnviar: {
    backgroundColor: '#0B93F6',
    borderRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;

