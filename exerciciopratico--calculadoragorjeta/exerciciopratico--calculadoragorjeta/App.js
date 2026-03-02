import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function App(){

  // estados
  const [valorConta, setValorConta] = useState("")
  const [mensagemResultado, setMensagemResultado] = useState("")

  const calcularGorjeta = () => {
    if(valorConta === ""){
      setMensagemResultado("Digite o valor da conta.")
      return
    }

    const valor = parseFloat(valorConta)

    if(isNaN(valor)){
      setMensagemResultado("Valor inválido.")
      return
    }

    const gorjeta = valor * 0.1

    setMensagemResultado(`Gorjeta (10%): R$ ${gorjeta.toFixed(2)}`)
  }

  const limparCampos = () => {
    setValorConta("")
    setMensagemResultado("")
  }

  return (
    <SafeAreaProvider style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.titulo}>Calculadora de Gorjeta</Text>

        <TextInput
          placeholder="Digite o valor da conta"
          style={styles.input}
          keyboardType="numeric"
          value={valorConta}
          onChangeText={setValorConta}
        />

        <TouchableOpacity style={styles.botao} onPress={calcularGorjeta}>
          <Text style={styles.textoBotao}>Calcular Gorjeta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>

        <Text style={styles.resultado}>{mensagemResultado}</Text>
      </View>

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F6F8"
  },
  card: {
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  titulo: {
    color: "#2C3E50",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    padding: 8,
    marginBottom: 15
  },
  botao: {
    backgroundColor: "#2563EB",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5
  },
  botaoLimpar: {
    backgroundColor: "#6B7280",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold"
  },
  resultado: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 15,
    textAlign: "center"
  }
})