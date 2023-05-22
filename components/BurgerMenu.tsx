import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuButton = ({ navigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuPress = (screenName) => {
    navigation.navigate(screenName);
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle} style={styles.button}>
        <Ionicons name={isMenuOpen ? "close" : "menu"} size={24} color="black" />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleMenuPress("ProfileScreen")} style={styles.menuItem}>
            <Ionicons name="person" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Profil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress("SettingsScreen")} style={styles.menuItem}>
            <Ionicons name="settings" size={20} color="black" style={styles.menuIcon} />
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>
          {/* Ajoutez d'autres éléments de menu ici */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 999,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    elevation: 3,
  },
  menu: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    padding: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
});

export default MenuButton;
