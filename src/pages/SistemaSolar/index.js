import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';


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
    title: 'Júpiter',
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


const Item = ({dados, navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('InformationPlaneta', { planeta: dados })} style={styles.item}>
    <View style={styles.containerPlaneta}>
      <Image source={dados.img} style={styles.imagensPlaneta} />
      <Text style={styles.textoPlaneta}>{dados.title}</Text>
      <Text style={styles.descricaoPlaneta}>{dados.description}</Text>
    </View>
  </TouchableOpacity>
);

export default function SistemaSolar({navigation}){
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/background1.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.tituloPlaneta}>Sistema Solar</Text>
        <SafeAreaView style={{paddingTop:40}}>
          <FlatList
            data={DATA}
            horizontal={true}
            pagingEnabled={true}
            snapToAlignment='center'
            snapToInterval={330}      
            decelerationRate='fast'
            renderItem={({item}) => <Item dados={item} navigation={navigation}/>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        <Text style={styles.textoExplicacao}>Arraste os planetas para o lado</Text>
      </ImageBackground>
    </View>
  );
};



const styles = StyleSheet.create({
  container:{
    justifycenter:'center',
    alingItems:'center',
    paddingTop:40,
  },
  tituloPlaneta:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    padding: 20,
    width:330,
    alignItems:'center',
    marginVertical: 8,
    marginLeft:10,
  },
  title: {
    fontSize: 32,
  },
  containerPlaneta:{
    backgroundColor:'white',
    postion:'relative',
    top:10,
    width:230,
    height:300,
    borderRadius: 20,
    alignItems:'center',
    boxShadow:'10px 20px 30px black'
  },
  imagensPlaneta:{
    postion:'absolute',
    zIndex:10,
    top:-43,    
    width:180,
    height:180,
  },
  textoPlaneta:{
    marginTop:-20,
    fontSize:30,
    fontWeight:'bold',
  },
descricaoPlaneta:{
  width:200,
  textAlign:'center',
  },
  textoExplicacao:{
    textAlign:'center',
    width:250,
    color:'white',
    fontSize:25,
    margin:'auto'
  }
});

;