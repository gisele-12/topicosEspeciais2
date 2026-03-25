import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, StatusBar, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
/* GISELE APARECIDA RONCOLETA ADS MATUTINO
AsyncStorage salva dados
Componentes do React Native:
View = uma <div> 
TextInput = campo de digitação
TouchableOpacity = botão clicável
FlatList = lista otimizada (for automático)
useState = guarda dados (estado)
useEffect = executa ações automáticas
MaterialCommunityIcons = ícones 
*/

const STORAGEY_KEY = '@meus_livros';
/*é o “nome” onde os dados ficam salvos (chave do storage*/

export default function App() {
  const [livro, setLivro] = useState(""); /*string */
  const [autor, setAutor] = useState(""); /*string */
  const [livros, setLivros] = useState([]);
  /* 
    ESTADOS (useState) cada um salva:
    livro = oque foi digitado no campo livro
    autor = oque foi digitado no campo do autor 
    livros = lista de livros (vetor)
    */

  useEffect(() => {
    (async () => {
      try {
        // recupera o que tem no cookie @lista_livros
        const salvo = await AsyncStorage.getItem(STORAGEY_KEY)
        if (salvo) {
          // recupera o conteúdo do local storage
          setLivros(JSON.parse(salvo))
        }
      } catch (e) {
       Alert.alert("Erro", "Não foi possível carregar os dados")
      }
    })()
  }, [])
  /*
    useEffect: CARREGA DADOS
    Executa quando o app abre, Busca os dados salvo no disco
    Converte de texto = objeto (JSON.parse), Coloca dentro do vetor
    */

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(livros))
      } catch (e) {
        Alert.alert("Erro", "Não foi possível salvar os dados")
      }
    })()
  }, [livros])  

  /*
    useEffect: SALVA OS DADOS
    Toda vez que muda o estado, é salvo automaticamente:
    adicionou → salva
    removeu → salva
    */

  const adicionaLivro = () => {
    if (!livro || !autor) { 
      Alert.alert("Preencha o título e o autor do livro")
      return}

    const novo = {
        id: Date.now().toString(),
        titulo: livro,
        autor: autor,
        status: "lendo"
    }

    setLivros([...livros, novo])
    setLivro("")
    setAutor("")
}
  /*
   FUNÇÃO ADICIONAR:
   pega o texto digitado, cria um objeto novo e adiciona na lista
   Date.now(): gera um ID único
   */
   const removerLivro = (id) => {
    setLivros((prev) => prev.filter((l) => l.id != id))
  }

  // alterar os status de leitura do livro
  const alterarStatus = (id) => {
    setLivros((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "lido" ? "lendo" : "lido" }
          : l
      )
    )
  }

  // contador
  const lidos = livros.filter((l) => l.status === "lido").length

    /*RENDERIZAÇÃO DA LISTA: Essa função desenha cada item da lista
    dentro dela mostra o nome do livro e remove o livro
    {item.nome} Mostra o nome do livro
    remove quando clica no botao: onPress={() => removerLivro(item.id)}*/
    const renderItem = ({ item }) => (   
    <View style={[styles.itemLista,item.status === "lido" && 
    { backgroundColor: "#DCFCE7" }
    ]}
    >
    <TouchableOpacity
        style={styles.conteudoItem}
        onPress={() => alterarStatus(item.id)}
    >
    <MaterialCommunityIcons
        name={item.status === "lido" ? "check-circle" : "book-open"}
        size={22}
        color="#6366F1"
    />  
    
    <View>
      <Text style={styles.tituloLivro}>{item.titulo}</Text>
      <Text style={styles.autorLivro}>{item.autor}</Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => removerLivro(item.id)}>
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={22}
        color="#EF4444"
        />
      </TouchableOpacity>
    </View>
  ) 
      /*como alterou a lista de livros, a função useEffect vai ser executada              automaticamente, aqui o codigo percorre a lista e remove o item com aquele id
filter = cria nova lista sem o item*/

//LISTA (FlatList) pega a lista de livros e mostra na tela
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={32}
          color="#6366F1"
        />

      <Text style={styles.titulo}> Meus Livros favoritos </Text>
      </View>

      <Text style={styles.contador}>Você já leu {lidos} livros</Text>

      <View style={styles.entrada}>
        <TextInput //INPUTS (campos de texto)
          style={styles.caixaEntrada}
          placeholder="Titulo do Livro"
          value={livro}
          onChangeText={setLivro}
        />
      </View>

      <View style={styles.entrada}>
        <TextInput
          style={styles.caixaEntrada}
          placeholder="Nome do autor"
          value={autor}
          onChangeText={setAutor}
        />
        <TouchableOpacity style={styles.botao} onPress={adicionaLivro}>
          <MaterialCommunityIcons name="plus" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
      
      <FlatList 
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaProvider>
  );
}
//STYLES: Só visual (cores, tamanho, etc.)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1E293B",
    marginLeft: 10
  },
  contador: {
    textAlign: "center",
    marginBottom: 15,
    color: "#475569"
  },
  entrada: {
    flexDirection: "row",
    marginBottom: 15
  },
  caixaEntrada: {
    flex: 1,
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 20
  },
  botao: {
    width: 55,
    height: 55,
    backgroundColor: "#6366F1",
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  itemLista: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    justifyContent: "space-between",
    alignItems: "center"
  },
  conteudoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  tituloLivro: {
    fontWeight: "bold",
    fontSize: 16
  },
  autorLivro: {
    color: "#64748B"
  }
})
