import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { Accelerometer } from 'expo-sensors';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [imagem, setImagem] = useState(null);

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Permissão necessária", "Precisamos de acesso às suas fotos.");
      return;
    }

    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const criarHeroi = () => {
    if (!imagem) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert("Erro", "Selecione uma imagem primeiro!");
      return;
    }

    navigation.navigate('Hero', { image: imagem });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Herói</Text>

      <TouchableOpacity onPress={selecionarImagem}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoVazia]}>
            <Text>Selecionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={criarHeroi}>
        <Text style={styles.txtBotao}>CRIAR HERÓI</Text>
      </TouchableOpacity>
    </View>
  );
}

function HeroScreen({ route, navigation }) {
  const { image } = route.params;

  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  const [forca, setForca] = useState(0);
  const [agilidade, setAgilidade] = useState(0);
  const [magia, setMagia] = useState(0);

  useEffect(() => {
    const sub = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });

    Accelerometer.setUpdateInterval(100);

    return () => sub.remove();
  }, []);

  const { x, y, z } = data;
  const aceleracaoTotal = Math.abs(x) + Math.abs(y) + Math.abs(z);

  useEffect(() => {
    if (aceleracaoTotal > 3.5) {
      setForca(Math.floor(Math.random() * 100));
      setAgilidade(Math.floor(Math.random() * 100));
      setMagia(Math.floor(Math.random() * 100));

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [aceleracaoTotal]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.foto} />

      <Text style={styles.atributo}>💪 Força: {forca}</Text>
      <Text style={styles.atributo}>⚡ Agilidade: {agilidade}</Text>
      <Text style={styles.atributo}>✨ Magia: {magia}</Text>

      <TouchableOpacity 
        style={styles.botaoDelete} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.txtBotao}>DELETAR HERÓI</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Hero" component={HeroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  titulo: { 
    fontSize: 24, 
    marginBottom: 20 
  },

  foto: { 
    width: 200, 
    height: 200, 
    borderRadius: 100 
  },

  fotoVazia: { 
    backgroundColor: '#ccc', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  botao: { 
    marginTop: 20, 
    backgroundColor: '#6366F1', 
    padding: 15, 
    borderRadius: 10 
  },

  botaoDelete: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10
  },

  txtBotao: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },

  atributo: { 
    fontSize: 20, 
    marginVertical: 5 
  }
});
