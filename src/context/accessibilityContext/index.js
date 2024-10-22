// src/context/AccessibilityContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [titleFontSize, setTitleFontSize] = useState(20);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Funções para aumentar e diminuir o tamanho da fonte
  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = prevSize + 2;
      saveFontSize(newSize); // Salva o novo tamanho
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = Math.max(prevSize - 2, 10); // Tamanho mínimo
      saveFontSize(newSize); // Salva o novo tamanho
      return newSize;
    });
  };

  const saveFontSize = async (size) => {
    try {
      await AsyncStorage.setItem('@fontSize', JSON.stringify(size));
      await AsyncStorage.setItem('@titleFontSize', JSON.stringify(size + 4)); // Tamanho do título
    } catch (e) {
      console.error('Failed to save font size:', e);
    }
  };

  const loadFontSize = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('@fontSize');
      const savedTitleFontSize = await AsyncStorage.getItem('@titleFontSize');
      if (savedFontSize) {
        setFontSize(JSON.parse(savedFontSize));
      }
      if (savedTitleFontSize) {
        setTitleFontSize(JSON.parse(savedTitleFontSize));
      }
    } catch (e) {
      console.error('Failed to load font size:', e);
    }
  };

  useEffect(() => {
    loadFontSize(); // Carrega o tamanho da fonte ao iniciar
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        titleFontSize,
        increaseFontSize,
        decreaseFontSize,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  return useContext(AccessibilityContext);
};
