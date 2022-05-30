import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { store } from '../../redux/store';
import { checkStatus } from '../../redux/AuthSlice';
import { useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/AuthSlice';

// Native-base
import { View, Button, useToast, HStack, Spinner} from 'native-base';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// .env
import Config from "react-native-config";

export function AccountInfoPage({navigation}:any) {

    const userToken = useSelector((state: any) => state.getUserStatus.token);
    // Data fetching
    const [fetchData, setFetchData] = useState(null as any)

    async function infoFetching () {
        // const resp = useGetUserInfoQuery('');
        // const { isLoading, data, error } = resp;
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/profile`, {
            headers:{
                "Authorization":`Bearer ${userToken}`,
            }
        })
        const result = resp.status === 200 ? (await resp.json()) : "";
        if (resp.status === 200) {
            const member_code = "M000000".slice(0, -result.member_code.toString().length)
            const displayMemberCode = member_code + result.member_code.toString()
    
            setFetchData({...result, member_code: displayMemberCode})
        } else {
            setFetchData(result)
        }
        return result
    }
    
    const [fetched, setFetched] = useState(false)

    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            infoFetching()
            setFetched(true)
        });

        return () => {unsubscribe}
    },[navigation])

    // Toast
    const toast = useToast()

    // Image paths
    let pic = require(`../../images/profilePic/test-01.jpg`)
    pic = ""

    const editInfo = () => {
        navigation.navigate("變更帳戶資料")
    }

    const logOut = async() => {
        store.dispatch(checkStatus({isLogin: false, phone: null }))
        store.dispatch(setUserInfo({ member_code:'',token:'' }))
        await AsyncStorage.removeItem('@storage_Key')
        toast.show({
            description: "已登出"
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: "100%" }}>
            <ScrollView>
                <View style={[styles.viewContainer]}>

                    {fetched && fetchData != null && fetchData != "" ?
                    <>
                        <View justifyContent={"space-between"} height={200} marginY={5} >
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>
                                    會員編號: 
                                </Text>
                                <Text style={[styles.subTitle]}>
                                    {fetchData.member_code}
                                </Text>
                            </View>
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>
                                    姓名: 
                                </Text>
                                <Text style={[styles.subTitle]}>
                                    {fetchData.name}
                                </Text>
                            </View>
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>
                                    性別: 
                                </Text>
                                <Text style={[styles.subTitle]}>
                                    {fetchData.gender}
                                </Text>
                            </View>
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>
                                    出生日期: 
                                </Text>
                                <Text style={[styles.subTitle]}>
                                    {fetchData.birthday}
                                </Text>
                            </View>
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>
                                    Email: 
                                </Text>
                                <Text style={[styles.subTitle]}>
                                    {fetchData.email}
                                </Text>
                            </View>
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>
                                    手提電話號碼: 
                                </Text>
                                <Text style={[styles.subTitle]}>
                                    {fetchData.phone.slice(0,3)}&nbsp;{fetchData.phone.slice(3)}
                                </Text>
                            </View>
                        </View>
                        <View justifyContent={"space-between"} height={130} marginY={8} >
                            <Button 
                                alignSelf={'center'} 
                                marginX={2}
                                marginBottom={5}
                                padding={1} 
                                height={10} 
                                width={200} 
                                size={"lg"} 
                                onPress={editInfo}
                            >
                                編輯
                            </Button>
                            <Button 
                                colorScheme={"danger"}
                                alignSelf={'center'} 
                                marginX={2}
                                marginBottom={5}
                                padding={1} 
                                height={10} 
                                width={200} 
                                size={"lg"} 
                                onPress={logOut}
                            >
                                登出
                            </Button>
                        </View>
                    </>
                    :
                        (fetchData == "" ?
                        <>
                            <Text style={[{textAlign: "center"}, styles.contentText]}>
                                會員資料存取失敗
                            </Text>
                            <Button 
                                colorScheme={"danger"}
                                alignSelf={'center'} 
                                marginX={2}
                                marginBottom={5}
                                padding={1} 
                                height={10} 
                                width={200} 
                                size={"lg"} 
                                onPress={logOut}
                            >
                                登出
                            </Button>
                        </>
                        
                        :
                        // Loading Spinner
                        <HStack space={2} justifyContent="center" alignItems={'center'}>
                            <Spinner color="#225D66" accessibilityLabel="Loading posts" />
                        </HStack>
                        )
                    }

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}