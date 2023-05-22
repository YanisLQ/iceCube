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
        getNombreElementsPanier
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};