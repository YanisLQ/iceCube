import { StyleSheet, TouchableOpacity, Button, Image, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alignCenter}>
        <Text style={styles.title}>MealMate</Text>
        <Text style={styles.subtitle}>Commander directement sur mobile</Text>
      </View>
          <Image source={require('../assets/images/HomeScreen/img_display.png')} style={styles.image} />
        <View style={styles.alignCenter}>
          <TouchableOpacity onPress={() => navigation.replace('Register')} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Je crée un compte</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.buttonStyle2}>
              <Text style={styles.buttonText2}>Inscrivez-vous</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.confidentialPolicy}>
          <Text style={{textAlign: 'center'}}>
            <Text style={styles.premierText}>En vous inscrivant, vous acceptez nos </Text>
            <Text style={styles.secondText} onPress={() => console.log('page register')}>Conditions Générales d'Utilisation. </Text>
            <Text style={styles.premierText}>Et si vous voulez savoir comment nous traitons vos données, consultez notre</Text>
            <Text style={styles.secondText} onPress={() => console.log('page se connecter')}> Politique de confidentialité.</Text>
          </Text>
        </View>
          <TouchableOpacity style={{backgroundColor: '#F2F2F2', position: 'absolute', bottom: 16, alignSelf: 'center'}}>
            <Text style={{textDecorationLine: 'underline'}}>Se connecter en tant qu'invité</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  image: {
    width: windowWidth,
  },
  title: {
    fontFamily: 'Inter_700Bold',
     fontSize: 32
  },
  subtitle: {
    fontFamily: 'Inter_600SemiBold',
    color: '#565656',
    fontSize: 12,
  },
  buttonStyle: {
    backgroundColor: '#F0604D',
    width: windowWidth - 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 24,
    height: 50
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold'
  },
  buttonStyle2: {
    width: windowWidth - 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    marginTop: 10,
    height: 50
  },
  buttonText2: {
    color: '#0F2026',
    fontSize: 16,
  },
  DarkTxt: {
    fontSize: 14,
    color: '#0F2026',
  },
  BlueTxt: {
    fontSize: 16,
    color: '#00BDE7',
  },
  alignCenter: {
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confidentialPolicy: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  premierText: {
    fontSize: 12,
  },
  secondText: {
    fontSize: 12,
    color: '#00BDE7',
  }
});