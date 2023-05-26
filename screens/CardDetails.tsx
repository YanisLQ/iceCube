import React, {useState, useEffect, useContext} from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, auth } from '../firebase-config';
import { PanierContext } from '../context/PanierContext';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, query, where } from "firebase/firestore";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CardDetails({navigation}: RootStackScreenProps<'CardDetails'>) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [card, setCards] = useState([])
  const [filteredCards, setFilteredCards] = useState([]);
  const { getNombreElementsPanier } = useContext(PanierContext);

  const route = useRoute();
  const { id, user, restaurantId, restaurantNameId, numtable } = route.params;
  const goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    // Récupérer les catégories depuis la collection "plats" dans Firebase
    const fetchCategories = async () => {
      try {
        const q = query(collection(db, "plats"), where("categoriesId", "==", id));
        const querySnapshot = await getDocs(q);
        const categoriesData = querySnapshot.docs.map(doc => doc.data().souscat);
        const mapCard = querySnapshot.docs.map(doc => doc.data());
        setCards(mapCard)
        setCategories(categoriesData);
        setActiveCategory(categoriesData[0]); // Définir la première catégorie comme active par défaut
      } catch (error) {
        console.log('Erreur lors de la récupération des catégories :', error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const filterCardsByCategory = () => {
      const filtered = card.filter((card) => card.souscat === activeCategory);
      console.log(filtered)
      setFilteredCards(filtered);
    };
    filterCardsByCategory();
  }, [activeCategory]);
  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 12}}>
          <TouchableOpacity onPress={goBack} style={{zIndex: 1}}>
            <Image source={require('../assets/images/backArrow2.png')} style={{width: 24, height: 24, marginLeft: 22}} />     
          </TouchableOpacity>
          <Text style={styles.textHeader}>{id}</Text>
        </View>
      <View style={styles.header}>
        <View style={styles.helloContainer}>    
          <Image source={require('../assets/images/MenuScreen/Hello.png')} />
          <Text style={styles.helloTxt}>Bonne journée,</Text>
          <Text style={styles.helloTxt2}>{user.username}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.menu}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.menuButton, activeCategory === category && styles.activeMenuButton]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[styles.menuButtonText, activeCategory === category && styles.activeMenuButtonText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cardsContainer}>
          {filteredCards.map((card) => (
            <TouchableOpacity key={card} style={styles.card} onPress={() => navigation.navigate('DishesScreen', {plats: card, user: user, restaurantId: restaurantId, restaurantNameId: restaurantNameId, numtable: numtable})}>
              <Text style={styles.cardTitle}>{card.nom}</Text>
              <View style={styles.tableContainer}>
              {card.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.ingredientText}>{ingredient} </Text>
              ))}
              </View>
              <View style={styles.bottomCards}>
                <Text style={styles.priceTxt}>{card.prix}€</Text>
                <Image source={require('../assets/images/CardDetails/fleche.png')} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {
        getNombreElementsPanier() != 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('Panier', {restaurantId: restaurantId, user: user, restaurantNameId: restaurantNameId})} style={styles.buttonStyle2}>
          <Text style={styles.buttonText}>Mon panier &#40;{getNombreElementsPanier()}&#41;</Text>
        </TouchableOpacity>
        )
      }
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
    paddingHorizontal: 16,
    marginVertical: 15
  },
  helloContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  helloTxt: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 22,
    lineHeight: 27,
    marginLeft: 8
  },
  helloTxt2: {
    fontFamily: 'Inter_700Bold',
    fontSize: 22,
    lineHeight: 27,
    marginLeft: 2,
    textTransform: 'capitalize'
  },
  menu: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
  },
  menuButton: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    // backgroundColor: '#FBBFB8',
  },
  activeMenuButton: {
    // backgroundColor: '#FFDFDB',
    borderBottomWidth: 2,
    borderColor: '#FFDFDB'
  },
  menuButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize'
  },
  activeMenuButtonText: {
    color: '#FF5753',
  },
  cardsContainer: {
    paddingHorizontal: 22,
  },
  card: {
    width: '100%',
    height: windowHeight * 0.20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    paddingLeft: 18,
  },
  cardTitle: {
    paddingTop: 14,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Inter_500Medium'
  },
  tableContainer: {
    flexDirection: 'row', 
    textTransform: 'capitalize',
  },
  ingredientText: {
    fontFamily: 'Inter_400Regular',
    paddingTop: 8,
    fontSize: 12
  },
  bottomCards:{
    position:'absolute',
    bottom: 18,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    // backgroundColor: 'red',
    width: '100%',
    paddingRight: 16
  },
  priceTxt:{
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#F0604D'
  },
  buttonStyle2: {
    backgroundColor: '#393939',
    width: windowWidth * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 36,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 45
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight:'bold',
    fontFamily: 'Inter_600SemiBold',
  },
});
