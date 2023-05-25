import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { getCommandeForRestaurant } from '../api/basicFunction';
// import { updateCommandeStatut } from '../api/commande';
import { Route, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, updateDoc  } from "firebase/firestore";
import { db, auth } from '../firebase-config';



export default function CommandeAdmin({ navigation }) {
  const [commandes, setCommandes] = useState([]);
  const route = useRoute();
  const { restaurantId, user } = route.params;
  useEffect(() => {
    loadCommandes();
  }, []);

  const loadCommandes = async () => {
    const commandesData = await getCommandeForRestaurant(restaurantId);
    setCommandes(commandesData);
  };

  const handleChangeStatut = async (commandeId, nouveauStatut, item) => {
    // try {
    //     const commandesCollection = collection(db, "commandes", commandeId);
    //     const commandeRef = doc(commandesCollection); // Generate an automatic ID for the document
    //     await updateDoc(commandeRef, {
    //       statutCommande: nouveauStatut,
    //     });
  
    //       console.log("modification effectué")
    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout de la commande : ", error);
    //   }
    // console.log(item)
    loadCommandes();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.commandeItem}
      onPress={() => navigation.navigate('DétailsCommande', { commande: item })}
    >
        <Text style={styles.commandeText}>Commande #{item.commandeId}</Text>
        <Text style={styles.commandeText}>Statut: {item.statutCommande}</Text>
        {item.articles.map((article, index) => (
            <View key={index}>
                <Text style={styles.itemTextName}>{article.nom}</Text>
                {article.ingredients.length === 0 ? null : (
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.ingredientsTitle}>Sans:</Text>
                    {article.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredientText}>
                        {ingredient}
                    </Text>
                    ))}
                </View>
                )}
                <Text style={styles.itemTextPrice}>Quantité: {article.quantite}</Text>
                <Text style={styles.itemTextPrice}>Prix: {article.prix}</Text>
            </View>
            ))}
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontFamily: 'Inter_500Medium'}}>Montant total :</Text>
                <Text style={{marginBottom: 8,marginLeft: 4, fontFamily:'Inter_700Bold'}}>{item.montantTotal}€</Text>
            </View>

      <TouchableOpacity
        style={styles.statutButton}
        onPress={() => handleChangeStatut(item.commandeId, 'prêt')}
      >
        <Text style={styles.statutButtonText}>Prêt</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 12}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{zIndex: 1}}>
            <Image source={require('../assets/images/backArrow2.png')} style={{width: 24, height: 24, marginLeft: 22}} />     
          </TouchableOpacity>
          <Text style={styles.textHeader}>Commandes</Text>
        </View>
      <Text style={styles.title}>Liste des commandes</Text>
      <FlatList
        data={commandes}
        renderItem={renderItem}
        keyExtractor={(item) => item.commandeId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  textHeader: {
    position: 'absolute', 
    width: '100%',
    alignSelf: 'center', 
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
  },
  commandeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  commandeText: {
    fontSize: 16,
    marginBottom: 8,
  },
  ingredientsTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    marginLeft: 16,
    color: '#F38071'
  },
  statutButton: {
    backgroundColor: '#F0604D',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  statutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTextName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 14
  },
  itemTextPrice: {
    fontSize: 12,
    marginBottom: 8
  },
});
