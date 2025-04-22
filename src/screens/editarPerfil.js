import React from 'react';
import { View, Text} from 'react-native';

export default function Sobre({ navigation }) {
    return (
       
            <View style={styles.overlay}>
                <Text style={styles.title}>Real Madrid</Text>
                <Text style={styles.description}>
                    O Real Madrid é um dos clubes de futebol mais vitoriosos do mundo, 
                    com uma história repleta de conquistas e jogadores lendários. 
                    Fundado em 1902, o clube espanhol é reconhecido por sua 
                    supremacia no futebol europeu, ostentando múltiplos títulos da 
                    Liga dos Campeões da UEFA e La Liga. Seu estádio, o Santiago Bernabéu, 
                    é um verdadeiro templo do futebol. O Real Madrid é sinônimo de 
                    excelência, tradição e paixão pelo esporte.
                </Text>
            </View>
    );
}