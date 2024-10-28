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
  { id: 1, pergunta: 'Qual planeta é conhecido como o Planeta Vermelho?', opcoes: ['Marte', 'Terra', 'Vênus', 'Urano'], respostaCorreta: 'Marte' },
  { id: 2, pergunta: 'Qual é o maior planeta do sistema solar?', opcoes: ['Júpiter', 'Saturno', 'Netuno', 'Urano'], respostaCorreta: 'Júpiter' },
  { id: 3, pergunta: 'Qual planeta é conhecido como o Planeta Azul?', opcoes: ['Terra', 'Marte', 'Vênus', 'Mercúrio'], respostaCorreta: 'Terra' },
  { id: 4, pergunta: 'Qual planeta é o mais próximo do Sol?', opcoes: ['Mercúrio', 'Vênus', 'Terra', 'Marte'], respostaCorreta: 'Mercúrio' },
  { id: 5, pergunta: 'Qual é o planeta dos anéis?', opcoes: ['Saturno', 'Júpiter', 'Urano', 'Netuno'], respostaCorreta: 'Saturno' },
  { id: 6, pergunta: 'Qual é o planeta mais distante do Sol?', opcoes: ['Netuno', 'Urano', 'Saturno', 'Júpiter'], respostaCorreta: 'Netuno' },
];

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
  const [respostas, setRespostas] = useState(Array(fases.length).fill(''));
  const [pontos, setPontos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

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
  

  useEffect(() => {
    // Se next for maior que 3, significa que o tutorial acabou
    if (next > 3) {
      setShowTutorial(false); // Oculta o tutorial
    }
  }, [next]);

  function ajuda() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={{width:'80%', backgroundColor:'white', marginTop:50, borderRadius:10, padding:10}}>
            <Pressable
              style={{position:'absolute', left:10}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize:30 }}>X</Text>
            </Pressable>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 20 , textAlign:'center', fontSize:30, fontWeight:'bold'}}>Ajuda</Text>
            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', fontSize:fontSize }}>
              Esta é uma dica ou sugestão de ajuda que pode orientar o usuário ao responder as perguntas do quiz.
            </Text>
          
          </View>
        </View>
      </Modal>
    );
  }


  const handleResposta = (index) => {
    if (index < fases.length) {
        Alert.alert(
            fases[index].pergunta,
            fases[index].opcoes.map((opcao, opIndex) => `${opIndex + 1}: ${opcao}`).join('\n'),
            [
                { text: 'Cancelar', style: 'cancel' },
                ...fases[index].opcoes.map((opcao, opIndex) => ({
                    text: opcao,
                    onPress: () => verificarResposta(index, opIndex),
                })),
            ]
        );
    }
};

const verificarResposta = (index, opIndex) => {
    const respostaSelecionada = fases[index].opcoes[opIndex];
    const respostaCorreta = fases[index].respostaCorreta;

    if (respostaSelecionada === respostaCorreta) {
        Alert.alert('Resposta correta!');
        setPontos(pontos + 1);
    } else {
        Alert.alert(`Resposta incorreta! A resposta correta é: ${respostaCorreta}`);
    }

    if (index < fases.length - 1) {
        handleResposta(index + 1);
    } else {
        setQuizFinalizado(true);
        Alert.alert(`Quiz finalizado! Você acertou ${pontos + 1} de ${fases.length} perguntas.`);
    }
};
  return (
    <View style={[styles.container, { paddingTop: 25, backgroundColor }]}>

      {/*---------------------------------------container do botoao de sair, barras, e menu-------------------------------------------------- */}

      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image 
            source={isHighContrast ? require('../../../assets/seta-branca.png') : require('../../../assets/seta.png')}
            style={{ width: 30, height: 30, marginLeft: 20, transform: isHighContrast ? [] : [{ rotate: '-180deg' }] }}
          />
        </TouchableOpacity>
        <View style={{zIndex:next == 3 ? 99: 0, borderRadius:next == 3?10:0, backgroundColor:'white',paddingVertical:next == 3 ?20:0, paddingHorizontal: next == 3 ?5:0}}>
          {grupos.map((grupo, index) => {
            if (!showAll && index > 0) return null;
            return (
              <View key={index} style={styles.groupContainer}>
                {grupo.map((fase) => (
                  <View 
                    key={fase.id} 
                    style={[styles.grayBar, { backgroundColor: fase.id === 1 ? '#2c2d30' : '#c8cacf' }]}
                  >
                    {fase.id === 1 && <Text style={styles.text}></Text>}
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
      
      {/*-------------------------------------Peguntas ficaram aqui ------------------------------------------------ */}
      
      <Text style={[styles.questionTitle, { fontSize, color: textColor }]}>
        fases
      </Text>      
      {/*--------------------------------------Botão de Ajuda aqui -------------------------------------------------- */}
       {/* Botão de ajuda */}
     {next == 2? (
        <View style={{position:'absolute', bottom:20, left:20, padding:20, backgroundColor:'white',borderRadius:100, zIndex:next == 2 ?99:0}}>
          <View style={{backgroundColor:'#EF065D', borderRadius:100, width:50, height:50,}}>
            <Icon name="help" size={40} color={'white'} style={{margin:'auto'}} />
          </View>
        </View>
     ): 
     (
        <View style={{position:'absolute', bottom:20, left:20, padding:20, backgroundColor:'white',borderRadius:100, zIndex:next == 2 ?99:0}}>
          <TouchableOpacity 
            onPress={() => setModalVisible(true)}
          style={{backgroundColor:'#EF065D', borderRadius:100, width:50, height:50,}}>
            <Icon name="help" size={40} color={'white'} style={{margin:'auto'}} />
          </TouchableOpacity>
        </View>
     )
    }
        <View style={styles.container}>
            <Text style={styles.title}>Quiz de Astronomia</Text>
            {!quizFinalizado ? (
                <Button title="Começar Quiz" onPress={() => handleResposta(0)} />
            ) : (
                <Text style={styles.result}>Você acertou {pontos} de {fases.length} perguntas.</Text>
            )}
        </View>

      {/* Renderiza o tutorial se `showTutorial` for verdadeiro */}
      {showTutorial && <Tutorial />}
      {ajuda()}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop:50,
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
  
});
