import React from "react";
import { RootStackScreenProps } from "../types";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMenu } from "../api/basicFunction";
import { useState, useEffect } from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({navigation}: RootStackScreenProps<'Menu'>) {
  
    const [menu, setMenu] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const getM = await getMenu('MenuSun')
            console.log(getM)
            if(getM){
                setMenu(getM);
            }

          } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
          }
        };
        
        fetchData();
      }, []);

      if(!menu){
        return (
            <View>
                <Text>chargement</Text>
            </View>
        )
      }

      const renderItem = ({ item, index }) => {
        const cardColor = index % 2 === 0 ? '#FBBFB8' : '#FFDFDB';
        const handleCardPress = () => {
            console.log('entre dedans: ' + item)
            navigation.navigate('CardDetails', { id: item });
          };

        return (
          <View style={styles.cardContainer}>
            {/* <Image source={require('../assets/images/MenuScreen/Rectangle.png')} style={styles.cardBackground} /> */}
            <TouchableOpacity onPress={handleCardPress } style={[styles.card, { backgroundColor: cardColor }]}>
                <View style={styles.cardContent}>
                    <Image source={require('../assets/images/MenuScreen/salade.png')} />
                    <Text style={styles.cardTxt}>{item}</Text>
                </View>
            </TouchableOpacity>
          </View>
        );
      };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.helloContainer}>    
              <Image source={require('../assets/images/MenuScreen/Hello.png')} />
              <Text style={styles.helloTxt}>Bonne journée</Text>
          </View>
          <View style={styles.orderContainer}>
              <Text style={styles.orderTxt1}>Qu'est-ce que </Text>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={styles.orderTxt1}>vous </Text>
                  <Text style={styles.orderTxt2}>souhaitez commander ?</Text>
              </View>                
          </View>
          <View style={styles.containerCard}>
                <FlatList
                  data={Object.values(menu)}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.flatListContentContainer}
                  numColumns={2}
                />
          </View>
        </ScrollView>
        <Image source={require('../assets/images/leftCircle.png')} style={{position: 'absolute', top: windowWidth * 0.35 ,left:0, zIndex: -1}} />
        <Image source={require('../assets/images/rightCircle.png')} style={{position: 'absolute',bottom: windowHeight * 0.1, right: 0}}/>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6F6F6',
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
    orderContainer: {
        marginTop: 26,
        paddingLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 18,
    },
    orderTxt1: {
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
    },
    orderTxt2:{
        fontFamily: 'Inter_700Bold',
        fontSize: 24,
        color: '#F0604D'
    },
    containerCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 16,
        width: windowWidth,
        // backgroundColor: 'red'
    },
    flatListContentContainer: {
    },
    card: {
        width: windowWidth * 0.42,
        height: windowHeight * 0.25,
        borderRadius: 12,
        zIndex: 1,
    },
    cardBackground: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        borderRadius: 12,
        // backgroundColor: 'red'
    },
    cardContainer: {
        width: '50%',
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    cardContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTxt:{
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        lineHeight: 22,
        paddingTop: 14
    },
});
