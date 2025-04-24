// Kauã e Miguel Borges
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Paginainicial from "./src/screens/paginainicial";
import Perfil from "./src/screens/perfil";
import EditarPerfil from "./src/screens/editarPerfil";
import Login from "./src/screens/login";
import Cadastro from "./src/screens/cadastro";
import SplashScreen from "./src/screens/SplashScreen";
import chate from "./src/screens/chate";
import conversar from "./src/screens/conversar";
import ConversaInd from "./src/screens/ConversaIndividual";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="ConversaInd" component={ConversaInd } />
            <Stack.Screen name="conversar" component={conversar} />
            <Stack.Screen name="chate" component={chate} />
            <Stack.Screen name="Paginainicial" component={Paginainicial} />
            <Stack.Screen name="cadastro" component={Cadastro} />
            <Stack.Screen name="perfil" component={Perfil} />
            <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
