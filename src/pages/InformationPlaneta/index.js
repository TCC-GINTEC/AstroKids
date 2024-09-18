import React from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet ,ImageBackground } from 'react-native';

export default function InformationPlaneta({ route, navigation }) {
  const { planeta } = route.params;

  const planetas = [
    {
      id: 1,
      title: 'Sol',
      description: 'O Sol é uma estrela que faz parte de uma constelação, mas é especial porque está muito mais perto de nós do que as outras estrelas. Ele é como uma estrela gigante que nos aquece e ilumina o dia.',
      imagens: [require('../../../assets/slide-astronauta1.png'), require('../../../assets/slide-naveEspacial2.png')]
    },
    {
      id: 2,
      title: 'Mercurio',
      description: 'Mercúrio é o planeta mais próximo do Sol. Por causa disso, ele é muito quente durante o dia e muito frio à noite. Não tem atmosfera para nos proteger.',
      imagens: [require('../../../assets/slide-astronauta1.png'), require('../../../assets/slide-naveEspacial2.png')]
    },
    {
      id: 3,
      title: 'Venus',
      description: 'Vênus é o segundo planeta a partir do Sol e é quase do mesmo tamanho da Terra. Ele é coberto por nuvens espessas que prendem o calor, fazendo de Vênus o planeta mais quente do nosso sistema solar.',
      imagens: [require('../../../assets/slide-foguete.png'), require('../../../assets/slide-planetaVermelho.png'), require('../../../assets/slide-tornado.png')]
    },
    {
      id: 4,
      title: 'Terra',
      description: 'A Terra é o único planeta onde sabemos que existe vida. Tem água, ar e a temperatura certa para que plantas, animais e pessoas possam viver.',
      imagens: [require('../../../assets/slide-terra1.png'), require('../../../assets/slide-terra2.png'), require('../../../assets/slide-terra3.png')]
    },
    {
      id: 5,
      title: 'Marte',
      description: 'Marte é conhecido como o "planeta vermelho" por causa de sua cor. Ele tem montanhas, vales e desertos, e também tem calotas polares como a Terra.',
      imagens: [require('../../../assets/slide-marte1.png'), require('../../../assets/slide-marte2.png'),require('../../../assets/slide-marte3.png')]
    },
    {
      id: 6,
      title: 'Júpiter',
      description: 'Júpiter é o maior planeta do sistema solar, com uma tempestade enorme chamada Grande Mancha Vermelha que é maior do que a Terra.',
      imagens: [require('../../../assets/slide-jupiter1.png'), require('../../../assets/slide-jupiter2.png'), require('../../../assets/slide-jupiter3.png')]
    },
    {
      id: 7,
      title: 'Saturno',
      description: 'Saturno é famoso por seus belos anéis feitos de gelo e rocha. Ele é outro gigante gasoso, como Júpiter, e tem mais de 80 luas.',
      imagens: [require('../../../assets/slide-saturno1.png'), require('../../../assets/slide-saturno2.png'),require('../../../assets/slide-saturno3.png')]
    },
    {
      id: 8,
      title: 'Urano',
      description: 'Urano é um planeta inclinado de lado, o que significa que ele gira de uma maneira bem diferente dos outros planetas. Ele tem uma cor azulada por causa do gás metano na sua atmosfera.',
      imagens: [require('../../../assets/slide-urano1.png'), require('../../../assets/slide-urano2.png'),require('../../../assets/slide-urano3.png')]
    },
    {
      id: 9,
      title: 'Netuno',
      description: 'Netuno é o planeta mais distante do Sol e é conhecido por seus ventos super fortes. Ele tem uma cor azulada e é muito frio.',
      imagens: [require('../../../assets/slide-netuno1.png'), require('../../../assets/slide-netuno2.png'), require('../../../assets/slide-neturno3.png')]
    },
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
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planetaData.title}</Text>
      <ImageBackground source={getPlanetaBorda(planetaData.title)} style={styles.backgroundImage}>
        <Image source={getPlanetaImage(planetaData.title)} style={styles.planetaImage} />
      </ImageBackground>
      <Text style={styles.description}>{planetaData.description}</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
      
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
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
  },
  imageContainer: {
    marginHorizontal: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
  backgroundImage: {
    width: 300,
    height: 300,
    justifyContent: 'center',  // Centraliza o conteúdo dentro do ImageBackground
    alignItems: 'center',      // Centraliza o conteúdo dentro do ImageBackground
    marginBottom: 20,          // Espaçamento inferior
  },
  planetaImage: {
    width: 200,
    height: 200,  // Tamanho ajustável para a imagem do planeta
    resizeMode: 'contain', // Ajusta a imagem para caber sem distorção
  },
});
