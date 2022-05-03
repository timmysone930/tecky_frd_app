import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { store } from '../../redux/store';
import { checkStatus } from '../../redux/AuthSlice';

// Native-base
import { View, Button, useToast} from 'native-base';

// API
import { useGetUserInfoQuery } from '../../API/UserInfoAPI';
import Config from "react-native-config";

const fakeUserInfo = {
    id: "123",
    hkid: "A1234567",
    id_doc_type: "HKID",
    name: "張中和",
    gender: "男",
    phone: "12345678",
    member_code: "M150006",
    binding_member: true,
    email: "abc123@gmail.com",
    birthday: "1998/6/5",
    hkid_img: "img-123456",
    created_at: "2022/4/28",
    channel: "what is this"
}


export function AccountInfoPage({navigation}:any) {
    // Data fetching

    // let fetchData:any;
    const [fetchData, setFetchData] = useState({
        birthday: "", 
        created_at: "", 
        email: "", 
        gender: "", 
        id_img: "", 
        id_number: "", 
        id_type: "", 
        member_code: null, 
        name: "", 
        name_en: "", 
        phone: "",
    })

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
        if (!fetched) {
            infoFetching() 
            setFetched(true)
        }
    },[])

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
                    {/* <View flexDirection={"row"} marginY={5}>
                        {
                            pic === '' ? 
                            <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={require('../../images/profilePic/default.jpg')} /> :
                            <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={require(`../../images/profilePic/test-01.jpg`)} />
                        }
                        <View justifyContent={"center"} marginLeft={10}>
                            <Text style={styles.title}>{fetchData.member_code}</Text>
                            <Text style={styles.contentFont}>{fetchData.name}</Text>
                        </View>
                    </View> */}

                    {fetchData && <View justifyContent={"space-between"} height={200} marginY={5} >
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
                                {fetchData.phone}
                            </Text>
                        </View>
                    </View>}
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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}