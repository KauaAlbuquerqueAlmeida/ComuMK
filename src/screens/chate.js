import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, getDocs, where, onSnapshot } from 'firebase/firestore';  // Adicionando onSnapshot corretamente
import { getAuth } from 'firebase/auth';
import app from '../../firebaseConfig';

const auth = getAuth(app);
const db = getFirestore(app);

const ChatScreen = () => {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);

  useEffect(() => {
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

    // Busca o nome baseado no e-mail do usuário
    try {
      const q = query(collection(db, 'usuarios'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        nomeUsuario = doc.data().nome;
      });
    } catch (error) {
      console.error("Erro ao buscar nome do usuário:", error);
    }

    // Envia a mensagem com o nome do usuário logado
    await addDoc(collection(db, 'chat'), {
      texto: mensagem,
      autor: nomeUsuario,
      email: user.email,
      timestamp: serverTimestamp(),
    });

    setMensagem('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mensagens}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.autor}>{item.autor}</Text>
            <Text>{item.texto}</Text>
          </View>
        )}
      />
      <TextInput
        value={mensagem}
        onChangeText={setMensagem}
        placeholder="Escreva uma mensagem..."
        style={styles.input}
        placeholderTextColor="#999"
      />
      <Button title="Enviar" onPress={enviarMensagem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  card: { padding: 15, marginVertical: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 1 },
  autor: { fontWeight: 'bold', marginBottom: 5 },
});

export default ChatScreen;
