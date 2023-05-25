import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import { RootTabScreenProps } from '../types';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { Feather, AntDesign } from '@expo/vector-icons';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase-config';
import { useRoute } from '@react-navigation/native';
import { getUserFromEmail } from '../api/basicFunction';
// Utilisez cette fonction pour récupérer les données

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const route = useRoute();
  const {restaurantId, numtable} = route.params

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const auth = getAuth();
  // const db = getFirestore();

  const getMenu = async () => {
    const menuSnap = await getDocs(collection(db, "restaurants"));
    const menuList = menuSnap.docs.map(doc => doc.data());
    return menuList;
  }

  const handleRegister = async () => {
    const userEmail = !email.includes("@") ? `${name}@example.com` : email;
    try {
      console.log("Starting sign up process...");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
        );
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          email: user.email,
          uid: user.uid,
          username: name,
          userRole: 0
        });
        console.log("User document created successfully.");
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          console.log("User data retrieved from Firestore:", userDoc.data());
          // setIsLoggedIn(true);
        } else {
          console.log("User document not found in Firestore.");
        }
        let userAuth = await getUserFromEmail(user.email);
        navigation.navigate('Menu', {user: userAuth, restaurantId: restaurantId, numtable: numtable})
    } catch (error) {
      console.log("erreur");
    }
  };

  getMenu().then(menuList => console.log(menuList));

  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', margin: 54}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
          <TouchableOpacity onPress={() =>navigation.navigate('Home', {restaurantId: restaurantId, numtable: numtable})} style={{zIndex: 1}}>
            <Image source={require('../assets/images/backArrow2.png')} style={{width: 24, height: 24}} />     
          </TouchableOpacity>
          <Text style={styles.textHeader}>S'inscrire</Text>
        </View>
        <View style={styles.searchSection}>
          <Feather name="mail" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            placeholder="Entrez votre Prénom"
            onChangeText={setName}
            value={name}
            />
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
        <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
          <Text style={styles.button}>Inscription</Text>
        </TouchableOpacity>
        <View style={styles.confidentialPolicy}>
          <Text style={{textAlign: 'center'}}>
            <Text style={styles.premierText}>En vous inscrivant, vous acceptez nos </Text>
            <Text style={styles.secondText} onPress={() => console.log('page register')}>Conditions Générales d'Utilisation. </Text>
            <Text style={styles.premierText}>Et si vous voulez savoir comment nous traitons vos données, consultez notre</Text>
            <Text style={styles.secondText} onPress={() => console.log('page se connecter')}> Politique de confidentialité.</Text>
          </Text>
        </View>
      </View>
      <Image source={require('../assets/images/leftCircle.png')} style={{position: 'absolute', top: windowHeight / 1.75, left: 0, zIndex: -1}} />
      <Image source={require('../assets/images/rightCircle.png')} style={{position: 'absolute',bottom: windowHeight * 0.1, right: 0, zIndex: -1}}/>
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
    marginTop: 50,
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
    color: '#576D75',
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  secondText: {
    fontSize: 12,
    color: '#F79F95',
  },
  confidentialPolicy: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
});
