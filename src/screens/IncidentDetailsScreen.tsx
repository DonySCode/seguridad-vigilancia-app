import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';

const IncidentDetailsScreen = ({ route }: { route: any }) => {
    const { incident } = route.params;

    const playAudio = (audioUri: string) => {
        const sound = new Sound(audioUri, undefined, (error) => {
            if (error) {
                console.log('Error al cargar el audio', error);
                Alert.alert('Error', 'No se pudo cargar el audio.');
                return;
            }
            sound.play((success) => {
                if (success) {
                    console.log('Reproducción completa');
                } else {
                    console.log('Error al reproducir el audio');
                }
            });
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{incident.title}</Text>
            <Text style={{ color: 'white' }}>{incident.description}</Text>
            {incident.photo && <Image source={{ uri: incident.photo }} style={styles.image} />}
            {incident.audio && (
                <TouchableOpacity style={styles.button} onPress={() => playAudio(incident.audio)}>
                    <Text style={styles.buttonText}>Reproducir Audio</Text>
                </TouchableOpacity>
            )}
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
    image: {
        width: '100%',
        height: 200,
        marginVertical: 12,
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
});

export default IncidentDetailsScreen;
