import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // Tamanho da fonte padrão
  const [titleFontSize, setTitleFontSize] = useState(24); // Tamanho da fonte do título
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
    setTitleFontSize(titleFontSize + 2);
  };

  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
    setTitleFontSize(titleFontSize - 2);
  };

  return (
    <AccessibilityContext.Provider 
      value={{ 
        fontSize, 
        titleFontSize, 
        increaseFontSize, 
        decreaseFontSize, 
        isDarkMode, 
        setIsDarkMode 
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  return useContext(AccessibilityContext);
};

