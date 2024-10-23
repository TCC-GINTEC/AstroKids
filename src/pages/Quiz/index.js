import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext/';
import Icon from 'react-native-vector-icons/Ionicons';

const fases = [
  { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
  { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }
];

// Função para agrupar elementos em grupos de 6
const groupBy = (array, groupSize) => {
  return array.reduce((acc, item, index) => {
    const groupIndex = Math.floor(index / groupSize);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(item);
    return acc;
  }, []);
};

export default function Trilha({ navigation }) {
  const [showAll, setShowAll] = useState(false); // Estado para controlar a visibilidade
  const grupos = groupBy(fases, 5);

  const { fontSize, titleFontSize, isHighContrast } = useAccessibility();
  // Definindo as cores dependendo do modo de acessibilidade
  const backgroundColor = isHighContrast ? '#000' : '#FFF';
  const textColor = isHighContrast ? '#FFF' : '#000';

  return (
    <View style={[styles.container,{paddingTop:25}]}>
      {/* Container para o botão de seta e as barras */}
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image 
            source={require('../../../assets/seta.png')}   
            style={{ transform: [{ rotate: '-180deg' }], width: 30  , height: 30 , marginLeft:20}}
          />        
        </TouchableOpacity>
        {/* Mapeando os grupos de barras */}
        <View style={styles.barrasContainer}>
          {grupos.map((grupo, index) => {
            // Exibe apenas os grupos que contêm as primeiras 6 fases se `showAll` for falso
            if (!showAll && index > 0) return null;
            return (
              <View key={index} style={styles.grupoContainer}>
                {grupo.map((fase) => (
                  <View 
                    key={fase.id} 
                    style={[
                      styles.barraCinza, 
                      // Verifica se é a fase 1 e aplica o cinza escuro, ou cinza claro caso contrário
                      { backgroundColor: fase.id === 1 ? '#2c2d30' : '#c8cacf' }
                    ]}
                  >
                    {fase.id === 1 && (
                      <Text style={styles.texto}></Text>
                    )} 
                  </View>
                ))}
              </View>
            );
          })}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Icon name="menu" size={50} style={{marginTop:20, marginBottom:20}}  color={textColor} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.titulo, { fontSize: fontSize, color: textColor }]}>texto qualquer</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: 'white', // Fundo branco
  },
  rowContainer: {
    borderWidth:1,
    borderColor:'red',
    flexDirection: 'row', // Alinha o botão e as barras em linha
    justifyContent:'justify-between',
    alignItems:'center',
    gap:25,
    marginTop: 20, // Margem superior para afastar do topo
    marginLeft: 10, // Adiciona margem esquerda para afastar do limite
  },
  grupoContainer: {
    justifyContent: 'center',
    flexDirection: 'row', // Mantém as barras em linha dentro do grupo
    gap: 10, // Espaçamento entre as barras dentro do grupo
  },
  barraCinza: {
    width: 40, // Largura de cada barra
    height: 7, // Altura de cada barra
    borderRadius: 5, // Bordas arredondadas
  },
  texto: {
    color: 'white', // Cor do texto da barra 1
    textAlign: 'center', // Centraliza o texto
  },
  titulo:{
    color:'black',
    fontWeight:'bold',
  }
});
