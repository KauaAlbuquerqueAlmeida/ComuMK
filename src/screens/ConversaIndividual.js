import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import app from '../../firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

const ConversaIndividual = ({ route, navigation }) => {
  const { usuario } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const user = auth.currentUser;

  const conversaId =
    user.email < usuario.email
      ? `${user.email}_${usuario.email}`
      : `${usuario.email}_${user.email}`;

  useEffect(() => {
    const q = query(
      collection(db, 'conversas', conversaId, 'mensagens'),
      orderBy('timestamp', 'asc')
    );

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
    if (mensagem.trim() === '') return;

    await addDoc(collection(db, 'conversas', conversaId, 'mensagens'), {
      texto: mensagem,
      autor: user.email,
      destinatario: usuario.email,
      timestamp: serverTimestamp(),
    });

    setMensagem('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{usuario.nome}</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <FlatList
          data={mensagens}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const isUser = item.autor === user.email;
            return (
              <View
                style={[
                  styles.mensagemContainer,
                  isUser ? styles.mensagemUsuario : styles.mensagemOutro,
                ]}
              >
                <Text style={styles.texto}>{item.texto}</Text>
              </View>
            );
          }}
          contentContainerStyle={{ padding: 10, paddingBottom: 80 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            value={mensagem}
            onChangeText={setMensagem}
            placeholder="Mensagem..."
            placeholderTextColor="#ccc"
            style={styles.input}
          />
          <TouchableOpacity style={styles.botaoEnviar} onPress={enviarMensagem}>
            <Text style={styles.botaoTexto}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mensagemContainer: {
    maxWidth: '75%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 4,
  },
  mensagemUsuario: {
    backgroundColor: '#0B93F6',
    alignSelf: 'flex-end',
  },
  mensagemOutro: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  texto: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#333',
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 8,
  },
  botaoEnviar: {
    backgroundColor: '#0B93F6',
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConversaIndividual;
