import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { getCommandeForCustomer } from '../api/basicFunction';
const orders = [
  { id: '1', name: 'Order 1', total: 20.5 },
  { id: '2', name: 'Order 2', total: 15.0 },
  { id: '3', name: 'Order 3', total: 12.75 },
];

const OrdersScreen = ({ navigation }) => {
  const [commandes, setCommandes] = useState(null)
    const route = useRoute();
    const { restaurantNameId, user } = route.params;
    useEffect(() => {
      const fetchData = async () => {
        try {
          const getCmd = await getCommandeForCustomer(restaurantNameId, user.uid)
          // console.log(getCmd)
          if(getCmd){
              setCommandes(getCmd);
          }

        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
      
      fetchData();
    }, []);
    if(!commandes) {
        return (
          <View>
            <Text>Chargement</Text>
          </View>
        );
    }
    console.log(commandes[0].articles)
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 1 }}>
            <Image source={require('../assets/images/backArrow2.png')} style={{ width: 24, height: 24, marginLeft: 22 }} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Mes commandes</Text>
        </View>
        <FlatList
          data={commandes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.orderItem}>
              <View style={styles.articleContainer}>
                <Text style={{fontSize: 16, fontFamily: 'Inter_700Bold'}}>Commande n°{index + 1}</Text>
                {item.articles.map((article) => (
                  <Text key={article.id} style={styles.articleName}>
                    {article.nom}
                  </Text>
                ))}
              </View>
              <Text style={styles.orderTotal}>Total: ${item.montantTotal.toFixed(2)}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F6F6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  orderName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 14,
    color: '#888888',
    marginTop: 6
  },
  textHeader: {
    position: 'absolute', 
    width: '100%',
    alignSelf: 'center', 
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'Inter_600SemiBold',
  },
});

export default OrdersScreen;
