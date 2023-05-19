import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CardDetails({navigation}: RootStackScreenProps<'CardDetails'>) {
  const route = useRoute();
  console.log(route.params)
  const { id } = route.params;

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
          <TouchableOpacity onPress={goBack} style={{zIndex: 1}}>
            <Image source={require('../assets/images/backArrow2.png')} style={{width: 24, height: 24, marginLeft: 22}} />     
          </TouchableOpacity>
          <Text style={styles.textHeader}>{id}</Text>
        </View>
      <View style={styles.header}>
        <View style={styles.helloContainer}>    
          <Image source={require('../assets/images/MenuScreen/Hello.png')} />
          <Text style={styles.helloTxt}>Bonne journée</Text>
        </View>
      </View>
      <ScrollView>
        {/* Afficher les détails de la carte en fonction de l'ID */}
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>dijdskjd</Text>
        </TouchableOpacity>
        {/* Ajoutez d'autres cartes ou contenu ici */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  textHeader: {
    position: 'absolute', 
    width: '100%',
    alignSelf: 'center', 
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  helloContainer: {
    flexDirection: 'row',
    paddingLeft: 10
  },
  helloTxt: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    lineHeight: 27,
    marginLeft: 8
  },
  card: {
    width: windowWidth,
    height: 200,
    backgroundColor: '#FBBFB8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
