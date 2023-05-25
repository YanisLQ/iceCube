import React, { createContext, useState } from "react";

export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {
  const [panierItems, setPanierItems] = useState([]);

  const addToPanier = (item) => {
    setPanierItems([...panierItems, item]);
  };

  const removeFromPanier = (item) => {
    const updatedPanierItems = panierItems.filter((i) => i.id !== item.id);
    setPanierItems(updatedPanierItems);
  };

  const clearPanier = () => {
    setPanierItems([]);
  };

  const incrementQuantity = (itemId) => {
    setPanierItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantite: item.quantite + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setPanierItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantite > 0
          ? { ...item, quantite: item.quantite - 1 }
          : item
      ).filter((item) => item.quantite > 0)
    );
  };

  const getPrixTotalPanier = () => {
    let total = 0;
    panierItems.forEach((item) => {
      total += item.prix * item.quantite;
    });
    return total;
  };

  const getNombreElementsPanier = () => {
    let count = 0;
    panierItems.forEach((item) => {
      count += item.quantite;
    });
    return count;
  };
  

  return (
    <PanierContext.Provider
      value={{
        panierItems,
        addToPanier,
        removeFromPanier,
        clearPanier,
        getNombreElementsPanier,
        incrementQuantity,
        decrementQuantity,
        getPrixTotalPanier
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};