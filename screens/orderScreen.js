import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orders = [
  { id: '1', name: 'Order 1', total: 20.5 },
  { id: '2', name: 'Order 2', total: 15.0 },
  { id: '3', name: 'Order 3', total: 12.75 },
];

const OrdersScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ zIndex: 1 }}>
          <Image source={require('../assets/images/backArrow2.png')} style={{ width: 24, height: 24, marginLeft: 22 }} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Mes commandes</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderName}>{item.name}</Text>
            <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
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
