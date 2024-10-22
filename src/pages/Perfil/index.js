// src/pages/ProfileScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAccessibility } from '../../context/accessibilityContext/';

const Profile = () => {
  const { fontSize, titleFontSize, increaseFontSize, decreaseFontSize, isDarkMode } = useAccessibility();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDarkMode ? '#333' : '#FFF' }}>
      <Text style={{ fontSize: titleFontSize, fontWeight: 'bold' }}>Perfil</Text>
      <Text style={{ fontSize }}>Este é o seu perfil.</Text>
      <Button title="Aumentar Fonte" onPress={increaseFontSize} />
      <Button title="Diminuir Fonte" onPress={decreaseFontSize} />
    </View>
  );
};

export default Profile;
