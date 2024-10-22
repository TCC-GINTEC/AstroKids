import { View, Text, StyleSheet, Image, ScrollView ,TouchableOpacity} from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAccessibility } from '../../context/accessibilityContext/';
import { IoMenu } from "react-icons/io5";

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  const { fontSize, titleFontSize, isDarkMode } = useAccessibility();

  return (

      <ScrollView contentContainerStyle={screenstyle.container} style={{backgroundColor: isDarkMode ? '#333' : '#FFF' }}>
        <TouchableOpacity>
           <IoMenu />
        </TouchableOpacity>
        <Text style={{...screenstyle.header,marginTop:55}} >Olá, seja Bem Vindo</Text>
        
        <TouchableOpacity style={screenstyle.box1}>
          <View style={screenstyle.containerText}> 
            <View>
              <Text style={screenstyle.title} >Quiz</Text>
              <Text style={{...screenstyle.text, fontSize: fontSize , color: "#ffe900"}}>Em construção</Text>
            </View>
            <Image source={require('../../../assets/home-imagem1.png')}  style={screenstyle.imagem1}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={screenstyle.box2} onPress={() => navigation.navigate('SistemaSolar')}>
          <View style={screenstyle.containerText}> 
            <View>
              <Text style={screenstyle.title}>Sistema Solar</Text>
              <Text style={screenstyle.text}>Conheças os planetas </Text>
            </View>
            <Image source={require('../../../assets/home-imagem2.png')}  style={screenstyle.imagem2}/>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={screenstyle.box3} onPress={() => navigation.navigate('Constelacoes')}>
          <View style={screenstyle.containerText}> 
            <View>
              <Text style={screenstyle.title2}>Historias das Constelações </Text>
              <Text style={screenstyle.text}>Descubras os misterios das constelações</Text>
            </View>
            <Image source={require('../../../assets/home-imagem3.png')}  style={screenstyle.imagem2}/>
          </View>
        </TouchableOpacity>
      </ScrollView>
  );
}

const screenstyle = StyleSheet.create({
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
    borderRadius: 20,
    height: 200,
    backgroundColor: '#000', // Fundo preto
    opacity: 0.6, // Torna o box meio apagado
    marginBottom: 16,
    overflow: 'hidden',  
  },
  box2: {
    padding: 20,    
    width: '95%',
    borderRadius: 20,
    height: 200,
    backgroundColor: '#0D1A2D',
    marginBottom: 16,
    overflow:'hidden'
  },
  box3: {
    padding: 20,    
    width: '95%',
    borderRadius: 20,
    height: 200,
    backgroundColor: '#EF065D',
    marginBottom: 16,  
    overflow:'hidden'
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
    fontSize: 13,
  },

});
