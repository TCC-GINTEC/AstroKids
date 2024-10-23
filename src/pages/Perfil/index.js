import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet,Image  } from 'react-native';
import { useAccessibility } from '../../context/AccessibilityContext/';

const Perfil = ({navigation}) => {
  const {
    fontSize,
    titleFontSize,
    increaseFontSize,
    decreaseFontSize,
    isHighContrast,
    toggleHighContrast,
  } = useAccessibility();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading preferences
    const loadPreferences = async () => {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadPreferences();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{flex: 1,marginTop:100, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{postition:'absolute', left:-170}}>
           <Image 
              source={require('../../../assets/seta.png')}   
              style={{ transform: [{ rotate: '-180deg' }], width:30, height:30, marginLeft:10,}}
            />        
        </TouchableOpacity>
      <Text style={{ fontSize: titleFontSize, fontWeight: 'bold' }}>Perfil</Text>
      <Image source={require('../../../assets/images.jpg')} style={{borderRadius:100,height:200}}/>
      <Text style={{ fontSize }}>Este é o seu perfil.</Text>
      <View style={{marginTop:50}}>
        <TouchableOpacity style={styles.botao} onPress={increaseFontSize}>
          <Text style={styles.botaoTexto}>Aumentar a fonte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={decreaseFontSize}>
          <Text style={styles.botaoTexto}>Diminuir Fonte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={toggleHighContrast}>
          <Text style={styles.botaoTexto}>{isHighContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}</Text>
        </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  botao: {
    width:300,
    padding: 10,
    backgroundColor: '#8A2BE2', // Cor roxa
    borderRadius: 5, // Bordas arredondadas
    marginVertical: 5, // Espaçamento vertical entre os botões
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  botaoTexto: {
    color: '#FFFFFF', // Cor do texto dos botões
    fontSize: 20, // Tamanho da fonte do texto dos botões
    fontWeight:'bold'
  },
});

export default Perfil;
