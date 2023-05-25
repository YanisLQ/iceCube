import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const route = useRoute();

  const { panierItems } = route.params;

  useEffect(() => {
    // Ici, vous pouvez appeler une fonction pour récupérer les détails de la commande
    // et mettre à jour l'état orderItems avec les données reçues
    setOrderItems(panierItems)
  }, []);

  console.log(orderItems)
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nom}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantite}</Text>
        <Text style={styles.itemQuantity}>{item.prix}€</Text>
      </View>
      {/* <Image source={require('../assets/images/food-icon.png')} style={styles.itemImage} /> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Votre commande est en cours de préparation</Text>
      {orderItems.length > 0 ? (
          <FlatList
          data={orderItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.orderList}
          />
          ) : (
              <Text>Aucune commande en cours</Text>
              )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderList: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'dark'
  },
  itemQuantity: {
    color: '#888888',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default OrderPage;
