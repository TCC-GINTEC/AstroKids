import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import styles from "../../utils/styles";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from "../../services/api";

export default function Login({ navigation }) {
    const [seePassWord, setSeePassWord] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameValidate, setUsernameValidate] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(false);    

    const handleLogin = async () => {
        setLoading(true);
        if (!username) setUsernameValidate(true);
        else setUsernameValidate(false);

        if (!password) setPasswordValidate(true);
        else setPasswordValidate(false);

        if (!password || !username) {
            setLoading(false);
            return;
        }
        console.log("chamando api")
        httpClient.post('/Auth/login', {
            username: username,
            password: password,
        })
            .then(response => {
                if (response.status == 200) {
                    handleSaveStorage(response.data, password);
                    setLoading(false);
                    navigation.navigate('Home');
                }
                else if (response.status == 401)
                    Alert.alert('Erro', 'Usuário ou senha incorretos.');
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Erro', 'Por favor, contate um administrador.');
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleSaveStorage = async (request, password) => {
        httpClient.defaults.headers.authorization = `Bearer ${request.token}`;
        AsyncStorage.setItem("username", request.nome);
        AsyncStorage.setItem("password", password);
        AsyncStorage.setItem("usuarioCodigo", String(request.usuarioCodigo));
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true}>

                <ImageBackground
                    source={require("../../../assets/bgLogin.png")}
                    style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
                >
                    <Image source={require("../../../assets/logo2.png")} style={{ width: 88, height: 88, marginBottom: 120, marginTop: 125, objectFit: "contain" }} />
                    <Text style={{ fontSize: 25, fontWeight: "400", color: "#fff" }}>Fazer login</Text>
                    <View style={{ ...screenstyles.containerloginbody }}>
                        <View>
                            <Text style={{ color: "#fff", marginBottom: 10 }}>Nome</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite seu nome aqui"
                                    placeholderTextColor="#ccc"
                                    value={username}
                                    onChangeText={setUsername}                                    
                                    autoCapitalize="none"
                                />
                            </View>
                            <Text style={{ ...styles.errorText, marginBottom: 0 }}>
                                {usernameValidate ? "Por favor, digite seu nome!" : ""}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", marginBottom: 10 }}>Senha</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite sua senha aqui"
                                    placeholderTextColor="#ccc"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={seePassWord}
                                />
                                <TouchableOpacity onPress={() => { setSeePassWord(!seePassWord) }}>
                                    <Image source={require('../../../assets/olho.png')} style={{ ...styles.icon, objectFit: "contain" }} />

                                </TouchableOpacity>
                            </View>
                            <Text style={styles.errorText}>
                                {passwordValidate ? "Por favor, digite sua senha!" : ""}
                            </Text>
                        </View>

                        <TouchableOpacity style={{ ...styles.button, alignSelf: "center", marginBottom: 40 }} onPress={handleLogin}>
                            {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={screenstyles.footer}>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Não tem conta? </Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Cadastro") }}>
                                <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "#00C1CF" }}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                            <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "#00C1CF", marginTop: 10, textAlign: "center" }}>Entrar sem conta</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const screenstyles = StyleSheet.create({
    containerloginbody: {
        width: "90%",
        paddingVertical: 20,
        marginBottom: 40,
        alignItems: "center"
    },
    footer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
    },
});
