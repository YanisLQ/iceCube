import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { getRestaurant } from '../api/basicFunction';
const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const route = useRoute();
  const { restaurantId, numtable } = route.params;
  const [restaurant, setRestaurant] = useState(null)
  // console.log(restaurantId)
  useEffect(() => {
    const checkCurrentUser = async () => {
      setRestaurant(await getRestaurant(restaurantId));
    };
  
    checkCurrentUser();
  }, []);

  if (!restaurant) {
    return (
      <View>
        <Text>Chargement</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.alignCenter}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>Commander directement sur mobile</Text>
        <Text style={styles.subtitle2}>by MeatMate</Text>
      </View>
          <Image source={require('../assets/images/HomeScreen/img_display.png')} style={styles.image} />
        <View style={styles.alignCenter}>
          <TouchableOpacity onPress={() => navigation.replace('Login', {restaurantId: restaurantId, numtable: numtable})} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.replace('Register', {restaurantId: restaurantId, numtable: numtable})} style={styles.buttonStyle2}>
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
    height: windowHeight / 2,
  },
  title: {
    fontFamily: 'Inter_700Bold',
     fontSize: 32,
     color: '#3A3A3A'
  },
  subtitle: {
    fontFamily: 'Inter_600SemiBold',
    color: '#565656',
    fontSize: 12,
  },
  subtitle2: {
    fontFamily: 'Inter_500Medium',
    color: '#565656',
    textDecorationStyle: 'solid',
    fontSize: 12,
  },
  buttonStyle: {
    backgroundColor: '#F0604D',
    width: windowWidth - 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 24,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold',
    fontFamily: 'Inter_600SemiBold',
  },
  buttonStyle2: {
    width: windowWidth - 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1.5,
    marginTop: 10,
    height: 50,
  },
  buttonText2: {
    color: '#0F2026',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  DarkTxt: {
    fontSize: 10,
    color: '#0F2026',
    fontFamily: 'Inter_500Medium',
  },
  BlueTxt: {
    fontSize: 10,
    color: '#00BDE7',
    fontFamily: 'Inter_500Medium',
  },
  alignCenter: {
    marginTop: 24,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confidentialPolicy: {
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  premierText: {
    color: '#3A3A3A',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
  },
  secondText: {
    fontSize: 10,
    color: '#F79F95',
  }
});