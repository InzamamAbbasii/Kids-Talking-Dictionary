import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, FlatList,ScrollView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
const audioRecorderPlayer = new AudioRecorderPlayer();

const WordDetail = ({ navigation, route }) => {
    const [audioData, setAudioData] = useState([]);
    const [audioData1, setAudioData1] = useState([]);
    const [isPlay, setIsPlay] = useState(false);

    const [meaningRecordAudio, setMeaningRecordAudio] = useState([]);
    const [playMeaningAudioData, setPlayMeaningAudioData] = useState([]);
    const [isMeaningPlay, setisMeaningPlay] = useState(false);

    const [wordBase64Audio, setWordBase64Audio] = useState(null);
    const [meaningBase64Audio, setMeaningBase64Audio] = useState(null);

    const onStartPlay = async (params) => {
        if (params == 'word') {
            setIsPlay(true);
            const msg = await audioRecorderPlayer.startPlayer(route.params.WordAudio);
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
            setisMeaningPlay(true);
            setAudioData1({ ...audioData1 })
            const msg = await audioRecorderPlayer.startPlayer(route.params.MeaningAudio);
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
            await audioRecorderPlayer.stopPlayer(route.params.WordAudio);
        };
        if (params == 'meaning') {
            setisMeaningPlay(false)
            await audioRecorderPlayer.stopPlayer(route.params.MeaningAudio);
        };
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold', marginLeft: 10 }}>Word : {route.params.Word}</Text>
                    <View style={[styles.cardView, { flexDirection: 'column', alignItems: 'flex-start', backgroundColor: '#1bbb' }]} >
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

                    {/* -------------------------------------------------------------------------------------------------------- */}


                    <Text style={{ fontSize: 32, color: '#3EB489', fontWeight: 'bold', marginLeft: 10 }}>Meaning :  {route.params.Meaning}</Text>
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
                </View>
                <View style={{ minHeight: 250, width: '92%', alignSelf: 'center',borderWidth: 1,borderColor: '#000',marginBottom:10 }}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: 'contain',
                        }}
                        source={{ uri: `data:image/jpeg;base64,${route.params.Image}` }} />
                </View>
            </View>
        </ScrollView>
    );
}

export default WordDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,paddingVertical:10, backgroundColor: '#fff',
    },
    header: {
        paddingBottom: 25,
    },
    cardView: {
        // backgroundColor: '#3EB489',
        width: '94%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    card_title: {
        color: "white",
        fontSize: 18,
        fontWeight: 'bold',
    }
})