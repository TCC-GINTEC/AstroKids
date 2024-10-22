import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useAccessibility } from '../../context/AccessibilityContext/';

const Perfil = () => {
  const {
    fontSize,
    titleFontSize,
    increaseFontSize,
    decreaseFontSize,
    isHighContrast,
    toggleHighContrast,
  } = useAccessibility();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading preferences
    const loadPreferences = async () => {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadPreferences();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: titleFontSize, fontWeight: 'bold' }}>Perfil</Text>
      <Text style={{ fontSize }}>Este é o seu perfil.</Text>
      <Button title="Aumentar Fonte" onPress={increaseFontSize} accessibilityLabel="Aumentar o tamanho da fonte" />
      <Button title="Diminuir Fonte" onPress={decreaseFontSize} accessibilityLabel="Diminuir o tamanho da fonte" />
      <Button title={isHighContrast ? "Desativar Alto Contraste" : "Ativar Alto Contraste"} onPress={toggleHighContrast} />
    </View>
  );
};

export default Perfil;
