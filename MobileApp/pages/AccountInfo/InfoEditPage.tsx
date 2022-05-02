import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { View, Button, useToast, Input, FormControl, WarningOutlineIcon} from 'native-base';

// API
import { useGetUserInfoQuery, usePutEditInfoMutation } from '../../API/UserInfoAPI';
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


export function InfoEditPage({navigation}:any) {

    // Toast
    const toast = useToast()
    
    // Data fetching
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

    // Align the original phone number for comparison with the new input phone number
    const [originalPhone, setOriginalPhone] = useState("")

    // New input
    const [input, setInput] = useState({
        email: "",
        areaCode: "",
        phone: ""
    })

    const infoFetching = async () => {
        const resp = await fetch (`${Config.REACT_APP_API_SERVER}/client/profile`)
        const result = await resp.json()
        setFetchData(result)
        setInput({
            ...input,
            email: result.email,
            areaCode: result.phone.slice(0, 3),
            phone: result.phone.slice(3, 12)
        })
        setOriginalPhone(result.phone.slice(3, 12))
    }
    
    const [fetched, setFetched] = useState(false)

    useEffect(()=>{
        if (!fetched) {
            infoFetching() 
            setFetched(true)
        }
    },[])


    // Image path
    // let pic = require(`../../images/profilePic/test-01.jpg`)
    // pic = ""


    // Determine The inputs are enable or not
    const [isDisable, setIsDisable] = useState({
        button: true,
        input: true,
        warning: false,
        phoneInput: false,
        noInput: true 
    })
    
    // 電話輸入欄
    const phoneInputHandler = (phone: any) => {
        setInput({...input, phone: phone})

        if (originalPhone != phone && phone.length == 8) {
            setIsDisable({...isDisable, button: false})
        } else {
            setIsDisable({...isDisable, button: true})
        }
    }

    //60s count down set up
    const countTime = 60
    const [counter, setCounter] = useState(countTime);
    const [isActive, setIsActive] = useState(false)

    // 驗證碼掣
    const verifyButtonHandler = () => {
        // Reset the counter to 60s
        setCounter(countTime)
        // Activate 60s count down
        setIsActive(true)
        setIsDisable({...isDisable, input: false, phoneInput: true, button: true})
        toast.show({
            description: "已送出驗證碼"
        })
    }

    // 60s count down
    useEffect(() => {
        if (isActive) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            counter == 0 && setIsDisable({...isDisable, button: false});
            counter == 0 && setIsActive(false);
        }
    });
    
    // 驗證碼輸入欄
    const verifyCodeInputHandler = (value: any) => {
        if (value == "" ){
            setIsDisable({...isDisable, noInput: true})
        }
        else {
            setIsDisable({...isDisable, noInput: false})
        }
    }


    // Save all
    const [putEditInfo] = usePutEditInfoMutation();
    const save = async () => {
        // If the input of email and phone are empty, not save
        if (input.email.length == 0 || input.phone.length == 0) {
            return
        }
        if (originalPhone != input.phone) {
            if (isDisable.noInput) {
                setIsDisable({...isDisable, warning: true})
                return
            }
        }
        
        const newInfo = {
            ...fetchData,
            email: input.email,
            phone: input.areaCode + input.phone,
        }
        console.log(newInfo);

        const resp = await putEditInfo(newInfo)
        
        
        navigation.navigate("查看")
        toast.show({
            description: "成功儲存帳戶資料"
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white'}}>
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
                    { fetchData &&
                        <View justifyContent={"space-between"} height={400} marginY={5}>
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
                                <Text style={[{width: 130}, styles.contentText]}>性別: </Text>
                                <Text style={[styles.subTitle]}>{fetchData.gender}</Text>
                            </View>
                            <View flexDirection={'row'}>
                                <Text style={[{width: 130}, styles.contentText]}>出生日期: </Text>
                                <Text style={[styles.subTitle]}>{fetchData.birthday}</Text>
                            </View>

                            {/* Email */}
                            <FormControl isInvalid={input.email == ""}>
                                <Text style={[{width: 130}, styles.contentText]}>Email: </Text>
                                <Input
                                    size="lg"
                                    placeholder="Email" 
                                    keyboardType='email-address'
                                    value={input.email} 
                                    onChangeText={email => setInput({...input, email: email})}
                                />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    此項必須填寫
                                </FormControl.ErrorMessage>
                            </FormControl>

                            {/* 手提電話號碼 */}
                            <FormControl isInvalid={input.phone == ""} >
                                <Text style={[{width: 130}, styles.contentText]}>手提電話號碼: </Text>
                                <Input 
                                    value={input.areaCode}
                                    isDisabled={true}
                                    size="lg" 
                                    keyboardType="numeric"
                                    placeholder="區號" 
                                    onChangeText={phoneInputHandler}
                                />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    此項必須填寫
                                </FormControl.ErrorMessage>
                                <Input
                                    isDisabled={isDisable.phoneInput}
                                    size="lg" 
                                    keyboardType="numeric"
                                    placeholder="手提電話號碼" 
                                    value={input.phone} 
                                    onChangeText={phoneInputHandler}
                                />
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={input.phone.length != 8}>
                                    此項必須為 8 位數字電話號碼
                                </FormControl.ErrorMessage>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                    此項必須填寫
                                </FormControl.ErrorMessage>
                            </FormControl>

                        </View>
                    }
                    
                    <View flexDirection={"row"}>
                        <Button 
                            isDisabled={isDisable.button}
                            colorScheme={"danger"}
                            alignSelf={'flex-start'} 
                            marginBottom={5}
                            padding={1} 
                            height={10} 
                            flex={2} 
                            size={"lg"}
                            onPress={verifyButtonHandler}
                            >
                                <Text style={{color: "white"}}>
                                    驗證碼 {isActive &&`(${counter})`}
                                </Text>
                        </Button>
                        <FormControl isInvalid={isDisable.warning} flex={4}>
                            <Input
                                isDisabled={isDisable.input}
                                height={10}
                                size="lg"  
                                placeholder="請輸入短訊驗證碼" 
                                onChangeText={verifyCodeInputHandler}
                            />
                            
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                此項必須填寫
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </View>

                    <View justifyContent={"center"} height={50} marginY={5} >
                        <Button 
                            alignSelf={'center'} 
                            marginX={2}
                            marginBottom={5}
                            padding={1} 
                            height={10} 
                            width={200} 
                            size={"lg"} 
                            onPress={save}
                        >
                            儲存變更
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}