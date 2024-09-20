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

const Constelacao = ({ route, navigation }) => {
    const { constelacao } = route.params;
    
    return (
        <ImageBackground source={require('../../../assets/background2.png')} resizeMode="cover" style={styles.image}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.botaoVoltar}>
                <Image source={require('../../../assets/seta-branca.png')} style={styles.imagemApresentacao} />
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={styles.apresentacao}>
                    <TouchableOpacity onPress={() => { navigation.navigate("Constelacoes") }} style={styles.botaoVoltar}>
                        <Image source={require('../../../assets/seta-branca.png')} style={styles.imagemApresentacao} />
                    </TouchableOpacity>
                    <Image source={constelacao.img} style={styles.apresentacaoImagem} />
                    <View style={styles.box4}>
                        <Text style={{ fontSize: 50, fontWeight: 'bold' }}>{constelacao.title}</Text>
                        <Text style={styles.textDescription2}>{constelacao.description}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

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
        fontWeight: 'bold'
    },
    containerTexto: {
        position: 'relative',
        top: -50,
    },
    textDescription1: {
        fontSize: 15,
        opacity: 0.5
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
        width: Dimensions.get('window').width ,
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
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',  // Torna o box1 absoluto
        top: '20%',  // Centraliza verticalmente com um deslocamento
        zIndex: 10,  // Mantém o box1 acima dos outros    
        padding: 5,
        paddingVertical: 17
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
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    textoExplicacao: {
        textAlign: 'center',
        position: 'absolute',
        top: -30,
        right: 10,
        color: '#00C1CF',
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
        objectFit: 'contain'

    },
    textodrag: {
        textAlign: 'center',
        width: 250,
        color: 'white',
        fontSize: 20,
        margin: 'auto',
        position: "absolute",
        bottom: 60,
        alignSelf: "center"
    }
});

export default Constelacao;
