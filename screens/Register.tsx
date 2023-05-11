import React, { useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { RootTabScreenProps } from '../types';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase-config';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const app = initializeApp(firebaseConfig);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const windowWidth = Dimensions.get('window').width;

  const auth = getAuth(app);


  const handleLogin = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("account create")
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error => {
      console.log(error);
    })
  };
  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 250,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
