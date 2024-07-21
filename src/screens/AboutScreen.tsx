import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AboutScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Contacto para futuros proyectos:</Text>
            <Text style={styles.contacto}>Correo: donycasto80@gmail.com</Text>
            <Text style={styles.contacto}>Teléfono: +18295772838</Text>
            <Image source={require('../assets/donycastro.jpg')} style={styles.image} />
            <Text style={styles.phrase}>"La seguridad es una responsabilidad compartida"</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#020000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: '#abc2c2',
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 10,
        textAlign: 'center',
    },
    contacto: {
        color: '#abc2c2',
        fontSize: 16,
        marginBottom: 5,
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 20,
    },
    phrase: {
        color: '#abc2c2',
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '700',
        fontSize: 15
    }
});

export default AboutScreen;