import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

 import SistemaSolar from './src/pages/SistemaSolar/'
 import { NavigationContainer } from '@react-navigation/native';
 import InformationPlaneta from './src/pages/InformationPlaneta/'
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SistemaSolar">
      <Stack.Screen name="SistemaSolar"options={{ headerShown: false }} component={SistemaSolar} />
      <Stack.Screen name="InformationPlaneta"  component={InformationPlaneta} />
    </Stack.Navigator>
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
