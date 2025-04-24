import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';
// import * as ImagePicker from 'react-native-image-picker';

export default function EditarPerfil({ navigation, route }) {
    const { usuario } = route.params;

    const [nome, setNome] = useState(usuario.nome);
    const [email, setEmail] = useState(usuario.email);
    const [senha, setSenha] = useState(''); 

    const salvarAlteracoes = async () => {
        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        try {
            if (user) {
                await updateEmail(user, email);
                if (senha) await updatePassword(user, senha);

                const usuarioRef = doc(db, 'usuarios', user.uid);
                await updateDoc(usuarioRef, {
                    nome: nome,
                    email: email,
                });

                alert('Perfil atualizado com sucesso!');
                navigation.goBack();
            }
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            alert('Erro ao atualizar perfil. Tente novamente.');
        }
    };

    // Função para escolher a imagem
    const escolherImagem = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (!response.didCancel && !response.error) {
                setFoto(response.assets[0].uri);
            }
        });
    };

    return (
        <ImageBackground
            // source={require('../assets/download.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.titulo}>Editar Perfil</Text>

                <TouchableOpacity onPress={escolherImagem} style={styles.fotoContainer}>
                    <Image
                        // source={foto ? { uri: foto } : require('../assets/download.png')}
                        style={styles.foto}
                    />
                    <Text style={styles.textoFoto}>Alterar Foto</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.input}
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Senha"
                    secureTextEntry
                    placeholderTextColor="#666"
                />

                <TouchableOpacity style={styles.botao} onPress={() => alert('Perfil atualizado!')}>
                    <Text style={styles.botaoTexto}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.botao, styles.botaoVoltar]} onPress={() => navigation.goBack()}>
                    <Text style={[styles.botaoTexto, { color: '#333' }]}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25,
    },
    fotoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    foto: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: '#fff',
    },
    textoFoto: {
        marginTop: 8,
        color: '#1da1f2',
        textDecorationLine: 'underline',
    },
    input: {
        width: '90%',
        padding: 12,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    botao: {
        width: '90%',
        padding: 14,
        borderRadius: 10,
        backgroundColor: '#1da1f2',
        alignItems: 'center',
        marginTop: 10,
    },
    botaoVoltar: {
        backgroundColor: '#e1e1e1',
    },
    botaoTexto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});