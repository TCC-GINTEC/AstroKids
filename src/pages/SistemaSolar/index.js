  import React from 'react';
  import { useAccessibility } from '../../context/AccessibilityContext/';
  import Icon from 'react-native-vector-icons/Ionicons';
  import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions
  } from 'react-native';

  import { createNativeStackNavigator } from '@react-navigation/native-stack';


  const DATA = [
    {
      id: '1',
      title: 'Sol',
      description: 'O Sol é uma estrela que faz parte de uma constelação, mas é especial porque está muito mais perto de nós do que as outras estrelas.',
      img: require('../../../assets/sol.png')  // Use require aqui
    },
    {
      id: '2',
      title: 'Mercurio',
      description: 'Mercúrio é o planeta mais próximo do Sol. Por causa disso, ele é muito quente durante o dia e muito frio à noite.',
      img: require('../../../assets/mercurio.png')  // Use require aqui
    },
    {
      id: '3',
      title: 'Venus',
      description: 'Vênus é o segundo planeta a partir do Sol e é quase do mesmo tamanho da Terra. Ele é coberto por nuvens espessas.',
      img: require('../../../assets/venus.png')  // Use require aqui
    },
    {
      id: '4',
      title: 'Terra',
      description: 'A Terra é o único planeta onde sabemos que existe vida. Tem água, ar e a temperatura certa para que plantas, animais....',
      img: require('../../../assets/terra.png')  // Use require aqui
    },
    {
      id: '5',
      title: 'Marte',
      description: 'Marte é conhecido como o "planeta vermelho" por causa de sua cor. Ele tem montanhas, vales e desertos, e também tem calotas..',
      img: require('../../../assets/marte.png')  // Use require aqui
    },
    {
      id: '6',
      title: 'Jupiter',
      description: 'Júpiter é o maior planeta do sistema solar, com uma tempestade enorme chamada Grande Mancha Vermelha que é maior do que a Terra...',
      img: require('../../../assets/jupiter.png')  // Use require aqui
    },
    {
      id: '7',
      title: 'Saturno',
      description: 'Saturno é famoso por seus belos anéis feitos de gelo e rocha. Ele é outro gigante gasoso, como Júpiter, e é tão grande que..',
      img: require('../../../assets/saturno.png')  // Use require aqui
    },
    {
      id: '8',
      title: 'Urano',
      description: 'Urano é um planeta inclinado de lado, o que significa que ele gira de uma maneira bem diferente dos outros planetas. Ele tem uma cor azulada por causa do..',
      img: require('../../../assets/urano.png')  // Use require aqui
    },
    {
      id: '9',
      title: 'Netuno',
      description: 'Netuno é o planeta mais distante do Sol e é conhecido por seus ventos super fortes. Assim como Urano, Netuno tem uma cor azulada e muito ...',
      img: require('../../../assets/netuno.png')  // Use require aqui
    },
  ];

  export default function SistemaSolar({ navigation }) {

    const { fontSize, titleFontSize, isHighContrast } = useAccessibility();

    // Definindo as cores dependendo do modo de acessibilidade
    const backgroundColor = isHighContrast ? '#000' : '#FFF';
    const textColor = isHighContrast ? '#FFF' : '#000';

    const Item = ({ dados, navigation }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Planeta', { planeta: dados })} style={styles.item}>
        <View style={[styles.containerPlaneta, { backgroundColor }]}>
          <Image source={dados.img} style={[styles.imagensPlaneta, dados.title === 'Saturno' ? { width: 300, height: 200, marginTop: -25 } : { width: 180, height: 180 }]} />
          <Text style={[styles.textoPlaneta, { fontSize: fontSize*1.4 , color: textColor }]} >{dados.title}</Text>
          <Text style={[styles.descricaoPlaneta, { fontSize: fontSize, color: textColor }]} >{dados.description}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <ImageBackground source={require('../../../assets/background1.png')} resizeMode="cover" style={{...styles.container, backgroundColor}}>
        <TouchableOpacity style={{marginTop:50, position:'absolute', right:30,marginBottom:20}} onPress={() => navigation.navigate('Perfil')}>
          <Icon name="menu" size={50} color={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
          <Image source={require('../../../assets/seta-branca.png')} style={styles.imagemApresentacao} />
        </TouchableOpacity>
        <Text style={[styles.tituloPlaneta,{fontSize: fontSize*1.2 }]}>Sistema Solar</Text>
        <SafeAreaView >
          <FlatList
            data={DATA}
            horizontal={true}
            pagingEnabled={true}
            snapToAlignment="center"
            snapToInterval={Dimensions.get('window').width}
            decelerationRate="fast"
            renderItem={({ item }) => <Item dados={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            style={{ width: "100%" }}

          />
        </SafeAreaView>
        <Text style={[styles.textoExplicacao, { fontSize: fontSize, marginTop: -20 }]}>Arraste os planetas para o lado</Text>
      </ImageBackground>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifycenter: 'center',
      alingItems: 'center',
      paddingTop: 30,
    },
    tituloPlaneta: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginBottom: 20,
      marginTop:20
    },
    item: {
      padding: 20,
      width: Dimensions.get('window').width,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 8,
    },
    title: {
      fontSize: 32,
    },
    safeArea: {
      flex: 1,
      paddingTop: 40,
    },
    containerPlaneta: {
      backgroundColor: 'white',    
      width: Dimensions.get('window').width * 0.8, // Aumentar para 90% da largura da tela
      paddingHorizontal:'10px',
      paddingBottom: 14,
      borderRadius: 20,
      alignItems: 'center',
      boxShadow: '10px 20px 30px black'
    },
    image: {
      flex: 1, // Adicionado
      justifyContent: 'center',
    },
    imagensPlaneta: {
      postion: 'absolute',
      zIndex: 10,
      top: -43,
      width: 180,
      height: 180,
    },
    textoPlaneta: {
      marginTop: -20,
      fontSize: 30,
      fontWeight: 'bold',
    },
    descricaoPlaneta: {
      width: '100%',
      textAlign: 'center',
    },
    textoExplicacao: {
      textAlign: 'center',
      width: 250,
      color: 'white',
      fontSize: 20,
      marginHorizontal:'auto',
    },
    botaoVoltar: {
      position: 'absolute',
      top: 60,
      left: 40,
      width: 40,
      height: 40,
    },
  });
