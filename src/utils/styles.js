import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
    },
    titleGG: {
        fontSize: 48,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        shadowOffset: {
            width: 0, height: 4
        },
        shadowOpacity: 0.12,
        borderWidth: 1,
        borderColor: '#ffff',
        backgroundColor: '#fff',
        paddingLeft: 20,
        maxWidth: "80%",
        minWidth: "80%",
        borderRadius: 15
    },
    icon: {
        padding: 10
    },
    input: {
        height: 60,
        width: 300,
        borderRadius: 20,
        borderColor: '#ffff',
        width: "75%",
        borderRadius: 5,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    button: {
        width: 200,
        backgroundColor: '#EF065D',
        borderRadius: 15,
        paddingVertical: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button2: {
        width: 150,
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText2: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#ff0000',
        textAlign: 'left',
        width: '75%',        
    },
    image: {
        width: 200,
        height: 200,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    voltar: {
        marginLeft: 30,
    },
    jogos: {
        marginTop: 31,
        height: 115,
        width: "90%",
        alignSelf: 'flex-end',
        justifyContent: "center"
    },
    jogosImage: {
        borderRadius: 15
    },
    jogoText: {
        color: "#ffff",
        marginLeft: 30,
        fontSize: 20,
        fontWeight: '500'
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        flex: 1,
        resizeMode: 'cover'
    },
    buttonScanner: {        
        height: 50,
        width: 139,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: "#FF4C4D",
        borderRadius:15
    },
    footer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        alignItems: "center",
    },
});
