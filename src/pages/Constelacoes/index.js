import React from 'react';
import { useAccessibility } from '../../context/AccessibilityContext/';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';

const { width } = Dimensions.get('window');  // Obtenha a largura da tela

const data = [
  {
    id: '1',
    title: 'Orion',
    resume: 'A constelação dos caçadores',
    description: 'Orion é uma das constelações mais fáceis de ver no céu noturno. Ela tem a forma de um caçador segurando um arco e flecha. No meio de Orion, existem três estrelas brilhantes em linha reta, que são chamadas de "Cinturão de Orion". Diz a lenda que Orion era um caçador forte e corajoso, e Zeus, o rei dos deuses, o colocou no céu para sempre. Agora, Orion nos lembra de olhar para as estrelas e sonhar com aventuras.',
    img: require('../../../assets/constelacao-orion.png')
  },
  {
    id: '2',
    title: 'Ursa Maior',
    resume: 'A constelação dos ursos',
    description: 'Ursa Maior é uma constelação que parece um grande urso no céu. Ela é famosa porque suas sete estrelas principais formam um desenho que se parece com uma concha, conhecida como "Grande Carro" ou "Grande Cadeira". Na mitologia, Ursa Maior era uma bela ninfa chamada Calisto, que foi transformada em um urso por uma deusa ciumenta. Para protegê-la, Zeus a colocou no céu, onde ela brilha para sempre.',
    img: require('../../../assets/constelacao-ursamaior.png')
  },
  {
    id: '3',
    title: 'Cruz do Sul',
    resume: 'A constelação das cruzes',
    description: 'A Cruz do Sul é uma constelação importante no hemisfério sul e é formada por quatro estrelas brilhantes que parecem uma cruz. Os navegadores antigos usavam a Cruz do Sul para encontrar o caminho durante as viagens. Dizem que a cruz foi colocada no céu por deuses para guiar as pessoas em suas jornadas e proteger aqueles que se perdem.',
    img: require('../../../assets/constelacao-cruzdosul.png')
  },
  {
    id: '4',
    title: 'Escorpião',
    resume: 'A constelação dos escopiões',
    description: 'A constelação de Escorpião tem a forma de um escorpião, com sua cauda curva e brilhante. Segundo a mitologia, o escorpião foi enviado pela deusa Artemis para perseguir o caçador Orion, e depois que ele cumpriu sua missão, foi colocado no céu. Agora, Escorpião brilha no céu de verão, lembrando a todos de sua força e astúcia.',
    img: require('../../../assets/constelacao-escorpiao.png')
  },
  {
    id: '5',
    title: 'Leão',
    resume: 'A constelação dos leões',
    description: 'Leão é uma constelação que se parece com um leão, o rei dos animais. Na mitologia, Leão representa o poderoso Leão de Nemeia, uma criatura que Hércules derrotou como parte de suas doze tarefas. Depois de sua vitória, o leão foi colocado no céu como uma constelação, e agora ele vigia as estrelas com seu rugido silencioso.',
    img: require('../../../assets/constelacao-leao.png')
  }
];


export default function Constelacoes({ navigation }) {
  const { fontSize, titleFontSize, isHighContrast } = useAccessibility();

  // Definindo as cores dependendo do modo de acessibilidade
  const backgroundColor = isHighContrast ? '#000' : '#FFF';
  const textColor = isHighContrast ? '#FFF' : '#000';

  const Item = ({ dados }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Constelacao', { constelacao: dados })} style={styles.item}>
      <View style={[styles.box1, {backgroundColor}]}>
        <View style={styles.circleImage}>
          <Image source={dados.img} style={styles.imageConstelacoes} />
        </View>
        <View style={styles.containerTexto}>
          <Text style={[styles.textTitle,{textAlign:'center', color: textColor}]}>{dados.title}</Text>
          <Text style={[styles.textDescription1,{fontSize: fontSize,textAlign:'center', color: textColor}]}>{dados.resume}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, paddingLeft: 30 }}>
          <Text style={[styles.textoExplicacao, {fontSize:fontSize*0.9,color: textColor}]}>Aperte para ver mais</Text>
        </View>
      </View>
      <View style={styles.box2} />
      <View style={styles.box3} />
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../../../assets/background2.png')} resizeMode="cover" style={styles.image}>
        <TouchableOpacity style={{ position:'absolute',top:20, right:30,marginBottom:20,}} onPress={() => navigation.navigate('Perfil')}>
          <Icon name="menu" size={50} color={'white'} />
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
        <Image source={require('../../../assets/seta-branca.png')} style={styles.imagemApresentacao} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View>
          <Text style={[styles.tituloConstelacao, {fontSize:fontSize * 1.4, marginTop:90}]}>História das constelações</Text>
          <SafeAreaView style={styles.safeArea}>
            <FlatList
              data={data}
              horizontal={true}
              pagingEnabled={true}
              snapToAlignment='center'
              snapToInterval={width}
              decelerationRate='fast'
              renderItem={({ item }) => <Item dados={item} />}
              keyExtractor={item => item.id}
              style={{marginTop:-20}}
            />
          </SafeAreaView>
          <Text style={[styles.textodrag, {fontSize: fontSize, color: 'white' }]}>Arraste os planetas para o lado</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  apresentacao: {
    position: 'relative',
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start', // Muda para flex-start
    alignItems: 'center', // Mantenha centralizado horizontalmente se necessário
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloConstelacao: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 80
  },
  textTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop:-20,
  },
  containerTexto: {
    position: 'relative',
    top: -50,
  },
  textDescription1: {
    fontSize: 15,
  },
  textDescription2: {
    fontSize: 16,
    opacity: 0.7,
    paddingHorizontal: 12
  },
  circleImage: {
    postion: 'absolute',
    top: -80,
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21145c',
    shadowOffset: {
      width: 0,
      height: 0,  // Ajuste a altura da sombra
    },
    shadowOpacity: 0.80, // Opacidade da sombra
    shadowRadius: 1,   // Raio da sombra
    elevation: 1,        // Para Android
  },
  imageConstelacoes: {
    width: 100,
    height: 100,
    objectFit: 'contain'
  },
  item: {
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  safeArea: {
    flex: 1,
    paddingTop: 40,
  },
  box1: {
    width: 320,
    height:300,
    height:'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',  // Torna o box1 absoluto
    top: '16%',  // Centraliza verticalmente com um deslocamento
    zIndex: 10,  // Mantém o box1 acima dos outros    
    padding: 5,
    paddingVertical: 17
  },
  textoExplicacao: {
    textAlign: 'center',
    color: '#00C1CF',
    marginRight:15,
    marginTop:-40,
  },
  seta: {
    marginTop: 25,
    position: 'absolute',
    top: -50,
    left: 30,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 60,
    left: 40,
    width: 40,
    height: 40,
  },
  apresentacaoImagem: {
    marginTop: 80,
    height: 350,
    maxWidth: "85%",
    borderWidth: 10,
    objectFit: 'contain'

  },
  textodrag: {
    textAlign: 'center',
    width: 250,
    color: 'white',
    fontSize: 20,
    marginHorizontal: 'auto',
    position: "absolute",
    bottom: 30,
    alignSelf: "center"
  }
});
