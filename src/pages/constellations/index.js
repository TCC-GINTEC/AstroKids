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
    resume:'A constelação dos caçadores',
    description: 'Orion é uma das constelações mais fáceis de ver no céu noturno. Ela tem a forma de um caçador segurando um arco e flecha. No meio de Orion, existem três estrelas brilhantes em linha reta, que são chamadas de "Cinturão de Orion". Diz a lenda que Orion era um caçador forte e corajoso, e Zeus, o rei dos deuses, o colocou no céu para sempre. Agora, Orion nos lembra de olhar para as estrelas e sonhar com aventuras.',
    img: require('../../../assets/constelacao-orion.png')
  },
  {
    id: '2',
    title: 'Ursa Maior',
    resume:'A constelação dos ursos',
    description: 'Ursa Maior é uma constelação que parece um grande urso no céu. Ela é famosa porque suas sete estrelas principais formam um desenho que se parece com uma concha, conhecida como "Grande Carro" ou "Grande Cadeira". Na mitologia, Ursa Maior era uma bela ninfa chamada Calisto, que foi transformada em um urso por uma deusa ciumenta. Para protegê-la, Zeus a colocou no céu, onde ela brilha para sempre.',
    img: require('../../../assets/constelacao-ursamaior.png')
  },
  {
    id: '3',
    title: 'Cruz do Sul',
    resume:'A constelação das cruzes',
    description: 'A Cruz do Sul é uma constelação importante no hemisfério sul e é formada por quatro estrelas brilhantes que parecem uma cruz. Os navegadores antigos usavam a Cruz do Sul para encontrar o caminho durante as viagens. Dizem que a cruz foi colocada no céu por deuses para guiar as pessoas em suas jornadas e proteger aqueles que se perdem.',
    img: require('../../../assets/constelacao-cruzdosul.png')
  },
  {
    id: '4',
    title: 'Escorpião',
    resume:'A constelação dos escopiões',
    description: 'A constelação de Escorpião tem a forma de um escorpião, com sua cauda curva e brilhante. Segundo a mitologia, o escorpião foi enviado pela deusa Artemis para perseguir o caçador Orion, e depois que ele cumpriu sua missão, foi colocado no céu. Agora, Escorpião brilha no céu de verão, lembrando a todos de sua força e astúcia.',
    img: require('../../../assets/constelacao-escorpiao.png')
  },
  {
    id: '5',
    title: 'Leão',
    resume:'A constelação dos leões',
    description: 'Leão é uma constelação que se parece com um leão, o rei dos animais. Na mitologia, Leão representa o poderoso Leão de Nemeia, uma criatura que Hércules derrotou como parte de suas doze tarefas. Depois de sua vitória, o leão foi colocado no céu como uma constelação, e agora ele vigia as estrelas com seu rugido silencioso.',
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
        <Text style={styles.textDescription1}>{dados.resume}</Text>
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

export default function Constellations({navigation}) {
  const [informacao, setInformacao] = useState(null);

  return (
    <ImageBackground source={require('../../../assets/background2.png')} resizeMode="cover" style={styles.image}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
              <Image source={require('../../../assets/seta-branca.png')} style={styles.imagemApresentacao}/>
      </TouchableOpacity>
      <View style={styles.container}>
        {informacao == null ? (
          <View> 
            <Text style={styles.tituloConstelacao}>História das constelações</Text>
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
            <TouchableOpacity onPress={() => { console.log("Botão pressionado!"); setInformacao(null); }} style={styles.botaoVoltar}>
              <Image source={require('../../../assets/seta-branca.png')} style={styles.imagemApresentacao}/>
            </TouchableOpacity>
            <Image source={informacao.img} style={styles.apresentacaoImagem} />
            <View style={styles.box4}>
              <Text style={{fontSize:50, fontWeight:'bold'}}>{informacao.title}</Text>
              <Text style={styles.textDescription2}>{informacao.description}</Text>
            </View>
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
    position:'relative',
    flex: 1,
    width:'100%',
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
    marginTop:80
  },
  textTitle:{
    fontSize:35,
    fontWeight:'bold'
  },
  containerTexto:{
    position:'relative',
    top:-50,
  },
  textDescription1:{
    fontSize:20,
  },
  textDescription2:{
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
    shadowOffset: {
    width: 0,
    height: 0,  // Ajuste a altura da sombra
  },
  shadowOpacity: 0.80, // Opacidade da sombra
  shadowRadius: 1,   // Raio da sombra
  elevation: 1,        // Para Android
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
  box4: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height:350,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  botaoVoltar:{
    position:'absolute',
    top:40,
    left:40,
    width:40,
    height:40,
  },
  apresentacaoImagem:{
    marginTop:50,
    width:250, 
    height:240,
  }
});
