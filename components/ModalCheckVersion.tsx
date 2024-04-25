import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useQuery } from '@tanstack/react-query';
import { getLastestVersionApk } from '../services/actions';
import Constants from 'expo-constants'
import Markdown from 'react-native-markdown-display';

import * as FileSystem from 'expo-file-system'



const ModalCheckVersion = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [newVersion, setNewVersion] = useState('');

    const fetchVersion = async () => {
        const data = await getLastestVersionApk();
        const currentVersion = data.tag_name;
        const lasVersion = 'v' + Constants.expoConfig?.version;
        setNewVersion(currentVersion);

        if (currentVersion !== lasVersion) {
            setIsVisible(true)
        }

        return data
    }

    const { data, isLoading } = useQuery({
        queryKey: ['checkVersion'],
        queryFn: fetchVersion
    })

    const downloadNewVersion = async () => {
        const url = data?.assets[0].browser_download_url;

        if (url) {
            const fileUri = FileSystem.documentDirectory + data.assets[0].name;
            const downloadResumable = FileSystem.createDownloadResumable(
                url,
                fileUri,
                {},
                (downloadProgress) => {
                    console.log('Download Progress: ', downloadProgress);
                }
            )

            try{
                const downloadResult = await downloadResumable.downloadAsync();
                if(downloadResult && downloadResult.uri){
                    console.log('Finished downloading to ', downloadResult.uri);
                }
            }catch(error){
                console.log(error)
            }

        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
            onDismiss={() => setIsVisible(false)}
        >
            <View className='flex-1 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className='bg-neutral-700 rounded-lg p-5 items-center' style={{ elevation: 5 }}>
                    <Text className='text-lg font-bold mb-2 text-center text-white'>¡New version available! {newVersion}</Text>
                    <Markdown style={
                        {
                            body:
                                { color: 'white', width: Dimensions.get("screen").width * 0.75 },
                            list_item:
                            {
                                color: 'white', width: '100%'
                            }

                        }}>
                        {data?.body || ''}
                    </Markdown>
                    <View className='items-center justify-around flex-row w-80 mt-3'>
                        <Pressable className='bg-slate-500 rounded-lg p-2' onPress={downloadNewVersion}>
                            <Text style={styles.modalButtonText}>Descargar</Text>
                        </Pressable>
                        <Pressable className='bg-red-400 rounded-lg p-2' onPress={() => setIsVisible(false)}>
                            <Text style={styles.modalButtonText}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ModalCheckVersion