import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import { RootTabScreenProps } from '../types';
import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { Feather, AntDesign } from '@expo/vector-icons'; 
import { db, auth } from '../firebase-config';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, query, where } from "firebase/firestore";
import { getUserFromEmail } from '../api/basicFunction';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)
  const auth = getAuth();


    const handleLogin = async () => {
      console.log("Tentative de connexion...");
      let userEmail = email;
      let userAuth = user;
      if (!email.includes("@")) {
        userEmail = await getEmailFromUsername(email);
        userAuth = await getUserFromEmail(userEmail);
        setUser(userAuth)
        if (!userEmail) {
          console.log("Nom d'utilisateur introuvable");
          return;
        }
      }
      await signInWithEmailAndPassword(auth, userEmail, password)
        .then((userCredential) => {
          console.log("Connexion réussie");
          navigation.navigate('Menu', { user: userAuth })
          // setIsLoggedIn(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("Échec de la connexion :", errorMessage);
        });
    };

    const getEmailFromUsername = async (username) => {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        return user.email;
      } else {
        return null;
      }
    };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/images/Register/tache.png')} style={styles.image} />
      </View>
      <View style={{position: 'absolute', margin: 54}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
          <TouchableOpacity onPress={() =>navigation.navigate('Home')} style={{zIndex: 1}}>
            <Image source={require('../assets/images/backArrow.png')} style={{width: 24, height: 24}} />     
          </TouchableOpacity>
          <Text style={styles.textHeader}>Se connecter</Text>
        </View>
        <View style={styles.searchSection}>
          <Feather name="mail" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            placeholder="Entrez votre identifiant/Mail"
            onChangeText={setEmail}
            value={email}
            />
        </View>
        <View style={styles.searchSection}>
          <AntDesign name="lock1" size={24} color="black" style={styles.searchIcon}/>
          <TextInput
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <Text style={styles.forgotPasswdText}>Mot de passe oublié ?</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.button}>Se connecter</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12}}>
          <Text style={styles.premierText}>Pas de compte ?</Text>
          <Text style={styles.secondText} onPress={() => console.log('page register')}> Inscrivez-vous </Text>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: 20,
  },
  image: {
    width: windowWidth,
    height: windowHeight / 2.25

  },
  textHeader: {
    position: 'absolute', 
    width: '100%',
    alignSelf: 'center', 
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    // width: ,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 70,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    color: '#000',
    fontFamily: 'Inter_700Bold',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#EEEEEE',
    width: windowWidth / 1.15,
    marginTop: 8,
    marginBottom: 8,
    height: 38
  },
  searchIcon: {
    // padding: 10,
    padding: 5,
    paddingRight: 10,
  },
  forgotPasswdText: {
    color: '#FFDFDB',
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    paddingTop: 24
  },
  premierText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#0F2026',
  },
  secondText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#F38071'
  }
});

