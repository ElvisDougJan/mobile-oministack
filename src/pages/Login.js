import React, { useState, useEffect } from 'react';
import { Platform, KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native'
import logo from './../assets/logo.png'
import api from './../services/api'
import AsynStorage from '@react-native-community/async-storage'

export default function Login({ navigation }) {
  const [user, setUser] = useState('')

  useEffect(() => {
    AsynStorage.getItem('user')
      .then(user => {
        if (user) {
          navigation.navigate('Main', { user })
        }
      })
  }, [])

  async function handleLogin () {
    const response = await api.post('devs/', { username: user })

    const { _id } = response.data

    await AsynStorage.setItem('user', _id)
    
    navigation.navigate('Main', { user: _id })
  }

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo}/>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no GitHub"
        placeholderTextColor="#666"
        style={styles.input}
        value={user}
        onChangeText={setUser}
        />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: '#DF4723',
    alignSelf: 'stretch',
    height: 46,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
})