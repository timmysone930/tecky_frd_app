import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { store } from '../../redux/store';
import { checkStatus } from '../../redux/AuthSlice';

// Native-base
import { View, Button, useToast, HStack, Spinner} from 'native-base';

// API
import { useGetUserInfoQuery } from '../../API/UserInfoAPI';
import Config from "react-native-config";

import { districtSelection } from '../Address/HongKongDistrictSelect';


export function AccountInfoPage({navigation}:any) {
    // Data fetching
    const [fetchData, setFetchData] = useState(null as any)

    async function infoFetching () {
        // const resp = useGetUserInfoQuery('');
        // const { isLoading, data, error } = resp;
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/profile`)
        const result = await resp.json()
        setFetchData(result)
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

    const logOut = () => {
        store.dispatch(checkStatus({name:"", status: false }))
        toast.show({
            description: "已登出"
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: "100%" }}>
            <ScrollView>
                <View style={[styles.viewContainer]}>

                    {fetched && fetchData != null ?
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