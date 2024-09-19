import { View, Text, StyleSheet, Image, ScrollView ,TouchableOpacity} from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  return (

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Olá, seja Bem Vindo</Text>
        
        <TouchableOpacity style={styles.box1}>
          <View style={styles.containerText}> 
            <View>
              <Text style={styles.title}>Quiz</Text>
              <Text style={styles.text}>Participe e descubra curiosidades sobre o espaço</Text>
            </View>
            <Image source={require('../../../assets/home-imagem1.png')}  style={styles.imagem1}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box2} onPress={() => navigation.navigate('SolarSystem')}>
          <View style={styles.containerText}> 
            <View>
              <Text style={styles.title}>Sistema Solar</Text>
              <Text style={styles.text}>Conheças os planetas </Text>
            </View>
            <Image source={require('../../../assets/home-imagem2.png')}  style={styles.imagem2}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box3}>
          <View style={styles.containerText}> 
            <View>
              <Text style={styles.title2}>Historias das Constelações </Text>
              <Text style={styles.text}>Descubras os misterios das constelações</Text>
            </View>
            <Image source={require('../../../assets/home-imagem3.png')}  style={styles.imagem2}/>
          </View>
        </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',  // Fixed typo from 'alingItems'
    padding: 16,
  },
  header: {
    marginTop:40,
    fontSize: 34,  // Optional: Style for the header text
    color: '#0D1A2D',
    marginRight:20,
    fontWeight:'bold',
    marginBottom: 16,
  },
  box1: {
    padding: 20,
    width: '95%',
    borderRadius: 10,
    height: 200,
    backgroundColor: '#70399C',
    marginBottom: 16,  // Added some space between boxes EF065D
  },
  box2: {
    padding: 20,
    width: '95%',
    borderRadius: 10,
    height: 200,
    backgroundColor: '#0D1A2D',
    marginBottom: 16,  // Added some space between boxes
  },
  box3: {
    padding: 20,
    width: '95%',
    borderRadius: 10,
    height: 200,
    backgroundColor: '#EF065D',
    marginBottom: 16,  // Added some space between boxes
  },
  containerText: {
    width: 200,
    flexDirection:'row',
    
  },
  imagem1: {
    marginTop:20,
    marginLeft:-20,  
  },
  imagem2: {
    marginTop:20,  
  },
  title: {
    fontWeight: 'bold',
    fontSize: 45,
    color: 'white',
  },
  title2: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },
  text: {
    textAlign: 'left',  // Fixed typo from 'textAling'
    color: 'white',
    fontSize: 16,
  },

});
