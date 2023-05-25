import React, { useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { PanierContext } from "../context/PanierContext";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import { db, auth } from '../firebase-config';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
const windowHeight = Dimensions.height;
const windowWidth = Dimensions.width;

const PanierScreen = ({ navigation }) => {
  const route = useRoute();

  const { user, restaurantId, restaurantNameId } = route.params;
  const { panierItems, removeFromPanier, clearPanier, incrementQuantity, decrementQuantity, getNombreElementsPanier, getPrixTotalPanier } = useContext(PanierContext);
  console.log(panierItems)
  const renderItem = ({ item }) => {
    const handleIncrement = () => {
      incrementQuantity(item.id);
    };

    const handleDecrement = () => {
      decrementQuantity(item.id);
    };



    return (
      <View style={styles.itemContainer}>
        <View style={styles.card}>
          <Image style={styles.cardImage} source={{ uri: item.urlPhoto }} />
          <View style={styles.cardContent}>
            <Text style={styles.itemName}>{item.nom}</Text>
            <Text style={styles.itemQuantity}>Quantité : {item.quantite}</Text>
            <View style={styles.quantityContainer}>
              <Button title="-" onPress={handleDecrement} color="gray" />
              <Text style={styles.quantityText}>{item.quantite}</Text>
              <Button title="+" onPress={handleIncrement} color="#F0604D" />
            </View>
          </View>
          <Icon
            name="trash"
            size={28}
            color="black"
            style={{ marginRight: 8 }}
            onPress={() => removeFromPanier(item)}
          />
        </View>
      </View>
    );
  };
  
  const ajouterCommande = async () => {
    try {
      const commandesCollection = collection(db, "commandes");
      const commandeRef = doc(commandesCollection); // Generate an automatic ID for the document
      const commandeId = commandeRef.id
      await setDoc(doc(commandesCollection, commandeId), {
        // je dois mettre le userID ici
        userID: user.uid,
        dateCommande: new Date(),
        articles: panierItems,
        statutCommande: "en préparation",
        montantTotal: getPrixTotalPanier(),
        restaurantId: restaurantId,
        restaurantNameId: restaurantNameId
      });

        console.log("commande passé avec succès")
    } catch (error) {
      console.error("Erreur lors de l'ajout de la commande : ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 1 }}>
          <Image source={require('../assets/images/backArrow2.png')} style={{ width: 24, height: 24, marginLeft: 22 }} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Panier</Text>
      </View>
      <View style={{ alignSelf: 'center', width: '90%', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.03)', height: 36, borderRadius: 8, marginBottom: 16 }}>
        <Text style={{ textAlign: 'center', height: 32, fontFamily: 'Inter_500Medium', paddingTop: 4 }}>{getNombreElementsPanier()} Produits</Text>
      </View>
      {panierItems.length === 0 ? (
        <Text style={styles.emptyText}>Panier vide</Text>
      ) : (
        <FlatList
          data={panierItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <View style={{borderTopWidth: 1,borderTopColor: 'background: rgba(0, 0, 0, 0.1);',position: 'absolute',bottom: 0, backgroundColor: '#F6F6F6', width: '100%', paddingTop: 16, paddingHorizontal: 16, zIndex: 999}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontFamily: 'Inter_400Regular', fontSize: 16}}>Total</Text>
            <Text style={{fontFamily: 'Inter_700Bold', fontSize: 18}}>{getPrixTotalPanier()}€ </Text>
          </View>
          <TouchableOpacity
            onPress={clearPanier}
            style={styles.clearButton}
            >
            <Text style={{color: 'white', textTransform: 'uppercase', fontSize: 12, fontFamily:'Inter_500Medium',}}>Vider le panier</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ajouterCommande} style={{ width: '90%', height: 56, backgroundColor: '#F0604D',borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 26 }}>
            <Text style={{color: 'white', fontFamily: 'Inter_600SemiBold', fontSize: 18}}>Commander</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  textHeader: {
    position: "absolute",
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#F6F6F6",
    elevation: 4,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardImage: {
    width: 150,
    height: 150,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    marginBottom: 8,
  },
  clearButton: {
    marginTop: 16,
    width: '70%',
    backgroundColor: '#393939',
    height: 32,
    marginBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center', // Center the button horizontally
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

export default PanierScreen;
