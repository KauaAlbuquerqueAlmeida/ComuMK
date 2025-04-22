import React from "react";
import { View, Button, StyleSheet, Pressable, Text, TouchableOpacity } from "react-native";

export default function paginaPrincipal({ navigation }) {
    return (
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("login")}>
                    <Text style={styles.buttonText}>login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("editarPerfil")}> 
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("perfil")}> 
                    <Text style={styles.buttonText}>perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("cadastro")}> 
                    <Text style={styles.buttonText}>cadastro</Text>
                </TouchableOpacity>

            </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
    },
    button: {
        backgroundColor: "#575ff0",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginVertical: 10,
        width: '80%',
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
});