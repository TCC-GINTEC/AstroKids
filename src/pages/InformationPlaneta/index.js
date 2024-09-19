import React from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet ,ImageBackground ,ScrollView,TouchableOpacity} from 'react-native';

export default function InformationPlaneta({ route, navigation }) {
  const { planeta } = route.params;

  const planetas = [
    {
      id: 1,
      title: 'Sol',
      description: 'O Sol é uma estrela que faz parte de uma constelação, mas é especial porque está muito mais perto de nós do que as outras estrelas. Ele é como uma estrela gigante que nos aquece e ilumina o dia,faz parte de um grande grupo de estrelas chamado galáxia, mas não pertence a nenhuma constelação específica.',
      imagens: [require('../../../assets/slide-astronauta1.png'), require('../../../assets/slide-naveEspacial2.png')]
    },
    {
      id: 2,
      title: 'Mercurio',
      description: 'Mercúrio é o planeta mais próximo do Sol. Por causa disso, ele é muito quente durante o dia e muito frio à noite. Como ele é pequeno e não tem atmosfera para nos proteger, não poderíamos viver lá. Mercúrio gira rapidamente em torno do Sol, completando um ano em apenas 88 dias terrestres',
      imagens: [require('../../../assets/slide-astronauta1.png'), require('../../../assets/slide-naveEspacial2.png')]
    },
    {
      id: 3,
      title: 'Venus',
      description: 'Vênus é o segundo planeta a partir do Sol e é quase do mesmo tamanho da Terra. Ele é coberto por nuvens espessas que prendem o calor, fazendo de Vênus o planeta mais quente do nosso sistema solar. As nuvens são feitas de ácido, por isso seria impossível respirar ou viver lá.',
      imagens: [require('../../../assets/slide-foguete.png'), require('../../../assets/slide-planetaVermelho.png'), require('../../../assets/slide-tornado.png')]
    },
    {
      id: 4,
      title: 'Terra',
      description: 'A Terra é o único planeta onde sabemos que existe vida. Tem água, ar e a temperatura certa para que plantas, animais e pessoas possam viver. A Terra gira em torno do Sol e também gira em torno de si mesma, o que cria os dias, as noites e as estações do ano.',
      imagens: [require('../../../assets/slide-terra1.png'), require('../../../assets/slide-terra2.png'), require('../../../assets/slide-terra3.png')]
    },
    {
      id: 5,
      title: 'Marte',
      description: 'Marte é conhecido como o "planeta vermelho" por causa de sua cor. Ele tem montanhas, vales e desertos, e também tem calotas polares como a Terra. Embora seja muito frio para nós, os cientistas acham que Marte pode ter tido água líquida no passado, o que é importante para a vida.',
      imagens: [require('../../../assets/slide-marte1.png'), require('../../../assets/slide-marte2.png'),require('../../../assets/slide-marte3.png')]
    },
    {
      id: 6,
      title: 'Jupiter',
      description: 'Júpiter é o maior planeta do sistema solar. Ele tem um enorme campo magnético e muitas luas, incluindo a famosa lua Io, que tem vulcões ativos.',
      imagens: [require('../../../assets/slide-jupiter1.png'), require('../../../assets/slide-jupiter2.png'), require('../../../assets/slide-jupiter3.png')]
    },
    {
      id: 7,
      title: 'Saturno',
      description: 'Saturno é famoso por seus belos anéis feitos de gelo e rocha. Ele é outro gigante gasoso, como Júpiter, e é tão grande que caberia mais de 760 Terras dentro dele! Saturno tem mais de 80 luas, e algumas delas são realmente interessantes para os cientistas.',
      imagens: [require('../../../assets/slide-saturno1.png'), require('../../../assets/slide-saturno2.png'),require('../../../assets/slide-saturno3.png')]
    },
    {
      id: 8,
      title: 'Urano',
      description: 'Urano é um planeta inclinado de lado, o que significa que ele gira de uma maneira bem diferente dos outros planetas. Ele tem uma cor azulada por causa do gás metano na sua atmosfera. Urano é muito frio e está muito longe do Sol, então seus anos são extremamente longos.',
      imagens: [require('../../../assets/slide-urano1.png'), require('../../../assets/slide-urano2.png'),require('../../../assets/slide-urano3.png')]
    },
    {
      id: 9,
      title: 'Netuno',
      description: 'Netuno é o planeta mais distante do Sol e é conhecido por seus ventos super fortes. Assim como Urano, Netuno tem uma cor azulada e é muito frio. Netuno também tem anéis finos ao seu redor e leva mais de 160 anos para dar uma volta completa ao redor do Sol.',
      imagens: [require('../../../assets/slide-netuno1.png'), require('../../../assets/slide-netuno2.png'), require('../../../assets/slide-neturno3.png')]
    }
  ];

  const getPlanetaImage = (title) => {
    switch (title.toLowerCase()) {
      case 'sol':
        return require('../../../assets/sol.png');
      case 'mercurio':
        return require('../../../assets/mercurio.png');
      case 'venus':
        return require('../../../assets/venus.png');
      case 'terra':
        return require('../../../assets/terra.png');
      case 'marte':
        return require('../../../assets/marte.png'); 
      case 'jupiter':
        return require('../../../assets/jupiter.png');
      case 'saturno':
        return require('../../../assets/saturno.png');
      case 'urano':
        return require('../../../assets/urano.png');
      case 'netuno':
        return require('../../../assets/netuno.png');
      default:
        return null;
    }
  };

  const getPlanetaBorda = (borda) => {
    switch (borda.toLowerCase()) {
      case 'sol':
        return require('../../../assets/bordaSol.png');
      case 'mercurio':
          return require('../../../assets/bordaMercurio.png');
      case 'venus':
        return require('../../../assets/bordaVenus.png');
      case 'terra':
          return require('../../../assets/bordaTerra.png');
      case 'marte':
          return require('../../../assets/bordaMarte.png');
      case 'jupiter':
        return require('../../../assets/bordaJupiter.png');
     case 'saturno':
        return require('../../../assets/bordaSaturno.png');
     case 'urano':
        return require('../../../assets/bordaUrano.png');
     case 'netuno':
        return require('../../../assets/bordaNeturno.png');         
      default:
        return null;
    }
  } 

  const planetaData = planetas.find(p => p.title === planeta.title);
  if (!planetaData) {
    return <Text>Planeta não encontrado</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={item} style={styles.image} style={{width:300,height:150, borderRadius: 10}} />
    </View>
  );

  const isSaturno = planetaData.title.toLowerCase() === 'saturno'; // Verifica se o planeta é Saturno

  return (
    <ScrollView  style={styles.container} >
      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/seta.png')}   style={{ transform: [{ rotate: '-180deg' }], width:30, height:30, marginLeft:10,marginTop:40,}}/>
        </TouchableOpacity>
        <ImageBackground source={getPlanetaBorda(planetaData.title)} style={styles.backgroundImage}>
          <Image source={getPlanetaImage(planetaData.title)} style={styles.planetaImage} style={[styles.planetaImage, isSaturno && styles.saturnoImage]}/>
        </ImageBackground>
      </View>
      <Text style={styles.title}>{planetaData.title}</Text>
      <Text style={styles.description}>{planetaData.description}</Text>      
      {/* Exibição das imagens usando FlatList */}
      <FlatList
        data={planetaData.imagens}
        horizontal={true}
        pagingEnabled={true}
        snapToAlignment='center'
        snapToInterval={330}      
        decelerationRate='fast'
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alingItems: 'center',
  },
  flatList: {
    marginBottom: 30, // Adiciona espaço abaixo do FlatList
  },
  flatListContent: {
    paddingBottom: 20, // Espaço entre os itens do conteúdo e a parte inferior
  },
  box:{
    alignItems:'start',
    flexDirection:'row' 
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginLeft:25,
  },
  description: {
    fontSize: 20,
    marginVertical: 16,
    width:'85%',
    margin:'auto',
    textAlign: 'justify',
  },
  imageContainer: {
    marginHorizontal: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  imagensPlanet: {
    width:100,
    height:100,
  },
  saturnoImage: {
    width: 500, 
    height: 500,
  },
  backgroundImage: {
    width: 300,
    height: 300,
    justifyContent: 'center',  
    alignItems: 'center',      
    marginBottom: 20,
    marginLeft:'22%',      
  },
  planetaImage: {
    width: 260,
    height: 260,
    resizeMode: 'contain', 
  },
});
