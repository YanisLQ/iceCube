import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from '../firebase-config';
import { FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
const MenuButton = ({ navigation }) => {
  const route = useRoute();
  const { numtable, restaurantNameId, user } = route.params;
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
  const handleShowCmd = async (navigation) => {
    setIsMenuOpen(false)
      navigation.navigate('CommandeAdmin', {restaurantId: restaurantNameId, numtable: numtable, user: user})
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle} style={styles.button}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Ionicons name={isMenuOpen ? "close" : "menu"} size={32} color="black" />
          <Text style={{marginRight: 12, backgroundColor: '#FFFFFF', paddingHorizontal: 18, paddingVertical: 6, borderRadius: 12, fontFamily: 'Inter_500Medium', fontSize: 14 }}>n°{numtable}</Text>
        </View>
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleMenuPress("ProfileScreen")} style={styles.menuItem}>
            <Ionicons name="person" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={styles.menuItem}>
            <Ionicons name="receipt" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Mes commandes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress("SettingsScreen")} style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>
          { user.userRole == 1 && (
                <TouchableOpacity onPress={() => handleShowCmd(navigation)} style={styles.menuItem}>
                  <FontAwesome name="cogs" size={20} color="black" style={styles.menuIcon} />
                 <Text style={styles.menuText}>Commande en cours</Text>
               </TouchableOpacity>
          )}
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
