import { View, Text, StyleSheet, TouchableOpacity ,Image } from 'react-native';
import { useAccessibility } from '../../context/AccessibilityContext/';
import Icon from 'react-native-vector-icons/Ionicons';
const fases = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function Trilha({ navigation }) {
  
  const { fontSize, titleFontSize, isHighContrast } = useAccessibility();

  // Definindo as cores dependendo do modo de acessibilidade
  const backgroundColor = isHighContrast ? '#000' : '#FFF';
  const textColor = isHighContrast ? '#FFF' : '#000';

  return (
    <View style={styles.container}>
  
        <View style={{flexDirection:'row', marginTop:20, alignItems:'center', justifyContent:'space-between', position:'relative'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton,{position:'absolute', left:0}]}>
                <Image 
                  source={require('../../../assets/seta-branca.png')}
                  style={{ width: 30, height: 30, marginLeft: -5}}
                />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Perfil')} >
            <Icon name="menu" size={50} style={{marginTop:20, marginBottom:20, marginLeft:300}}  color={'white'} />
          </TouchableOpacity>
        </View>
      {fases.map((f) => {
        return (
          <TouchableOpacity key={f.id} style={styles.botao}  onPress={() => navigation.navigate('Quiz', {fase:f.id})}>
            <Text style={styles.fase}>Fase</Text>
            <Text style={styles.idfase}>{f.id}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#4B0082', // Roxo mais escuro
    postion:'relative',
    alignItems: 'center', // Centraliza horizontalmente
  },
  containerMenu: {
    width:'100%',
    marginTop:30,
    marginRight:50,
  },
  botao: {
    backgroundColor: '#8A2BE2', // Cor do botão
    paddingVertical: 15, // Espaçamento vertical dentro do botão
    paddingHorizontal: 30, // Espaçamento horizontal dentro do botão
    borderRadius: 25, // Bordas arredondadas
    marginVertical: 10, // Espaçamento entre os botões
    alignItems: 'center', // Centraliza o texto dentro do botão
    width: '80%', // Largura dos botões ocupando 80% da tela
  },
  fase: {
    color: 'white',
    fontSize: 24,
  },
  idfase: {
    color: 'white',
    fontSize: 18,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 60,
    left: 40,
    width: 40,
    height: 40,
  },
});
