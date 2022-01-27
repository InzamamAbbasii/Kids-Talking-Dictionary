import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { openDatabase } from 'react-native-sqlite-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const AddWords = ({ navigation }) => {
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const audioRecorderPlayer = new AudioRecorderPlayer();
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);

    const [audioData, setAudioData] = useState([]);

    const onStartRecord = async () => {
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
            setAudioData({
                recordSecs: e.currentPosition,
                recordTime: audioRecorderPlayer.mmssss(
                    Math.floor(e.currentPosition),
                ),
            });
            return;
        });
        console.log(result);
    };
    const onStopRecord = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setAudioData({
            recordSecs: 0,
        });
        console.log(result);
    };

    const onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer();
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
            setAudioData({
                currentPositionSec: e.currentPosition,
                currentDurationSec: e.duration,
                playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            });
            return;
        });
    };

    const onPausePlay = async () => {
        await audioRecorderPlayer.pausePlayer();
    };

    const onStopPlay = async () => {
        console.log('onStopPlay');
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    };




    const choosePhotoFromLibrary = () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo'
        }).then(image => {
            setImage(image.path);
            console.log('...........................');
            ImgToBase64.getBase64String(image.path)
                .then(base64String => setBase64Image(base64String))
                .catch(err => alert(err));
            console.log('...........................');
        }).catch(error => console.log('Error from gallary', error));
    }
    const addWord = () => {
        if (word.length == 0) {
            alert('Please Enter Word!')
        } else if (meaning.length == 0) {
            alert('Please Enter Word Meaning!')
        } else if (base64Image == null) {
            alert('Please Choose Image!')
        } else {
            db.transaction((tx) => {
                tx.executeSql(
                    'Insert into Words(Word,Meaning,Image) Values (?,?,?)',
                    [word, meaning, base64Image],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            alert('Word Added Successfully!')
                            // alert('Login Successfully')
                        } else {
                            alert('somting went wrong.')
                        }
                    }
                );
            })
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cardView}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Word</Text>
                    <TextInput
                        style={{ fontSize: 18, flex: 2, backgroundColor: '#fff' }}
                        placeholder="Enter Word"
                        placeholderTextColor="#3228"
                        onChangeText={(txt) => setWord(txt)}
                    />
                </View>
                <View style={styles.cardView} >
                    {/* <TouchableOpacity onPress={()=>onStartRecord()}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Start </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>onStopRecord()}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Stop </Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.cardView}>
                    <Text>Audio</Text>
                </View>
                <View style={styles.cardView}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Meaning</Text>
                    <TextInput
                        style={{ fontSize: 18, flex: 2, backgroundColor: '#fff' }}
                        placeholder="Enter Meaning"
                        placeholderTextColor="#3228"
                        onChangeText={(txt) => setMeaning(txt)}
                    />
                </View>
                <View style={styles.cardView}>
                    <Text>Start Recording</Text>
                </View>
                <View style={styles.cardView}>
                    <Text>Audio</Text>
                </View>
                <View style={{ height: 200, padding: 10, backgroundColor: 'pink' }}>
                    <TouchableOpacity style={{ backgroundColor: '#fff', height: '100%', width: '100%', justifyContent: 'center' }}
                        onPress={() => choosePhotoFromLibrary()}>
                        {
                            image == null ? (<Text style={{ fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }}>Choose image</Text>) : (
                                <Image
                                    style={{
                                        flex: 1,
                                        resizeMode: 'stretch',
                                        borderWidth: 1,
                                        borderColor: '#000'
                                    }}
                                    source={{ uri: image, }} />
                            )
                        }

                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btnTouchable} onPress={() => addWord()}>
                    <Text style={[styles.card_title, { textAlign: 'center' }]}>ADD</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default AddWords;

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff',
    },
    header: {
        paddingBottom: 25, alignItems: 'center'
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'pink',
        padding: 20,
        marginBottom: 10,
    },
    card_title: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnTouchable: {
        borderRadius: 5,
        padding: 2,
        width: '95%',
        height: 50,
        color: 'white',
        backgroundColor: '#3EB489',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
})