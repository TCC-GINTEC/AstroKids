import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAccessibility } from '../../context/AccessibilityContext/';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function Home({ navigation }) {
  const { fontSize, titleFontSize, isHighContrast } = useAccessibility();

  // Definindo as cores dependendo do modo de acessibilidade
  const backgroundColor = isHighContrast ? '#000' : '#FFF';
  const textColor = isHighContrast ? '#FFF' : '#000';

  return (
    <ScrollView contentContainerStyle={{ ...screenstyle.container, backgroundColor }}>
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Icon name="menu" size={50} style={{marginTop:20, position:'absolute', right:-170,marginBottom:20}}  color={textColor} />
      </TouchableOpacity>
      <Text style={{ ...screenstyle.header, color: 'white', marginTop: 55 }}>Olá, seja Bem Vindo</Text>

      <TouchableOpacity style={screenstyle.box1} onPress={() => navigation.navigate('Trilha')}>
        <View style={screenstyle.containerText}>
          <View>
            <Text style={{ ...screenstyle.title, color: 'white' }}>Trilha</Text>
            <Text style={{ ...screenstyle.text, fontSize: fontSize, color: "#ffe900", fontWeight: 'bold' }}>Em construção</Text>
          </View>
          <Image source={require('../../../assets/home-imagem1.png')} style={screenstyle.imagem1} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={screenstyle.box2} onPress={() => navigation.navigate('SistemaSolar')}>
        <View style={screenstyle.containerText}>
          <View>
            <Text style={{ ...screenstyle.title, color: 'white' }}>Sistema Solar</Text>
            <Text style={{ ...screenstyle.text, fontSize: fontSize, color: "#ffe900" }}>Conheça os planetas </Text>
          </View>
          <Image source={require('../../../assets/home-imagem2.png')} style={screenstyle.imagem2} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={screenstyle.box3} onPress={() => navigation.navigate('Constelacoes')}>
        <View style={screenstyle.containerText}>
          <View>
            <Text style={{ ...screenstyle.title2, color: 'white' }}>Histórias das Constelações </Text>
            <Text style={{ ...screenstyle.text, fontSize: fontSize, color: "#ffe900", fontWeight: 'bold' }}>Descubra os mistérios das constelações</Text>
          </View>
          <Image source={require('../../../assets/home-imagem3.png')} style={screenstyle.imagem2} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const screenstyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    marginTop: 40,
    fontSize: 34,
    marginRight: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  box1: {
    padding: 20,
    width: '95%',
    borderRadius: 20,
    height: 200,
    backgroundColor: '#000',
    opacity: 0.6,
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
    overflow: 'hidden',
  },
  box3: {
    padding: 20,
    width: '95%',
    borderRadius: 20,
    height: 200,
    backgroundColor: '#EF065D',
    marginBottom: 16,
    overflow: 'hidden',
  },
  containerText: {
    width: 200,
    flexDirection: 'row',
  },
  imagem1: {
    marginTop: 20,
    marginLeft: -20,
  },
  imagem2: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  title2: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  text: {
    textAlign: 'left',
    color: 'white',
    fontSize: 13,
  },
});
