import { styles } from '../../styles/GeneralStyles';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';

// Native-base
import { View, Button, useToast, HStack, Spinner } from 'native-base';

// API
import Config from "react-native-config";

// Redux
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { logoutAction } from '../../redux/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';

export function AccountDeletionPage({ navigation }: any) {

    const userToken = useSelector((state: any) => state.getUserStatus.token);

    // Toast
    const toast = useToast()

    // Data fetching
    const [memberCode, setMemberCode] = useState<null | number>(null)

    const infoFetching = async () => {
        const resp = await fetch(`${Config.REACT_APP_API_SERVER}/client/profile`, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
            }
        })

        const result = await resp.json()
        setMemberCode(result.member_code);
    }

    const [fetched, setFetched] = useState(false)

    useEffect(() => {
        if (!fetched) {
            infoFetching()
            setFetched(true)
        }
    }, [])

    // Delete client
    const deleteClient = async () => {

        if(memberCode === null){
            toast.show({
                description: "Invalid user data."
            })
            
            return;
        }

        const resp = await fetch(`${Config.REACT_APP_API_SERVER}/client/delete-profile`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${userToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                member_code: memberCode
            })
        });

        if (resp.status == 200) {
            OneSignal.removeExternalUserId((results: any) => {
                console.log(`Results of removing external user id ${results}`)
            })
            logOut();
        }
    }

    const logOut = async () => {
        store.dispatch(logoutAction())

        await AsyncStorage.removeItem('@storage_Key');

        toast.show({
            description: "成功刪除帳戶"
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
            <ScrollView>
                <View style={[styles.viewContainer]}>
                    {fetched && memberCode != null ?
                        <>
                            <View justifyContent={"flex-end"} alignItems={'center'} height={200} marginY={5}>
                                <View flexDirection={'column'}>
                                    <Text style={[{ width: 130 }, styles.contentText]}>
                                        確定刪除此帳號?
                                    </Text>
                                </View>
                            </View>
                            <View justifyContent={"center"} height={50} marginY={5} >
                                <Button
                                    colorScheme={"danger"}
                                    alignSelf={'center'}
                                    marginX={2}
                                    marginBottom={5}
                                    padding={1}
                                    height={10}
                                    width={200}
                                    size={"lg"}
                                    onPress={deleteClient}
                                >
                                    確定
                                </Button>
                            </View>
                        </>
                        :
                        // Loading Spinner
                        <HStack space={2} justifyContent="center" alignItems={'center'}>
                            <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                        </HStack>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}