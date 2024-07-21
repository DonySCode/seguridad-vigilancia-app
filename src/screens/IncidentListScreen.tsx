import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
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

type Incident = {
    id: number;
    title: string;
    description: string;
    photo: string;
    audio: string;
};

const IncidentListScreen = ({ navigation }: { navigation: any }) => {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM incidents', [], (tx, results) => {
                let rows = results.rows.raw();
                setIncidents(rows);
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Incidencias</Text>
            <Image source={require('../assets/logovigilanciawb.png')} resizeMode="contain"
                style={styles.Image}></Image>
            <View style={styles.incidentsContainer}>
                {incidents.map(item => <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('IncidentDetails', { incident: item })}>
                    <Text style={styles.buttonText}>{item.title}</Text>
                </TouchableOpacity>)}

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
    },
    incidentsContainer: {
        maxHeight: 1000,
        height: 500
    },
});

export default IncidentListScreen;
