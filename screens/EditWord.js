import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ToastAndroid, ScrollView, Image, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { openDatabase } from 'react-native-sqlite-storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import { Picker } from '@react-native-picker/picker';

const audioRecorderPlayer = new AudioRecorderPlayer();
const audioRecorderPlayerForMeaning = new AudioRecorderPlayer();
const EditWord = ({ navigation, route }) => {
    console.log(route.params.Id);
    console.log('...........');
    var db = openDatabase({ name: 'KidsTalkingDictionaryDB.db', createFromLocation: 1 });
    const [id, setId] = useState(route.params.Id);
    const [word, setWord] = useState(route.params.Word);
    const [meaning, setMeaning] = useState(route.params.Meaning);
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(route.params.Image);

    const [audioData, setAudioData] = useState([]);
    const [audioData1, setAudioData1] = useState([]);
    const [isPlay, setIsPlay] = useState(false);

    const [meaningRecordAudio, setMeaningRecordAudio] = useState([]);
    const [playMeaningAudioData, setPlayMeaningAudioData] = useState([]);
    const [isMeaningPlay, setisMeaningPlay] = useState(false);

    const [wordBase64Audio, setWordBase64Audio] = useState(null);
    const [meaningBase64Audio, setMeaningBase64Audio] = useState(null);

    const [wordAudioURL, setWordAudioURL] = useState(route.params.WordAudio);
    const [meaningAudioURL, setMeaningAudioURL] = useState(route.params.MeaningAudio);
    const [permission, setPermission] = useState(false);
    const [selectedClass, setSelectedClass] = useState(route.params.Class);
    let filename = new Date().getUTCDay().toString() + new Date().getUTCDate().toString() + new Date().getFullYear().toString() + new Date().getTime().toString();

    const getPermisssion = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,

                ]);
                // console.log('write external stroage', grants);
                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                    setPermission(true);
                } else {
                    console.log('All required permissions not granted');
                    alert('All required permissions are not granted.Please enable it manually!')
                    return;
                }
            } catch (err) {
                console.warn('err in word ', err);
                return;
            }
        }
    }
    useEffect(() => {
        RNFS.writeFile(RNFetchBlob.fs.dirs.DCIMDir + '/KidsTalkingDictionary/1.txt', 'Lorem ipsum dolor sit amet', 'utf8')
            .then((success) => {
                console.log('FILE WRITTEN!');
            })
            .catch((err) => {
                console.log(err.message);
            });
        getPermisssion();
    }, []);

    const onStartRecord = async (params) => {
        if (permission) {
            try {
                console.log('start word recording....');
                const dirs = RNFetchBlob.fs.dirs;
                if (params == 'word') {
                    if (word.length == 0) {
                        alert('Please Enter Word')
                    } else {
                        console.log(',,,,', filename);
                        const path = Platform.select({
                            ios: 'word.m4a',
                            android: `${dirs.MusicDir}/${word + filename}.mp3`,
                        });
                        console.log(path);
                        console.log('........................................');

                        // RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.MusicDir)
                        //     // files will an array contains filenames
                        //     .then((files) => {
                        //         console.log('before....',files)
                        //     })

                        // console.log(RNFetchBlob.fs.isDir(folder));
                        // RNFetchBlob.fs.exists(path)
                        //     .then(async (exists) => {
                        //         console.log(exists)
                        //         if (exists) {
                        //             await RNFetchBlob.fs.stat(path)
                        //                 .then(async (res) => {
                        //                     console.log('File deleted')
                        //                     RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.MusicDir)
                        //                     // files will an array contains filenames
                        //                     .then((files) => {
                        //                         console.log('after....',files)
                        //                     })
                        //                 })
                        //                 .catch(err => console.log('errrr...' + err))

                        //         } else {
                        //             console.log('not exists');
                        //         }
                        //         const uri = await audioRecorderPlayer.startRecorder(path);
                        //         setMeaningRecordAudio({ ...meaningRecordAudio })
                        //         audioRecorderPlayer.addRecordBackListener((e) => {
                        //             let duration = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).split(':');
                        //             setMeaningRecordAudio({ ...meaningRecordAudio })
                        //             setAudioData({
                        //                 recordSecs: e.currentPosition,
                        //                 // recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                        //                 recordTime: '00:' + duration[0] + ':' + duration[1],
                        //             });
                        //             setWordAudioURL(path);
                        //             //converting audio to base64
                        //             // RNFS.readFile(path, 'base64')
                        //             //     .then(res => { setWordBase64Audio(res) })
                        //             //     .catch(err => console.log(`err..${err}`))
                        //             return;
                        //         });
                        //         return;
                        //     })
                        //     .catch(err => alert(err))

                        const uri = await audioRecorderPlayer.startRecorder(path);
                        setMeaningRecordAudio({ ...meaningRecordAudio })
                        audioRecorderPlayer.addRecordBackListener((e) => {
                            let duration = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).split(':');
                            setMeaningRecordAudio({ ...meaningRecordAudio })
                            setAudioData({
                                recordSecs: e.currentPosition,
                                // recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                                recordTime: '00:' + duration[0] + ':' + duration[1],
                            });
                            setWordAudioURL(path);
                            //converting audio to base64
                            RNFS.readFile(path, 'base64')
                                .then(res => { setWordBase64Audio(res) })
                                .catch(err => alert(err))
                            return;
                        });
                    }
                } else if (params == 'meaning') {
                    if (meaning.length == 0) {
                        alert(`Please Enter Meaning of "${word}"`)
                    } else {
                        let filename = word + 'Meaning' + new Date().getUTCDay().toString() + new Date().getUTCDate().toString() + new Date().getFullYear().toString() + new Date().getTime().toString();
                        console.log(filename);
                        const path = Platform.select({
                            ios: 'meaning.m4a',
                            android: `${dirs.MusicDir}/${word + 'Meaning' + filename}.mp3`,
                        });
                        console.log(path);
                        const uri = await audioRecorderPlayer.startRecorder(path);
                        setAudioData({ ...audioData });
                        audioRecorderPlayer.addRecordBackListener((e) => {
                            setAudioData({ ...audioData });
                            let duration = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).split(':');
                            setMeaningRecordAudio({
                                recordSecs: e.currentPosition,
                                // recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                                recordTime: '00:' + duration[0] + ':' + duration[1],
                            });
                            setMeaningAudioURL(path)
                            //converting audio to base64
                            RNFS.readFile(path, 'base64')
                                .then(res => { setMeaningBase64Audio(res) })
                                .catch(err => alert(err))
                            return;
                        });
                    }
                }

            } catch (err) {
                console.warn('err in word ', err);
                return;
            }
        } else {
            getPermisssion();
        }
    };

    const onStopRecord = async () => {
        // console.log('stop word recording...');
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        // setAudioData({
        //     recordSecs: 0,
        // });
        console.log('stop....', result);

        // const path = `${RNFS.DocumentDirectoryPath}/sound1.mp4`;
        // RNFS.writeFile(path, wordBase64Audio, 'base64').then((res) => console.log('write audio on', path)).catch(err => alert(err))

        //successfully convert audio to base64
        // RNFS.readFile(result, 'base64')
        //     .then(res => setWordBase64Audio(res))
        //     .catch(err => alert(err))
    };

    const onStartPlay = async (params) => {
        console.log(wordAudioURL);
        const dirs = RNFetchBlob.fs.dirs;
        if (params == 'word') {
            const path = Platform.select({
                ios: 'word.m4a',
                android: `${wordAudioURL}`,
            });
            setIsPlay(true);
            const msg = await audioRecorderPlayer.startPlayer(path);
            setPlayMeaningAudioData({ ...playMeaningAudioData })
            audioRecorderPlayer.addPlayBackListener((e) => {
                setPlayMeaningAudioData({ ...playMeaningAudioData })

                if (e.currentPosition == e.duration) setIsPlay(false);
                let duration = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).split(':');
                setAudioData1({
                    currentPositionSec: e.currentPosition,
                    currentDurationSec: e.duration,
                    // playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                    playTime: '00:' + duration[0] + ':' + duration[1],
                    duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                });
                return;
            });
        } else if (params == 'meaning') {
            const path = Platform.select({
                ios: 'meaning.m4a',
                // android: `${dirs.MusicDir}/${word+'Meaning'+filename}.mp3`,
                android: `${meaningAudioURL}`,
            });
            setisMeaningPlay(true);
            setAudioData1({ ...audioData1 })
            const msg = await audioRecorderPlayer.startPlayer(path);
            audioRecorderPlayer.addPlayBackListener((e) => {
                setAudioData1({ ...audioData1 })
                if (e.currentPosition == e.duration) setisMeaningPlay(false);
                let duration = audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)).split(':');
                setPlayMeaningAudioData({
                    currentPositionSec: e.currentPosition,
                    currentDurationSec: e.duration,
                    // playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
                    playTime: '00:' + duration[0] + ':' + duration[1],
                    duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                });
                return;
            });
        }
    };

    const onPausePlay = async (params) => {
        if (params == 'word') {
            setIsPlay(false)
            const path = Platform.select({
                ios: 'word.m4a',
                android: `${RNFetchBlob.fs.dirs.CacheDir}/word.mp3`,
            });
            await audioRecorderPlayer.stopPlayer(path);
        };
        if (params == 'meaning') {
            setisMeaningPlay(false)
            const path = Platform.select({
                ios: 'meaning.m4a',
                android: `${RNFetchBlob.fs.dirs.CacheDir}/meaning.mp3`,
            });
            await audioRecorderPlayer.stopPlayer(path);
        };
    };
    const choosePhotoFromLibrary = () => {
        ImageCropPicker.openPicker({
            mediaType: 'photo'
        }).then(image => {
            setImage(image.path);
            console.log('...........................,', image.path);
            ImgToBase64.getBase64String(image.path)
                .then(base64String => setBase64Image(base64String))
                .catch(err => alert(err));
            console.log('...........................');
        }).catch(error => console.log('Error from gallary', error));
    }

    const editData = async () => {
        console.log('save');
        if (word.length == 0) {
            alert('Please Enter Word!')
        }  else if (meaning.length == 0) {
            alert('Please Enter Word Meaning!')
        } else if (base64Image == null) {
            alert('Please Choose Image!')
        } else {
            console.log('word', wordAudioURL);
            console.log('meaning', meaningAudioURL);
            console.log(word, wordAudioURL, meaning, meaningAudioURL, selectedClass,id);
            // storing URL of recording in database
            db.transaction((tx) => {
                tx.executeSql(
                    'Update Words set Word=?,WordAudio=?,Meaning=?,MeaningAudio=?,Image=?,Class=? Where Id=?',
                    [word, wordAudioURL, meaning, meaningAudioURL, base64Image, selectedClass,id],
                    (tx, results) => {
                        console.log(results);
                        if (results.rowsAffected > 0) {
                            alert('Record Updated Successfully!')
                            // alert('Login Successfully')
                        } else {
                            alert('somting went wrong.')
                        }
                    }
                );
            })
            // storing base64 string of recording
            // db.transaction((tx) => {
            //     tx.executeSql(
            //         'Insert into Words(Word,WordAudio,Meaning,MeaningAudio,Image) Values (?,?,?,?,?)',
            //         [word, wordBase64Audio, meaning, meaningBase64Audio, base64Image],
            //         (tx, results) => {
            //             if (results.rowsAffected > 0) {
            //                 alert('Word Added Successfully!')
            //                 // alert('Login Successfully')
            //             } else {
            //                 alert('somting went wrong.')
            //             }
            //         }
            //     );
            // })
        }

    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cardView}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Word</Text>
                    <TextInput
                        style={{ fontSize: 18, flex: 2, backgroundColor: '#fff', color: '#000' }}
                        placeholder="Enter Word"
                        placeholderTextColor="#3228"
                        value={word}
                        onChangeText={(txt) => setWord(txt)}
                    />
                </View>

                <View style={[styles.cardView, { flexDirection: 'column', alignItems: 'flex-start', }]} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Start Recording</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
                            onPressIn={() => { onStartRecord('word') }}
                            onPressOut={() => { onStopRecord() }}
                        >
                            <MaterialCommunityIcons name='microphone' color={'red'} size={50} />
                        </TouchableOpacity>
                        {
                            audioData.length == 0 ? (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>00:00:00 </Text>
                            ) : (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>{audioData.recordTime} </Text>
                            )
                        }
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10, }}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'green', borderRadius: 10, justifyContent: 'center' }}
                            onPress={() => { onStartRecord('word') }}
                        >
                            <Text style={{color:'#fff',fontSize: 24, fontWeight: '600', padding: 7 }}>Start</Text>
                        </TouchableOpacity>
                        {
                            audioData.length == 0 ? (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>00:00:00 </Text>
                            ) : (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>{audioData.recordTime} </Text>
                            )
                        }
                        <TouchableOpacity
                            style={{ backgroundColor: 'green', borderRadius: 10, justifyContent: 'center', }}
                            onPress={() => { onStopRecord() }}
                        >
                            <Text style={{ color:'#fff',fontSize: 24, fontWeight: '600', padding: 7 }}>Stop</Text>
                        </TouchableOpacity>

                    </View> */}
                </View>


                <View style={[styles.cardView, { flexDirection: 'column', alignItems: 'flex-start', }]} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Audio</Text>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'space-evenly', marginLeft: 10 }}>
                        {
                            isPlay == true ? (
                                <TouchableOpacity
                                    style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
                                    onPress={() => { onPausePlay('word') }}>
                                    <MaterialCommunityIcons name='pause' color={'red'} size={50} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
                                    onPress={() => { onStartPlay('word') }}
                                >
                                    <MaterialCommunityIcons name='play' color={'red'} size={50} />
                                </TouchableOpacity>
                            )
                        }
                        {
                            audioData1.length == 0 ? (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>00:00:00 </Text>
                            ) : (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>{audioData1.playTime} </Text>
                            )
                        }
                    </View>

                </View>

                {/* ------------------------------------------------------------------------------------------------------------------- */}
                <View style={[styles.cardView, { backgroundColor: '#1bbb' }]}>
                    <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Meaning</Text>
                    <TextInput
                        style={{ fontSize: 18, flex: 2, backgroundColor: '#fff', color: '#000' }}
                        placeholder="Enter Meaning"
                        placeholderTextColor="#3228"
                        value={meaning}
                        onChangeText={(txt) => setMeaning(txt)}
                    />
                </View>

                <View style={[styles.cardView, { flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#1bbb' }]} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Start Recording</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
                            onPressIn={() => { onStartRecord('meaning') }}
                            onPressOut={() => { onStopRecord() }}
                        >
                            <MaterialCommunityIcons name='microphone' color={'red'} size={50} />
                        </TouchableOpacity>
                        {
                            meaningRecordAudio.length == 0 ? (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>00:00:00</Text>
                            ) : (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>{meaningRecordAudio.recordTime} </Text>
                            )
                        }
                    </View>
                    {/* <View style={{ flexDirection: 'row', marginLeft: 20, marginVertical: 10, }}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'green', borderRadius: 10, justifyContent: 'center' }}
                            onPress={() => { onStartRecord('meaning')}}
                        >
                            <Text style={{color:'#fff',fontSize: 24, fontWeight: '600', padding: 7 }}>Start</Text>
                        </TouchableOpacity>
                        {
                            meaningRecordAudio.length == 0 ? (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>00:00:00</Text>
                            ) : (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>{meaningRecordAudio.recordTime} </Text>
                            )
                        }
                        <TouchableOpacity
                            style={{ backgroundColor: 'green', borderRadius: 10, justifyContent: 'center', }}
                            onPress={() => {onStopRecord() }}
                        >
                            <Text style={{ color:'#fff',fontSize: 24, fontWeight: '600', padding: 7 }}>Stop</Text>
                        </TouchableOpacity>

                    </View> */}
                </View>

                <View style={[styles.cardView, { flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#1bbb' }]} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Audio</Text>
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: 10, justifyContent: 'space-evenly', marginLeft: 10 }}>
                        {
                            isMeaningPlay == true ? (
                                <TouchableOpacity
                                    style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
                                    onPress={() => { onPausePlay('meaning') }}>
                                    <MaterialCommunityIcons name='pause' color={'red'} size={50} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={{ backgroundColor: '#fff', borderRadius: 30, marginRight: 10 }}
                                    onPress={() => { onStartPlay('meaning') }}
                                >
                                    <MaterialCommunityIcons name='play' color={'red'} size={50} />
                                </TouchableOpacity>
                            )
                        }
                        {
                            playMeaningAudioData.length == 0 ? (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>00:00:00 </Text>
                            ) : (
                                <Text style={{ fontSize: 25, fontWeight: 'bold', flex: 1, textAlign: 'center', alignSelf: 'center' }}>{playMeaningAudioData.playTime} </Text>
                            )
                        }
                    </View>

                </View>


                <View style={[styles.cardView, { flexDirection: 'row', height: 70, backgroundColor: '#2c9' }]} >
                    <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', textAlign: 'left', color: '#000' }}> Select Class</Text>
                    <Picker style={{ flex: 1, color: '#000', backgroundColor: '#fff', }}
                        selectedValue={selectedClass}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedClass(itemValue)
                        }
                        mode='dropdown'
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>
                </View> 



                <View style={{ height: 250, padding: 10, backgroundColor: '#2c9' }}>
                    <TouchableOpacity style={{
                        backgroundColor: '#fff', height: '100%', width: '100%', justifyContent: 'center', borderWidth: 1.5,
                        borderColor: '#000'
                    }}
                        onPress={() => choosePhotoFromLibrary()}>
                        {
                            <Image
                                style={{
                                    flex: 1,
                                    resizeMode: 'contain',
                                }}
                                source={{ uri: `data:image/jpeg;base64,${base64Image}` }} />
                        }

                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btnTouchable} onPress={() => editData()}>
                    <Text style={[styles.card_title, { textAlign: 'center' }]}> Save </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
export default EditWord;

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
        // backgroundColor: '#eb4034',
        backgroundColor: '#17bdaf',
        padding: 20,
        // marginBottom: 10,
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
        height: 70,
        color: 'white',
        backgroundColor: '#3EB489',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 10,
    },
})