"use client"

// Create a new file (e.g., DataContext.js)
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [arrData, setArrData] = useState([]);

  const updateArrData = newData => {
    setArrData(newData);
  };

  return (
    <DataContext.Provider value={{ arrData, updateArrData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
