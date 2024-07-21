import React from 'react';
import { View, Text, StyleSheet, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'incidents.db',
        location: 'default',
    },
    () => { },
    error => {
        console.log(error);
    },
);

function PortadaScreen({ navigation }) {
    const handleDeleteAll = () => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM incidents', [], () => {
                console.log('All records deleted');
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido!</Text>
            <Image source={require('../assets/logovigilanciawb.png')} resizeMode="contain"
                style={styles.Image}></Image>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IncidentList')}>
                    <Text style={styles.buttonText}>Ver Incidencias</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterIncident')}>
                    <Text style={styles.buttonText}>Registrar Incidencia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleDeleteAll}>
                    <Text style={styles.buttonText}>Borrado de Emergencia</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.buttonText}>Acerca De</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#abc2c2',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#abc2c2',
        margin: 5,
        height: 79,
        width: 180,
        shadowColor: '#FFFFFF',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20,
        color: '#FFFFFF',
        borderRadius: 13.5
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: '900'
    },
    Image: {
        height: 150,
        marginBottom: 10
    }
});

export default PortadaScreen;