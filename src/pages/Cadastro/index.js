import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import styles from "../../utils/styles";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from "../../services/api";

export default function Cadastro({ navigation }) {
    const [seePassWord, setSeePassWord] = useState(true);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameValidate, setUsernameValidate] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(false);
    const [passwordValidate2, setPasswordValidate2] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);


    const handleRegister = async () => {
        setLoading(true);
        if (!username) setUsernameValidate(true);
        else setUsernameValidate(false);

        if (!password) setPasswordValidate(true);
        else setPasswordValidate(false);
        if (!confirmPassword) setPasswordValidate2(true);
        else setPasswordValidate2(false);

        if (password !== confirmPassword) {
            setPasswordMatch(false);
            setLoading(false);
            return;
        } else {
            setPasswordMatch(true);
        }

        if (!password || !username || password !== confirmPassword) {
            setLoading(false);
            return;
        }

        httpClient.post('/Auth/cadastro', {
            username: username,
            password: password,
        })
            .then(response => {
                if (response.status == 200) {
                    handleSaveStorage(response.data, password);
                    setLoading(false);
                    navigation.navigate('Home');
                }
                else if (response.status == 400) {
                    if (response.data.error == "Usuario ja existe")
                        Alert.alert('Erro', 'Já existe um usuário com este nome. Tente novamente.');

                }
            })
            .catch(error => {
                setLoading(false);
                Alert.alert('Erro', 'Ocorreu um erro no cadastro. Tente novamente.');
            }).finally(() => {
                setLoading(false)
            });
    };

    const handleSaveStorage = async (request, password) => {
        httpClient.defaults.headers.authorization = `Bearer ${request.token}`;
        AsyncStorage.setItem("email", request.nome);
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
                    source={require("../../../assets/bgCadastro.png")}
                    style={{ flex: 1, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
                >
                    <Image source={require("../../../assets/logo2.png")} style={{ width: 88, height: 88, marginBottom: 100, marginTop: 90, objectFit: "contain" }} />
                    <Text style={{ fontSize: 25, fontWeight: "400", color: "#fff" }}>Criar Conta</Text>
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
                                {usernameValidate ? "Por favor, digite seu e-mail!" : ""}
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
                                    <Image source={require('../../../assets/olho.png')} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.errorText}>
                                {passwordValidate ? "Por favor, digite sua senha!" : ""}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ color: "#fff", marginBottom: 10 }}>Confirmar Senha</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirme sua senha"
                                    placeholderTextColor="#ccc"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={seePassWord}
                                />
                                <TouchableOpacity onPress={() => { setSeePassWord(!seePassWord) }}>
                                    <Image source={require('../../../assets/olho.png')} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.errorText}>
                                {passwordValidate2 ? "Por favor, digite sua confirmação de senha!" : ""}
                            </Text>
                            <Text style={styles.errorText}>
                                {!passwordMatch ? "As senhas não coincidem!" : ""}
                            </Text>
                        </View>

                        <TouchableOpacity style={{ ...styles.button, alignSelf: "center", }} onPress={handleRegister}>
                            {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
                        </TouchableOpacity>
                    </View>

                    <View style={screenstyles.footer}>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Já tem conta? </Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                                <Text style={{ fontSize: 16, textDecorationLine: "underline", color: "#00C1CF" }}>Entrar agora</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView >
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
