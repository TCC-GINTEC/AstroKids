import { View, Text, StyleSheet, Image, TouchableOpacity , Modal, Pressable, Button,Alert} from 'react-native';
import { useState, useEffect } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext/';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from "../../services/api";

const astrolinoImage1 = require('../../../assets/robo1.png');
const astrolinoImage2 = require('../../../assets/robo2.png');
const astrolinoImage3 = require('../../../assets/robo2.png');


const fases = [
  { id: 1, pergunta: 'Qual planeta é conhecido como o Planeta Vermelho?', opcoes: ['Marte', 'Terra', 'Venus', 'Urano'], respostaCorreta: 'Marte', ajuda: 'Este planeta tem uma coloração avermelhada devido à presença de óxidos de ferro em sua superfície.' },
  { id: 2, pergunta: 'Qual é o maior planeta do sistema solar?', opcoes: ['Jupiter', 'Saturno', 'Netuno', 'Urano'], respostaCorreta: 'Jupiter', ajuda: 'Este é o planeta com o maior diâmetro e volume no sistema solar.' },
  { id: 3, pergunta: 'Qual planeta é conhecido como o Planeta Azul?', opcoes: ['Terra', 'Marte', 'Venus', 'Mercurio'], respostaCorreta: 'Terra', ajuda: 'Este planeta tem uma grande quantidade de água líquida, o que dá a ele sua aparência azul vista do espaço.' },
  { id: 4, pergunta: 'Qual planeta é o mais próximo do Sol?', opcoes: ['Mercurio', 'Venus', 'Terra', 'Marte'], respostaCorreta: 'Mercurio', ajuda: 'Este planeta está mais próximo do Sol e tem uma órbita muito rápida.' },
  { id: 5, pergunta: 'Qual é o planeta dos anéis?', opcoes: ['Saturno', 'Jupiter', 'Urano', 'Netuno'], respostaCorreta: 'Saturno', ajuda: 'Este planeta é conhecido por seu sistema de anéis composto principalmente de gelo e poeira.' }
];

const imagens = {
  marte: require('../../../assets/marte.png'),
  jupiter: require('../../../assets/jupiter.png'),
  saturno: require('../../../assets/saturno.png'),
  terra: require('../../../assets/terra.png'),
  mercurio: require('../../../assets/mercurio.png'),
  netuno: require('../../../assets/netuno.png'),
  urano: require('../../../assets/urano.png'),
  venus: require('../../../assets/venus.png'),
};

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

