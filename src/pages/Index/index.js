import { Button, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import styles from "../../utils/styles";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import httpClient from "../../services/api";


export default function Index({ navigation }) {
    useEffect(() => {
        handleAutoLogin();
        console.log("oii")
    }, []);

    const handleAutoLogin = async () => {
        var username = await AsyncStorage.getItem("username");
        var password = await AsyncStorage.getItem("password");        

        if (!username || !password)
            return;        
        if (username && password) {
            httpClient.post('/Auth/login', {
                username: username,
                password: password,
            })
                .then(response => {                    
                    if (response.status == 200) {
                        handleSaveStorage(response.data, password);
                        navigation.navigate('Home');
                    }
                })
                .catch(error => {                    
                });
        }
    };

    const handleSaveStorage = async (request, password) => {
        httpClient.defaults.headers.authorization = `Bearer ${request.token}`;
        AsyncStorage.setItem("username", request.nome);
        AsyncStorage.setItem("password", password);
        AsyncStorage.setItem("usuarioCodigo", String(request.usuarioCodigo));
    };
    return (
        <ImageBackground
            source={require("../../../assets/bgInit.png")}
            style={{ flex: 1, alignItems: "center" }}
            resizeMode="cover" // ou "contain", "stretch", dependendo do que você precisa
        >
            <Image source={require("../../../assets/logo.png")} style={{ width: 315, objectFit: "contain", marginTop: 65 }} />
            <Text style={{ fontSize: 25, fontWeight: "400", color: "#fff", marginTop: 50 }}>Seja Bem - Vindo</Text>
            <View style={{ gap: 36, marginTop: 40 }}>

                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Login") }}>
                    <Text style={styles.buttonText}>
                        Fazer login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Cadastro") }}>
                    <Text style={styles.buttonText}>
                        Criar cadastro
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                    <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "#00C1CF", marginTop: 10, textAlign: "center" }}>Entrar sem conta</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>

    )
}