import React, { useState } from 'react';
import RNFS from 'react-native-fs';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchCamera, Asset } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
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


const audioRecorderPlayer = new AudioRecorderPlayer();


function RegisterIncidentScreen({ navigation }) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [photo, setPhoto] = useState<Asset | null>(null);
    const [audioUri, setAudioUri] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const handleSave = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO incidents (title, description, photo, audio) VALUES (?, ?, ?, ?)',
                [title, description, photo?.uri, audioUri],
                () => { console.log('Record added successfully') },
                error => { console.log('Error: ', error) }
            );
        });
        navigation.navigate('Home')
    };

    const takePhoto = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.assets) {
                setPhoto(response.assets[0]);
            }
        });
    };

    const startRecording = async () => {
        try {
            const path = `${RNFS.DocumentDirectoryPath}/${title}.mp4`;
            const uri = await audioRecorderPlayer.startRecorder(path);
            setAudioUri(uri);
            setIsRecording(true);

            audioRecorderPlayer.addRecordBackListener((e: any) => {
                console.log('Recording: ', e);
                return;
            });

            console.log('Grabación iniciada');
        } catch (error) {
            console.error('Error al iniciar la grabación', error);
            Alert.alert('Error', 'No se pudo iniciar la grabación.');
        }
    };

    const stopRecording = async () => {
        if (isRecording) {
            try {
                await audioRecorderPlayer.stopRecorder();
                audioRecorderPlayer.removeRecordBackListener();
                setIsRecording(false);
                console.log('Grabación detenida');
            } catch (error) {
                console.error('Error al detener la grabación', error);
                Alert.alert('Error', 'No se pudo detener la grabación.');
            }
        } else {
            console.log('No hay grabación en curso para detener.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SV-APP</Text>
            <Image source={require('../assets/logovigilanciawb.png')} resizeMode="contain"
                style={styles.Image}></Image>
            <View>
                <TextInput style={styles.textField} placeholder="Escriba el título" value={title} onChangeText={setTitle} />
                <TextInput style={styles.textField} placeholder="Escriba la descripción" value={description} onChangeText={setDescription} />
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                    <Text style={styles.buttonText}>Tomar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={isRecording ? stopRecording : startRecording}>
                    <Text style={styles.buttonText}>{isRecording ? "Detener Grabación" : "Grabar Audio"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Guardar</Text>
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
        borderRadius: 13.5,
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
    textField: {
        margin: 5,
        width: 180,
        backgroundColor: '#abc2c2',
        borderRadius: 13.5,
    }
});

export default RegisterIncidentScreen;
