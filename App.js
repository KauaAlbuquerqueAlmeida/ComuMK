import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Paginainicial from "./src/screens/paginainicial";
import perfil from "./src/screens/perfil";
import EditarPerfil from "./src/screens/editarPerfil";
import login from "./src/screens/login";
import cadastro from "./src/screens/cadastro";





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName="login">
       <Stack.Screen name="login " component={login} />
        <Stack.Screen name="Paginainicial" component={Paginainicial} />
        <Stack.Screen name="cadastro" component={cadastro} />
        <Stack.Screen name="perfil" component={perfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}