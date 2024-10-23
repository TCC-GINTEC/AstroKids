// src/context/AccessibilityContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);
  const [titleFontSize, setTitleFontSize] = useState(20);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const MAX_FONT_SIZE = 30;
  const MIN_FONT_SIZE = 10;

  // Funções para aumentar e diminuir o tamanho da fonte
  const increaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = Math.min(prevSize + 2, MAX_FONT_SIZE); // Limita ao máximo
      saveFontSize(newSize);
      return newSize;
    });
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => {
      const newSize = Math.max(prevSize - 2, MIN_FONT_SIZE); // Limita ao mínimo
      saveFontSize(newSize);
      return newSize;
    });
  };

  const saveFontSize = async (size) => {
    try {
      await AsyncStorage.setItem('@fontSize', JSON.stringify(size));
      await AsyncStorage.setItem('@titleFontSize', JSON.stringify(size + 4));
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

  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
    saveHighContrast(!isHighContrast);
  };

  const saveHighContrast = async (isHighContrast) => {
    try {
      await AsyncStorage.setItem('@isHighContrast', JSON.stringify(isHighContrast));
    } catch (e) {
      console.error('Failed to save high contrast preference:', e);
    }
  };

  const loadHighContrast = async () => {
    try {
      const savedHighContrast = await AsyncStorage.getItem('@isHighContrast');
      if (savedHighContrast) {
        setIsHighContrast(JSON.parse(savedHighContrast));
      }
    } catch (e) {
      console.error('Failed to load high contrast preference:', e);
    }
  };

  useEffect(() => {
    loadFontSize();
    loadHighContrast();
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        titleFontSize,
        increaseFontSize,
        decreaseFontSize,
        isHighContrast,
        toggleHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  return useContext(AccessibilityContext);
};
