import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Image, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

// Native-base
import { View, Button, useToast, Input, FormControl, WarningOutlineIcon} from 'native-base';

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

    const fetchData = fakeUserInfo

    let pic = require(`../../images/profilePic/test-01.jpg`)
    pic = ""

    const originalPhone = fetchData.phone
    const [input, setInput] = useState({
        email: fetchData.email,
        phone: fetchData.phone
    })

    const [isDisable, setIsDisable] = useState({
        button: true,
        input: true,
        warning: false,
        phoneInput: false,
        noInput: true 
    })
    
    const verifButtonHandler = () => {
        setIsDisable({...isDisable, input: false, phoneInput: true})
        toast.show({
            description: "已送出驗證碼"
        })
    }
    const phoneInputHandler = (phone: any) => {
        if (input.phone != phone) {
            setIsDisable({...isDisable, button: false})
        }
        setInput({...input, phone: phone})
    }


    const verrifCodeInputHandler = (value: any) => {
        if (value == "" ){
            setIsDisable({...isDisable, noInput: true})
        }
        else {
            setIsDisable({...isDisable, noInput: false})
        }
    }

    const save = () => {
        // If the input of email and phone are empty, not save
        if (input.email == "" || input.phone == "") {
            return
        }
        if (originalPhone != input.phone) {
            if (isDisable.noInput) {
                setIsDisable({...isDisable, warning: true})
                return
            }
        }
        navigation.navigate("我的資料")
        toast.show({
            description: "成功儲存帳戶資料"
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white'}}>
            <ScrollView>
                <View style={[styles.viewContainer]}>
                    <View flexDirection={"row"} marginY={5}>
                        {
                            pic === '' ? 
                            <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={require('../../images/profilePic/default.jpg')} /> :
                            <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={require(`../../images/profilePic/test-01.jpg`)} />
                        }
                        <View justifyContent={"center"} marginLeft={10}>
                            <Text style={styles.title}>{fetchData.member_code}</Text>
                            <Text style={styles.contentFont}>{fetchData.name}</Text>
                        </View>
                    </View>
                    <View justifyContent={"space-between"} height={280} marginY={5}>
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
                                isDisabled={isDisable.phoneInput}
                                size="m" 
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
                    
                    <View flexDirection={"row"}>
                        <Button 
                            isDisabled={isDisable.button}
                            colorScheme={"danger"}
                            alignSelf={'flex-start'} 
                            marginBottom={5}
                            padding={1} 
                            height={10} 
                            flex={1} 
                            size={"lg"} 
                            onPress={verifButtonHandler}
                            >
                                驗證碼
                        </Button>
                        <FormControl isInvalid={isDisable.warning} flex={3}>
                            <Input
                                isDisabled={isDisable.input}
                                height={10}
                                size="lg"  
                                placeholder="請輸入短訊驗證碼" 
                                onChangeText={verrifCodeInputHandler}
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