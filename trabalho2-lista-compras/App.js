import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, StyleSheet} from 'react-native';
import { useState } from 'react';

export default function App() {
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lista, setLista] = useState([]);

  const adicionarItem = () => {
    if (produto.trim().length == 0 || quantidade.trim().length == 0) return;

    const novo = {
      id: Date.now().toString(),
      titulo: produto + ' (' + quantidade + ')',
    };

    setLista([...lista, novo]);

    setProduto('');
    setQuantidade('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.textoItem}>{item.titulo}</Text>

      <TouchableOpacity
        onPress={() => removerItem(item.id)}
        style={styles.botaoRemover}>
        <Text style={styles.textoBotaoRemover}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
  const removerItem = (id) => {
    setLista(lista.filter((item) => item.id != id));
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.titulo}>🛒 Lista de Compras</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          value={produto}
          onChangeText={setProduto}
          placeholder="Produto (ex: Feijão)"
        />

        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          placeholder="Qtd (ex: 2kg)"
        />

        <TouchableOpacity style={styles.botaoAdd} onPress={adicionarItem}>
          <Text style={styles.textoBotaoAdd}>Adicionar à Lista</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E5E2D4',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8B3A00',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },

  botaoAdd: {
    backgroundColor: '#D97706',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBotaoAdd: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },

  textoItem: {
    fontSize: 16,
  },

  botaoRemover: {
    padding: 5,
  },

  textoBotaoRemover: {
    fontSize: 18,
  },
});
