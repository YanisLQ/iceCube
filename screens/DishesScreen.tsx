import React, { useState, useContext } from "react";
import { RootStackScreenProps } from "../types";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PanierContext } from "../context/PanierContext";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function DishesScreen({ navigation }: RootStackScreenProps<'DishesScreen'>) {
  const { addToPanier, getNombreElementsPanier,  } = useContext(PanierContext);
  const route = useRoute();

  const { plats, user, restaurantId } = route.params;

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);
console.log(user)
  const handleIngredientPress = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  console.log(plats)
  const handleAjouterPanier = () => {
    // Créez un objet pour représenter l'élément ajouté au panier
    const item = {
      id: getNombreElementsPanier(),
      nom: plats.nom,
      ingredients: selectedIngredients,
      quantite: quantity,
      prix: plats.prix,
      urlPhoto: plats.urlPhoto
    };
    addToPanier(item);
    console.log("item ajouté au panier")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
        <TouchableOpacity onPress={navigation.goBack} style={{zIndex: 1}}>
          <Image source={require('../assets/images/backArrow2.png')} style={{width: 24, height: 24, marginLeft: 22}} />     
        </TouchableOpacity>
        <Text style={styles.textHeader}>{plats.nom}</Text>
      </View>
      <View style={styles.dishDetails}>
      <Image source={require('../assets/images/leftCircle.png')} style={{position: 'absolute', top: 0, left: 0, zIndex: -1}} />
      <Image source={require('../assets/images/rightCircle.png')} style={{position: 'absolute',top: windowHeight * 0.50, right: 0}}/>
        <View style={styles.infoContainer}>
          <View style={styles.ingredientsContainer}>
            <FlatList
              data={plats.ingredients}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.ingredientItem, selectedIngredients.includes(item) && styles.selectedIngredientItem]}
                  onPress={() => handleIngredientPress(item)}
                >
                  <Text style={styles.ingredientText}>{item}</Text>
                  {selectedIngredients.includes(item) && (
                    <Ionicons name="close" size={18} color="black" style={styles.crossIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.txtImage}>{plats.nom}</Text>
          <Text style={styles.txtImage2}>{plats.categoriesId}</Text>
          <Image source={{ uri: plats.urlPhoto }} style={styles.image} />
        </View>
      </View>
      <View style={styles.dishList}>
        <Text style={styles.priceTxt}>{plats.prix}€</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Ionicons name="remove" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Ionicons name="add" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleAjouterPanier} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Mettre au panier</Text>
      </TouchableOpacity>

      {
        getNombreElementsPanier() != 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('Panier', {user: user, restaurantId: restaurantId})} style={styles.buttonStyle2}>
          <Text style={styles.buttonText}>Mon panier &#40;{getNombreElementsPanier()}&#41;</Text>
        </TouchableOpacity>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    height: '100%',
  },  textHeader: {
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
  dishDetails: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6'
  },
  imageContainer: {
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 8,
    
  },
  txtImage: {
    marginRight: 18,
    textAlign: 'right',
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
  },
  txtImage2: {
    marginRight: 18,
    textAlign: 'right',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
  },
  ingredientsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    borderColor: '#676767'
  },
  selectedIngredientItem: {
    backgroundColor: '#FFDFDB',
  },
  ingredientText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    marginRight: 8,
  },
  crossIcon: {
    marginLeft: 'auto',
  },
  dishList: {
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  priceTxt: {
    marginTop:8,
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quantityText: {
    marginHorizontal:16,
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold'
  },
  buttonStyle: {
    backgroundColor: '#F0604D',
    width: windowWidth * 0.60,
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
    alignSelf: 'center'
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
