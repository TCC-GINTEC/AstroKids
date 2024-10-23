import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const fases = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function Trilha({ navigation }) {
  return (
    <View style={styles.container}>
      {fases.map((f) => {
        return (
          <TouchableOpacity key={f.id} style={styles.botao}  onPress={() => navigation.navigate('Quiz', {fase:f.id})}>
            <Text style={styles.fase}>Fase</Text>
            <Text style={styles.idfase}>{f.id}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#4B0082', // Roxo mais escuro
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  botao: {
    backgroundColor: '#8A2BE2', // Cor do botão
    paddingVertical: 15, // Espaçamento vertical dentro do botão
    paddingHorizontal: 30, // Espaçamento horizontal dentro do botão
    borderRadius: 25, // Bordas arredondadas
    marginVertical: 10, // Espaçamento entre os botões
    alignItems: 'center', // Centraliza o texto dentro do botão
    width: '80%', // Largura dos botões ocupando 80% da tela
  },
  fase: {
    color: 'white',
    fontSize: 24,
  },
  idfase: {
    color: 'white',
    fontSize: 18,
  },
});
