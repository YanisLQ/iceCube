import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from '../firebase-config';
import { useRoute } from "@react-navigation/native";
const MenuButton = ({ navigation }) => {
  const route = useRoute();
  const { numtable, restaurantNameId } = route.params;
  console.log(restaurantNameId)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuPress = (screenName) => {
    navigation.navigate(screenName);
    setIsMenuOpen(false);
  };

  const handleLogout = async (navigation) => {
    setIsMenuOpen(false)
    await auth.signOut();
      navigation.navigate('Home', {restaurantId: restaurantNameId, numtable: numtable})
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle} style={styles.button}>
        <Ionicons name={isMenuOpen ? "close" : "menu"} size={32} color="black" />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleMenuPress("ProfileScreen")} style={styles.menuItem}>
            <Ionicons name="person" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress("OrdersScreen")} style={styles.menuItem}>
            <Ionicons name="receipt" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Mes commandes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress("SettingsScreen")} style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout(navigation)} style={styles.menuItem}>
            <Ionicons name="log-out" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 35,
    // left: 10,
    zIndex: 999,
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  menu: {
    position: "absolute",
    top: 45,
    // right: 10,
    paddingLeft: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 3,
    // padding: 10,
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
});

export default MenuButton;
