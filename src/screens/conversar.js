import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons'; // use isso no expo ou instale via npm
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
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Conversas</Text>
      </View>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.usuario}
            onPress={() => navigation.navigate('ConversaInd', { usuario: item })}
          >
            <View style={styles.avatarFake}>
              <Text style={styles.avatarLetra}>{item.nome?.charAt(0).toUpperCase()}</Text>
            </View>
            <Text style={styles.nome}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  usuario: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 12,
    elevation: 2, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  nome: {
    color: '#fff',
    fontSize: 17,
    marginLeft: 12,
  },
  avatarFake: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#89CFF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetra: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ListaUsuarios;
