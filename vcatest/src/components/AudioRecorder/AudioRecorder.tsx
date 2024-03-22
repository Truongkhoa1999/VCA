import { PermissionResult } from "@/types/permission/hardwarePermission.ts/hardwarPermission";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Button, NativeModules, Platform } from "react-native";
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AVModeIOSOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  RecordBackType,
} from "react-native-audio-recorder-player";
import Permissions, { PERMISSIONS } from "react-native-permissions";
import RNFS from 'react-native-fs';

export const AudioRecorder: React.FC = () => {
  const [didUserPassPermission, setDidUserPassPermission] = useState(false);
  const [recorder, setRecorder] = useState<AudioRecorderPlayer | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState<number>(0); // State for recording seconds
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState<AudioRecorderPlayer | null>(null);
  const recordBackListenerRef = useRef<any>(null); // Ref to store the record back listener

  const audioOptions: AudioSet = {
    AVFormatIDKeyIOS: AVEncodingOption.wav, // Use MP3 encoding for iOS
    AVNumberOfChannelsKeyIOS: 2, // Set the number of audio channels to 2 (stereo) for iOS
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high, // Use high audio quality for iOS
    AudioSourceAndroid: AudioSourceAndroidType.MIC, // Set the audio source to microphone for Android
    OutputFormatAndroid: OutputFormatAndroidType.THREE_GPP, // Use 3GP output format for Android (common for MP3)
    AudioEncoderAndroid: AudioEncoderAndroidType.AMR_NB, // Use AMR-NB encoding for Android (common for MP3)
    AudioEncodingBitRateAndroid: 128000, // Set the audio encoding bitrate to 128 kbps for Android
    AudioSamplingRateAndroid: 44100, // Set the audio sampling rate to 44100 Hz for Android
    AudioChannelsAndroid: 2, // Set the number of audio channels to 2 (stereo) for Android
    AVModeIOS: AVModeIOSOption.measurement, // Use a common audio mode for iOS
  };
  useEffect(() => {
    const initializeAudioRecorder = () => {
      const audioRecorderPlayer = new AudioRecorderPlayer();
      setAudioRecorderPlayer(audioRecorderPlayer);
    };
    checkPermissionMicrophone();
    initializeAudioRecorder();
  }, [isRecording]);

  const checkPermissionMicrophone = async () => {
    const result: PermissionResult = await Permissions.check(
      PERMISSIONS.IOS.MICROPHONE
    );
    if (result === "granted") {
      setDidUserPassPermission(true);
    } else{
      const result: PermissionResult = await Permissions.request(PERMISSIONS.IOS.MICROPHONE)
      if (result === 'granted'){
      setDidUserPassPermission(true);
      } else{
        setDidUserPassPermission(false);

      } 
    }
  };



  
  const onStartRecord = async () => {
    if (audioRecorderPlayer) {
      const currentDate = new Date();
      const result = await audioRecorderPlayer?.startRecorder("something.wav",audioOptions);
      console.log(result);
      setIsRecording(true)
        recordBackListenerRef.current = (recordingMeta: RecordBackType) => {
          setRecordSecs(recordingMeta.currentPosition);
          console.log("Recording position: ", recordingMeta.currentPosition);
          console.log("Metering level: ", recordingMeta.currentMetering);
        };
      
 
      audioRecorderPlayer?.addRecordBackListener(recordBackListenerRef.current);
    } else {
      console.log("audio recorder is null");
      return;
    }
  };

  const onStopRecord = async () => {
    if (audioRecorderPlayer) {
        audioRecorderPlayer?.removeRecordBackListener(); // Remove the record back listener here
      try {
        const result = await audioRecorderPlayer?.stopRecorder();
 
        setRecordSecs(0);
        console.log(result);
        setIsRecording(false);
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    } else {
      console.log("audio recorder is null");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          onPress={onStartRecord}
          title="Record"
          disabled={!didUserPassPermission || isRecording}
        />
        <Button onPress={onStopRecord} title="End" disabled={!isRecording}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