export default function Quiz({ navigation }) {
  const [showAll, setShowAll] = useState(false)
  const [showTutorial, setShowTutorial] = useState(true);
  const [next, setNextTutorial] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [modalVisible2, setModalVisible2] = useState(false);
  
  useEffect(() => {
    handleAutoLogin();
  }, []);

  const checkIfTutorialSeen = async (usuarioCodigo) => {
    const hasSeenTutorial = await AsyncStorage.getItem(`hasSeenTutorial_${usuarioCodigo}`);
    if (hasSeenTutorial) {
      setShowTutorial(false); // Oculta o tutorial se já foi visto para esse usuário
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const usuarioCodigo = await AsyncStorage.getItem("usuarioCodigo");
      if (token && usuarioCodigo) {
        httpClient.defaults.headers.authorization = `Bearer ${token}`;
        await checkIfTutorialSeen(usuarioCodigo); // Verifica o tutorial para o usuário logado
        navigation.navigate('Quiz');
      }
    } catch (error) {
      console.error("Erro ao verificar login automático:", error);
    }
  };

  const handleSaveStorage = async (request, password) => {
    httpClient.defaults.headers.authorization = `Bearer ${request.token}`;
    await AsyncStorage.setItem("username", request.nome);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("usuarioCodigo", String(request.usuarioCodigo));
    await AsyncStorage.setItem(`hasSeenTutorial_${request.usuarioCodigo}`, "true"); // Marca como visto para o usuário específico
    setShowTutorial(false); // Oculta o tutorial após o cadastro inicial
  };

  const skipTutorial = async () => {
    const usuarioCodigo = await AsyncStorage.getItem("usuarioCodigo");
    await AsyncStorage.setItem(`hasSeenTutorial_${usuarioCodigo}`, "true"); // Define que o tutorial foi visto para o usuário
    setShowTutorial(false); // Oculta o tutorial na tela atual
  };

  const { fontSize, isHighContrast } = useAccessibility();
  const backgroundColor = isHighContrast ? '#000' : '#FFF';
  const textColor = isHighContrast ? '#FFF' : '#000';
  const grupos = groupBy(fases, 5);

  useEffect(() => {
    // Se next for maior que 3, significa que o tutorial acabou
    if (next > 3) {
      setShowTutorial(false); // Oculta o tutorial
    }
  }, [next]);

  function Tutorial() {
    let imagem;
    if (next === 1) {
      imagem = astrolinoImage1;
    } else if (next === 2) {
      imagem = astrolinoImage2;
    } else if (next === 3) {
      imagem = astrolinoImage3;
    }

    return (
      <View style={styles.overlay}>
        <TouchableOpacity onPress={skipTutorial}>
          <Text style={[styles.skipButton, { fontSize: fontSize , display:next == 1 || next == 2 ?'block':'none'}]}>Pular</Text>
        </TouchableOpacity>
        <View
          style={[styles.containerConteudo,{flexDirection: next === 2 ? 'column-reverse' : 'column',alignItems: 'center',justifyContent: 'space-between',}]}
        >
          <View style={{ alignItems: next == 1 || next == 2?'center':'' }}>
            <View style={[styles.tutorialBox,{position:next == 2?'absolute':'stact', top:next ==2 ? -320:0}]}>
              <Text style={{ fontSize: fontSize}}>
                {next === 1
                  ? 'Olá, eu sou o Astrolino e serei seu guia nesse quiz'
                  : next === 2
                  ? 'Se tiver dificuldade para responder a pergunta, aperte este botão para ajuda.'
                  : next === 3
                  ? 'Esta barra de progresso mostra quantas perguntas faltam para concluir o quiz.'
                  : null}
              </Text>
            </View>
            <Image style={{object:'fill',position: next === 2 ? 'absolute' : 'static',right: next === 2 ? -240 : next == 3 ? -100: 0,bottom:next === 2 ? -40 : 0,}} source={imagem}/>
          </View>
          {next < 4 && ( // Verifica se o tutorial ainda não terminou
            <TouchableOpacity onPress={() => setNextTutorial((prev) => prev + 1)}>
              <Text style={[styles.buttonTutorial, { fontSize: fontSize, textAlign:'center', marginTop:next == 2? -20 :0}]}>
                {next === 3 ? 'Começar' : 'Próximo'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }


  const abrirAjuda = () => {
    setModalVisible2(true);
  };


  const Ajuda = ({ modalVisible, setModalVisible, ajudaTexto }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)} // Fechar o modal
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)} // Fechar o modal
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </Pressable>
                    <Text style={styles.title}>Ajuda</Text>
                    <Text style={styles.content}>{ajudaTexto}</Text>
                </View>
            </View>
        </Modal>
    );
};

