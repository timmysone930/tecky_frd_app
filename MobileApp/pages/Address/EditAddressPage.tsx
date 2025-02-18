import React, {useState} from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { AddressForm } from '../../components/address/AddressForm';
import { styles } from '../../styles/GeneralStyles';

// Redux
import { useSelector } from 'react-redux';

// Native-base
import { View, Button, useToast,HStack, Switch } from 'native-base';

// .env
import Config from 'react-native-config';


export function EditAddressPage({navigation}:any) {

    const userToken = useSelector((state: any) => state.getUserStatus.token);

    const addressContent = useSelector((state:any) => state.getAddressData).addressEditContent
    const blankContent = {
        hkid:"",
        name:"",
        name_en:"",
        phone:"852",
        area:"",
        district:"",
        address:"",
        is_default: false
    }
    

    const [formFilled, setFormFilled] = useState(false)

    const [input, setInput] = (addressContent == null)? useState(blankContent) : useState(addressContent)

    const toggleSwitch = (value:boolean) => {setInput({...input, is_default: value})}; 
    
    // Toast: Save Successful
    const toast = useToast();

    const save = async () => {
        if (!formFilled) {
            return
        }

        let toFetchResp: any;
        
        // Deal with (Add new address / Edit existing address)
        if (addressContent == null) {

            toFetchResp = await fetch (`${Config.REACT_APP_API_SERVER}/client/new-addr-book`, {
                headers: {
                    "Authorization":`Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(input),
            })
            console.log(toFetchResp.status);

        } else {
            toFetchResp = await fetch (`${Config.REACT_APP_API_SERVER}/client/edit-addr-book`, {
                headers: {
                    "Authorization":`Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(input)
            })
        }
        
        navigation.navigate("我的地址")

        toast.show({
            description: toFetchResp.status == 201 ? "儲存成功" : "系統錯誤，儲存失敗"
        })
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.viewContainer]}>
                    <AddressForm 
                        hkid={input.hkid}
                        name={input.name}
                        name_en={input.name_en}
                        phone={input.phone}
                        area={input.area}
                        district={input.district}
                        addr={input.address}
                        allFilled={formFilled}
                        setAllFilled={setFormFilled}
                        enabled={true}
                        input={input}
                        setInput={setInput}
                    />
                </View>

                <HStack justifyContent={"center"} alignItems="center" space={4} marginBottom={8}>
                    <Switch size="md" onValueChange={toggleSwitch} isChecked={input.is_default}/>
                    <Text style={[styles.subTitle]}>
                        設為預設送藥地址
                    </Text>
                </HStack>

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
                    儲存
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}
