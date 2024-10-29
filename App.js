import { AccessibilityProvider } from './src/context/AccessibilityContext/'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SistemaSolar from './src/pages/SistemaSolar'
import { NavigationContainer } from '@react-navigation/native';
import Planeta from './src/pages/Planeta'
import Home from './src/pages/Home';
import Constelacoes from './src/pages/Constelacoes';
import Index from './src/pages/Index';
import Login from './src/pages/Login';
import Cadastro from './src/pages/Cadastro';
import DetalhesConstelacao from './src/pages/Constelacao';
import Constelacao from './src/pages/Constelacao';
import Perfil from './src/pages/Perfil/'; 
import Trilha from './src/pages/Trilha/';
import Quiz from './src/pages/Quiz/';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <AccessibilityProvider>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen name="Index" options={{ headerShown: false }} component={Index} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
          <Stack.Screen name="Cadastro" options={{ headerShown: false }} component={Cadastro} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="Constelacoes" options={{ headerShown: false }} component={Constelacoes} />
          <Stack.Screen name="Constelacao" options={{ headerShown: false }} component={Constelacao} />
          <Stack.Screen name="SistemaSolar" options={{ headerShown: false }} component={SistemaSolar} />
          <Stack.Screen name="Planeta" options={{ headerShown: false }} component={Planeta} />
          <Stack.Screen name="Trilha" options={{ headerShown: false }} component={Trilha} />
          <Stack.Screen name="Quiz" options={{ headerShown: false }} component={Quiz} />
          <Stack.Screen name="Perfil" options={{ headerShown: false }} component={Perfil} />
        </Stack.Navigator>
      </AccessibilityProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
