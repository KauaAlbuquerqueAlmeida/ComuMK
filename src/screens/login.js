import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';

const realizarLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const tentarLogar = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                navigation.navigate('paginaPrincipal');
                alert('Login realizado com sucesso!');
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={setSenha}
                secureTextEntry={true}
                autoCapitalize='none'
            />

            <TouchableOpacity styles={styles.button} onPress={tentarLogar}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 150,
        width: 150,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default realizarLogin;
