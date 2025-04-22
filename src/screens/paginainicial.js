import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, StatusBar } from "react-native";

// Simulando dados do usuário (você pode pegar esses dados da API ou do estado global depois)
const usuarioMock = {
    nome: "Kauã",
    email: "kaua@email.com",
    telefone: "(11) 91234-5678"
};

export default function paginaPrincipal({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const primeiraLetra = usuarioMock.nome.charAt(0).toUpperCase();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.profileCircle}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.profileLetter}>{primeiraLetra}</Text>
                </TouchableOpacity>
            </View>

            {/* Modal com info do usuário */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{usuarioMock.nome}</Text>
                        <Text style={styles.modalText}>{usuarioMock.email}</Text>
                        <Text style={styles.modalText}>{usuarioMock.telefone}</Text>

                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("editarPerfil");
                            }}
                        >
                            <Text style={styles.editButtonText}>Editar Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d1117",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: "#161b22",
        borderBottomWidth: 1,
        borderBottomColor: "#2f333a",
    },
    profileCircle: {
        backgroundColor: "#1da1f2",
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    profileLetter: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#161b22",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: "#c9d1d9",
        marginBottom: 5,
    },
    editButton: {
        marginTop: 20,
        backgroundColor: "#1da1f2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    editButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    closeText: {
        color: "#8b949e",
        marginTop: 15,
        fontSize: 14,
    },
});
