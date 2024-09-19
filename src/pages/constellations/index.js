import React from 'react';
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
import {useState, useEffect} from 'react';

const { width } = Dimensions.get('window');  // Obtenha a largura da tela

const DATA = [
  {
    id: '1',
    title: 'Orion',
    description: 'A constelação dos caçadores.',
    img: require('../../../assets/constelacao-orion.png')
  },
  {
    id: '2',
    title: 'Ursa Maior',
    description: 'A constelação dos ursos',
    img: require('../../../assets/constelacao-ursamaior.png')
  },
  {
    id: '3',
    title: 'Cruz do Sul',
    description: 'A constelação das cruzes',
    img: require('../../../assets/constelacao-cruzdosul.png')
  },
  {
    id: '4',
    title: 'Escorpião',
    description: 'A constelação dos escopiões',
    img: require('../../../assets/constelacao-escorpiao.png')
  },
  {
    id: '5',
    title: 'Leão',
    description: 'A constelação dos leões',
    img: require('../../../assets/constelacao-leao.png')
  }
];

const Item = ({dados, setInformacao}) => (
  <TouchableOpacity onPress={() => setInformacao(dados)} style={styles.item}>
    <View style={styles.box1}>
      <View style={styles.circleImage}>
        <Image source={dados.img} style={styles.imageConstellations} />
      </View>
      <View style={styles.containerTexto}>
        <Text style={styles.textTitle}>{dados.title}</Text>
        <Text style={styles.textDescription}>{dados.description}</Text>
      </View>
      <View style={{flexDirection: 'row', gap: 10, paddingLeft: 30}}>
        <Text style={styles.textoExplicacao}>Aperte para ver mais</Text>
        <Image source={require('../../../assets/setinha.png')} style={styles.seta} />
      </View>
    </View>
    <View style={styles.box2} />
    <View style={styles.box3} />
  </TouchableOpacity>
);

export default function SistemaSolar({navigation}) {
  const [informacao, setInformacao] = useState(null);

  return (
    <ImageBackground source={require('../../../assets/background2.png')} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        {informacao == null ? (
          <View> 
            <Text style={styles.tituloPlaneta}>História das constelações</Text>
            <SafeAreaView style={styles.safeArea}>
              <FlatList
                data={DATA}
                horizontal={true}
                pagingEnabled={true}
                snapToAlignment='center'
                snapToInterval={width}
                decelerationRate='fast'
                renderItem={({item}) => <Item dados={item} setInformacao={setInformacao} />}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
            <Text>Arraste os planetas para o lado</Text>
          </View>
        ) : (
          <View style={styles.apresentacao}>
            <Image source={informacao.img} style={styles.apresentacaoImagem} />
            <Text style={styles.apresentacaoTexto}>{informacao.description}</Text>
            <TouchableOpacity onPress={() => setInformacao(null)} style={styles.botaoVoltar}>
              <Text style={styles.textoBotao}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    // Adicione outras propriedades, se necessário
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tituloPlaneta: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  textTitle:{
    fontSize:35,
    fontWeight:'bold'
  },
  containerTexto:{
    borderWidth:1,
    position:'relative',
    top:-50,
  },
  textDescription:{
    fontSize:18,
  },
  circleImage:{
    postion:'absolute',
    top:-80,
    width:180,
    height:180,
    borderRadius:100,
    borderWidth:4,
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#21145c',
  },
  imageConstellations:{
    width:100,
    height:100,
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
    height: 270,
    backgroundColor: 'white',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    position: 'absolute',  // Torna o box1 absoluto
    top: '20%',  // Centraliza verticalmente com um deslocamento
    zIndex: 10,  // Mantém o box1 acima dos outros
  },
  box2: {
    width: 260,
    height: 200,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#E8F1F2',
    position: 'absolute',  // Torna o box2 absoluto
    top: '50%',  // Coloca o box2 abaixo do box1
    zIndex: 9,  // Mantém o box2 abaixo do box1
    marginTop: -58,  // Ajusta o deslocamento vertical
  },
  box3: {
    width: 220,
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'rgba(194, 119, 237,0.2)',
    position: 'absolute',  // Torna o box3 absoluto
    top: '65%',  // Coloca o box3 abaixo do box2
    zIndex: 8,  // Mantém o box3 abaixo do box2
    marginTop: -120,  // Ajusta o deslocamento vertical
  },
  textoExplicacao: {
    textAlign: 'center',
    position:'absolute',
    top:-30,
    right:10,
    color:'#00C1CF',
  },
  seta:{
    marginTop:25,
    position:'absolute',
    top:-50,
    left:30,
  },  
  apresentacao:{
    flex:1,
  }
});
