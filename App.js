import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Paginainicial from "./src/screens/paginainicial";
import Perfil from "./src/screens/perfil";
import EditarPerfil from "./src/screens/editarPerfil";
import Login from "./src/screens/login";
import Cadastro from "./src/screens/cadastro";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Paginainicial">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Paginainicial" component={Paginainicial} />
        <Stack.Screen name="cadastro" component={Cadastro} />
        <Stack.Screen name="perfil" component={Perfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
