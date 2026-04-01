import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, ActivityIndicator, View, FlatList, StyleSheet,} from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  // status de devolução da API
  const [carregando, setCarregando] = useState(true);

  // vetor de cotações
  const [cotacoes, setCotacoes] = useState([]);

 // vai ser chamada quando carregar a aplicação
  useEffect(() => {
    carregarCotacoes();
  }, []);

  // função que consome a api
  const carregarCotacoes = async () => {
    try {
       // 1. faz a requisição
      const resposta = await fetch(
        'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL'
      );
      // 2. converte a resposta para JSON
      const dados = await resposta.json();

      // transforma o objeto em array
      const listaCotacoes = Object.values(dados);

      // 3. salva na variável de estado
      setCotacoes(listaCotacoes);
    } catch (erro) {
      console.error('Erro ao carregar cotações:', erro);
      alert('Não foi possível carregar as cotações');
    } finally {
      // 4. desativa o ícone de carregamento
      setCarregando(false);
    }
  };

  // mostra cada item da lista
  const renderItem = ({ item }) => {
    const variacaoPositiva = parseFloat(item.pctChange) >= 0;

    return (
      <View style={styles.card}>
        <Text style={styles.nome}>{item.name}</Text>
        <Text style={styles.codigo}>
          {item.code}/{item.codein}
        </Text>

        <Text style={styles.texto}>Valor de compra:</Text>
        <Text style={styles.valor}>
          R$ {parseFloat(item.bid).toFixed(2).replace('.', ',')}
        </Text>

        <Text style={styles.texto}>Variação:</Text>
        <Text
          style={[
            styles.variacao,
            variacaoPositiva ? styles.positivo : styles.negativo,
          ]}>
          {item.pctChange}%
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cotações do dia</Text>        
        { 
          /* Exibe o ícone de carregamento enquanto busca os dados */
          carregando ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#888" />
            <Text>Carregando dados...</Text>
          </View>
        ) : (
          <FlatList
            data={cotacoes}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  codigo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  texto: {
    fontSize: 14,
    marginTop: 4,
  },
  valor: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  variacao: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positivo: {
    color: 'green',
  },
  negativo: {
    color: 'red',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