const ajudaTexto = fases[questaoAtual].ajuda; // Texto de ajuda da pergunta atual

  const verificarResposta = () => {
    const respostaCorreta = fases[questaoAtual].respostaCorreta;

    if (opcaoSelecionada === respostaCorreta) {
      setPontos(pontos + 1);
    }

    if (questaoAtual < fases.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
      setOpcaoSelecionada(null); // Reset para a próxima questão
    } else {
      setQuizFinalizado(true);
    }
  };

  const reiniciarQuiz = () => {
    setPontos(0);
    setQuizFinalizado(false);
    setQuestaoAtual(0);
    setOpcaoSelecionada(null);
  };

  function mostarRobo() {
    // Adicione um log para depuração
    console.log("Pontos:", pontos);
  
    if (pontos === 5) {
      return (
        <>
          <Image source={require('../../../assets/robo-feliz.png')} style={{marginHorizontal:'auto',marginTop:-20}} />
          <Text style={[styles.result, { color: textColor , fontSize:fontSize, position:'relative', top:-50}]}>
            Você acertou {pontos} de {fases.length} perguntas.
          </Text>
        </>
      );
    }
  
    if (pontos === 4) {
      return (
        <>
          <Image source={require('../../../assets/robo-triste.png')} style={{marginHorizontal:'auto',position:'relative', top:-50}}/>
          <Text style={[styles.result, { color: textColor, fontSize:fontSize }]}>
            Você acertou {pontos} de {fases.length} perguntas. Você precisa acertar 5
          </Text>
        </>
      );
    }
  
    if (pontos <= 4) {
      return (
        <>
          <Image source={require('../../../assets/robo-triste.png')} style={{marginHorizontal:'auto', position:'relative', top:-50}}/>
          <Text style={[styles.result, { color: textColor, fontSize:fontSize ,  position:'relative', top:-50}]}>
            Você acertou {pontos} de {fases.length} perguntas. Você precisa acertar 5
          </Text>
        </>
      );
    }
  }
  return (
    <View style={[styles.container, { paddingTop: 25, backgroundColor }]}>

      {/*---------------------------------------container do botoao de sair, barras, e menu-------------------------------------------------- */}

      <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Image 
                source={isHighContrast ? require('../../../assets/seta-branca.png') : require('../../../assets/seta.png')}
                style={{ width: 30, height: 30, marginLeft: -5, transform: isHighContrast ? [] : [{ rotate: '-180deg' }] }}
              />
            </TouchableOpacity>
            
            <View 
              style={{
                zIndex: next === 3 ? 99 : 0, 
                borderRadius: next === 3 ? 10 : 0, 
                backgroundColor: isHighContrast ? 'transparent' : 'white', 
                paddingVertical: next === 3 ? 20 : 0, 
                paddingHorizontal: next === 3 ? 5 : 0
              }}
            >
              {grupos.map((grupo, index) => {
                if (!showAll && index > 0) return null;
                return (
                  <View key={index} style={styles.groupContainer}>
                    {grupo.map((fase, index) => (
                      <View key={index} style={styles.groupContainer}>
                        <View 
                          style={[
                            styles.grayBar, 
                            { 
                              backgroundColor: fase.id === questaoAtual 
                                ? (isHighContrast ? '#42d7f5' : 'black') 
                                : (fase.id <= pontos 
                                    ? (isHighContrast ? '#42d7f5' : '#2c2d30') 
                                    : (isHighContrast ? '#D3D3D3' : '#c8cacf'))
                            }
                          ]}
                        >
                        </View>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
              <Icon name="menu" size={50} color={textColor} style={{ marginTop: 20, marginBottom: 20 }} />
            </TouchableOpacity>
          </View>

      
      <Text style={[styles.questionTitle, { fontSize, color: textColor }]}>
        {fases[questaoAtual] == 5 ?fases[questaoAtual].pergunta: ''}
      </Text>          
      {/*--------------------------------------opcoes de resposta -------------------------------------------------- */}

      <View style={styles.container}>
        {!quizFinalizado ? (
          <>
           <Text style={[styles.questionTitle, { fontSize, color: textColor }]}>
                {fases[questaoAtual].pergunta}
            </Text>
            {fases[questaoAtual].opcoes.map((opcao, index) => {
              if (index % 2 === 0) {
                return (
                  <View key={index} style={styles.linhaOpcoes}>
                    <TouchableOpacity
                      style={[
                        styles.opcao,
                        opcaoSelecionada === fases[questaoAtual].opcoes[index] && { backgroundColor: 'black' },
                      ]}
                      onPress={() => setOpcaoSelecionada(fases[questaoAtual].opcoes[index])}
                    >
                      <Image 
                        source={imagens[opcao.toLowerCase()]} 
                        style={styles.imagem} 
                      />
                      <Text
                        style={[
                          styles.opcaoTexto,
                          { fontSize: fontSize },
                          opcaoSelecionada === fases[questaoAtual].opcoes[index] ? { color: 'white' } : { color: 'black' },
                        ]}
                      >
                        {fases[questaoAtual].opcoes[index]}
                      </Text>
                    </TouchableOpacity>

                    {fases[questaoAtual].opcoes[index + 1] && (
                      <TouchableOpacity
                        style={[
                          styles.opcao,
                          opcaoSelecionada === fases[questaoAtual].opcoes[index + 1] && { backgroundColor: 'black' },
                        ]}
                        onPress={() => setOpcaoSelecionada(fases[questaoAtual].opcoes[index + 1])}
                      >
                        <Image 
                          source={imagens[fases[questaoAtual].opcoes[index + 1].toLowerCase()]} 
                          style={styles.imagem} 
                        />
                        <Text
                          style={[
                            styles.opcaoTexto,
                            { fontSize: fontSize },
                            opcaoSelecionada === fases[questaoAtual].opcoes[index + 1] ? { color: 'white' } : { color: 'black' },
                          ]}
                        >
                          {fases[questaoAtual].opcoes[index + 1]}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }
              return null;
            })}

            {opcaoSelecionada && (
              <TouchableOpacity 
                onPress={verificarResposta}  
                style={{
                  position: 'absolute', 
                  right: 20, 
                  bottom: 0, 
                  padding: 10, 
                  backgroundColor: '#42d7f5', 
                  borderRadius: 5, 
                  width: 200,
                }}
              >
                <Text style={{ color: 'white', fontSize: fontSize, textAlign: 'center', fontWeight: '500' }}>
                  responder
                </Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <View style={{ position:'absolute', bottom:78,left:50 }}>
            {mostarRobo()} 
            <TouchableOpacity  onPress={reiniciarQuiz} style={{backgroundColor:'#EF065D', }}>
              <Text style={{color:'white', fontSize:fontSize, fontWeight:'bold',textAlign:'center', padding:10, borderRadius:20}}>Recomeçar Quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
            {/* Renderiza o tutorial se `showTutorial` for verdadeiro */}
      {showTutorial && <Tutorial />}       
         {next == 2? (
        <View style={{position:'absolute', bottom:20, left:20, padding:20, backgroundColor:'white',borderRadius:100, zIndex:next == 2 ?99:0}}>
          <View style={{backgroundColor:'#EF065D', borderRadius:100, width:50, height:50,}}>
            <Icon name="help" size={40} color={'white'} style={{margin:'auto'}} />
          </View>
        </View>
      ): 
      (
          <View style={{position:'absolute', bottom:2, left:20, padding:20, backgroundColor:'white',borderRadius:100, zIndex:next == 2 ?99:0}}>
            <TouchableOpacity 
            onPress={() => setModalVisible2(true)}
            style={{backgroundColor:'#EF065D', borderRadius:100, width:50, height:50,}}>
              <Icon name="help" size={40} color={'white'} style={{margin:'auto'}} />
            </TouchableOpacity>
            <Ajuda 
                    modalVisible={modalVisible2} 
                    setModalVisible={setModalVisible2} 
                    ajudaTexto={ajudaTexto} 
                />
          </View>
      )
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  pergunta: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  opcao: {
    width: '48%', // Cada opção ocupa 50% do espaço da linha
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    // Estilos de sombra
    shadowColor: 'black', // Cor da sombra
    shadowOffset: {
        width: 4, // deslocamento horizontal
        height: 2, // deslocamento vertical
    },
    shadowOpacity: 0.9, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 3, // Elevação da sombra para Android
},

  imagem: {
    width: 80,
    height: 80,
  },
  linhaOpcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:-26,
    marginBottom: 10,
    borderRadius: 5,          // Adiciona bordas arredondadas
    padding: 5,               // Adiciona um espaço interno
  },
  opcaoSelecionada: {
    backgroundColor: '#2c2d30', // Cor para a opção selecionada

  },
  opcaoTexto: {
    textAlign: 'center',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 25,
    marginTop: 20,
    marginLeft: 10,
  },
  groupContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  grayBar: {
    width: 40,
    height: 7,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  questionTitle: {
    marginTop:-50,
    marginBottom:50,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent:'space-between',
    zIndex: 10,
  }, 
  skipButton: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: 40, // Define o deslocamento a partir do topo
    left: 80, // Define o deslocamento a partir da direita
    zIndex: 20, // Garante que ele esteja acima de outros elementos
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  containerConteudo:{
    width:'100%',
    height:'80%',
    paddingBottom:40,
  },
  tutorialBox:{
    backgroundColor:'white',
    width:'90%',
    padding:10,
    borderRadius:10,
  },
  buttonTutorial: {
    width:148,
    fontWeight:'bold',
    backgroundColor: '#EF065D', 
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalContainer: {
    marginTop:50,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
},
closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
},
closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
},
title: {
    color: 'black',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
},
content: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
},
});
