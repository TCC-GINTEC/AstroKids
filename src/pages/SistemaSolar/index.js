import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
} from 'react-native';

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
];


const Item = ({dados}) => (
  <View style={styles.item}>
    <View style={styles.containerPlaneta}>
       <Image source={dados.img} style={styles.imagensPlaneta}/>
       <Text style={styles.textoPlaneta}>{dados.title}</Text>
       <Text style={styles.descricaoPlaneta}>{dados.description}</Text>
    </View>
  </View>
);

export default function SistemaSolar(){
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sistema Solar</Text>
      <SafeAreaView>
        <FlatList
          data={DATA}
          horizontal={true}
          pagingEnabled={true}
          snapToAlignment='center'
          snapToInterval={330}      
          decelerationRate='fast'
          renderItem={({item}) => <Item dados={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop:40,
  },
  titulo:{
    fontSize:25,
    fontWeight:'bold',
    color:'white',
    textAling:'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
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
    width:250,
    height:270,
    borderRadius: 20,
    alignItems:'center',
  },
  imagensPlaneta:{
    postion:'absolute',
    top:-30,    
    width:150,
    height:150,
  },
  textoPlaneta:{
    marginTop:-20,
    fontSize:30,
    fontWeight:'bold',
  },
descricaoPlaneta:{
  width:200,
  textAlign:'center',
  }
});

;