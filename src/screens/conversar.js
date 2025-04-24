// ListaUsuarios.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../firebaseConfig';

const db = getFirestore(app);
const auth = getAuth(app);

const ListaUsuarios = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      const userAtual = auth.currentUser;
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const lista = [];
      querySnapshot.forEach(doc => {
        if (doc.data().email !== userAtual.email) {
          lista.push({ id: doc.id, ...doc.data() });
        }
      });
      setUsuarios(lista);
    };

    fetchUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.usuario}
            onPress={() => navigation.navigate('ConversaIndividual', { usuario: item })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  usuario: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  nome: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ListaUsuarios;
