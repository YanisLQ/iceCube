import React, { useContext } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { PanierContext } from "../context/PanierContext";

const PanierScreen = () => {
  const { panierItems, removeFromPanier, clearPanier } = useContext(
    PanierContext
  );
console.log(panierItems)
  return (
    <View>
      <Text>Contenu du panier :</Text>
      {panierItems.length === 0 ? (
        <Text>Panier vide</Text>
      ) : (
        <FlatList
          data={panierItems}
          renderItem={({ item }) => (
            <View>
              <Text>{item.nom}</Text>
              <Text>Quantité : {item.quantite}</Text>
              <Button
                title="Supprimer du panier"
                onPress={() => removeFromPanier(item)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Button title="Vider le panier" onPress={clearPanier} />
    </View>
  );
};

export default PanierScreen;