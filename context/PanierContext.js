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

  return (
    <PanierContext.Provider
      value={{
        panierItems,
        addToPanier,
        removeFromPanier,
        clearPanier,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};