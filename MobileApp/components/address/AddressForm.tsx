import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

//Native-Base
import { Input, Select, FormControl, CheckIcon, Box, WarningOutlineIcon, View } from 'native-base';

// Data of Hong Kong District
import { districtSelection } from '../../pages/Address/HongKongDistrictSelect';

// Type of props
export interface Addr {
    street: string, 
    estate: string,
    flat: string,
    floor: string,
    block: string,
}

interface Props {
    hkid: string,
    name: string,
    name_en: string,
    phone: string,
    area: string,
    district: string,
    addr: string,
    enabled: boolean,
    allFilled: boolean,
    setAllFilled: any,
    input: any,
    setInput: any
}
const areaForMap: any = {"香港":"HK", "新界":"NT", "九龍":"KLN"}

// Component
export const AddressForm = (props: Props) => {

    // Handle Address
    const [addr, setAddr] = useState({
        first: props.addr.split("/nl/")[0],
        second: props.addr.split("/nl/")[1]
    })
    useEffect(()=>{
        if ( props.name.length > 0 &&
             props.phone.length == 11 &&
             parseInt(props.phone) != NaN &&
             props.area.length > 0 &&
             props.district.length > 0 && 
             props.addr.split('/nl/')[0].length > 0  &&
             props.addr.split('/nl/')[1].length > 0  &&
             props.addr.split('/nl/')[0] != "undefined" &&
             props.addr.split('/nl/')[1] != "undefined" ) {

            props.setAllFilled(true)
        }
        else {
            props.setAllFilled(false)
        }
    })

    return (
        <>
            <FormControl isDisabled={!props.enabled}>
                <Text style={[styles.subTitle, styles.mv_10]}>
                    收貨聯絡人
                </Text>
                <Input 
                    size="m"  
                    placeholder="聯絡人" 
                    value={props.name}
                    isInvalid={props.name == ""}
                    onChangeText={text => props.setInput({...props.input, name: text})}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.name == ""}>
                    此項必須填寫
                </FormControl.ErrorMessage>
                <Input 
                    size="m"  
                    placeholder="聯絡人 (英文姓名)" 
                    value={props.name_en}
                    isInvalid={props.name_en == ""}
                    onChangeText={text => props.setInput({...props.input, name_en: text})}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.name_en == ""}>
                    此項必須填寫
                </FormControl.ErrorMessage>

                <Text style={[styles.subTitle, styles.mv_10]}>
                    聯絡電話
                </Text>
                <View flexDirection={"row"}>
                    <Input
                        flex={1}
                        size="m"
                        placeholder="區號 (例如: 852)" 
                        value={props.phone.slice(0, 3)}
                        keyboardType="numeric"
                        isInvalid={!(parseInt(props.phone) != NaN && props.phone.slice(0, 3).length > 0)}
                        isDisabled={true}
                        onChangeText={text => props.setInput({...props.input, phone: text + props.phone.slice(3)})}
                    />
                    <Input 
                        flex={4}
                        size="m"
                        placeholder="聯絡電話" 
                        value={props.phone.slice(3)}
                        keyboardType="numeric"
                        isInvalid={!(parseInt(props.phone) != NaN && props.phone.slice(3).length == 8)}
                        onChangeText={text => props.setInput({...props.input, phone: props.phone.slice(0, 3) + text})}
                    />
                </View>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={ !(parseInt(props.phone) != NaN && props.phone.slice(3).length == 8) }>
                    此項必須為 8 位數字電話號碼
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.phone.slice(3).length == 0}>
                    此項必須填寫
                </FormControl.ErrorMessage>
            
                <Text style={[styles.subTitle, styles.mb_10, styles.mt_10]}>
                    收貨地址
                </Text>

                <FormControl.Label>地域</FormControl.Label>
                <FormControl isInvalid={props.area == ""}>
                    <Select
                        accessibilityLabel="請選擇地域" 
                        placeholder="請選擇地域" 
                        borderColor="#737474"
                        minWidth="200" 
                        fontSize="sm"
                        mb='1'
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />
                        }}
                        selectedValue={props.area}
                        onValueChange={(itemValue) => {
                            props.setInput({
                                ...props.input,
                                area: itemValue,
                                district: ""
                            })
                        }}
                    >

                        {Object.keys(areaForMap).map((item: any) => (
                            <Select.Item label={item} value={item} key={areaForMap[item]}/>
                            ))}

                    </Select>
                </FormControl>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.area == ""}>
                    此項必須選擇
                </FormControl.ErrorMessage>

                <FormControl.Label>地區</FormControl.Label>

                <FormControl isInvalid={props.district == ""}>
                    <Select 
                        accessibilityLabel="請選擇地區" 
                        placeholder="請選擇地區" 
                        borderColor="#737474"
                        minWidth="200" 
                        fontSize="sm"
                        mb='1'
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />
                        }}
                        selectedValue={props.district}
                        onValueChange={(itemValue) => {
                            props.setInput({
                                ...props.input,
                                district: itemValue
                            })
                        }}
                    >
                        {districtSelection[areaForMap[props.area]] &&
                            districtSelection[areaForMap[props.area]].map((item:any) => 
                                <Select.Item label={item.chi} value={item.chi} key={item.eng}/>
                            )
                        }
                    </Select>
                
                </FormControl>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.district == ""}>
                    此項必須選擇
                </FormControl.ErrorMessage>

                <FormControl.Label>地址行 1</FormControl.Label>
                <Input 
                    size="m" 
                    mb='1' 
                    placeholder={"地址行 1"} 
                    value={addr.first} 
                    isInvalid={props.addr.length == 0} 
                    onChangeText={text =>{
                        setAddr({...addr, first: text})
                        props.setInput({
                            ...props.input,
                            address: text+"/nl/"+addr.second
                        })
                    }}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={addr.first == "" || addr.first == undefined}>
                    此項必須填寫
                </FormControl.ErrorMessage>

                <FormControl.Label>地址行 2</FormControl.Label>
                <Input 
                    size="m" 
                    mb='1' 
                    placeholder={"地址行 2"} 
                    value={addr.second} 
                    isInvalid={props.addr.length == 0} 
                    onChangeText={text =>{
                        setAddr({...addr, second: text})
                        props.setInput({
                            ...props.input,
                            address: addr.first+"/nl/"+text
                        })
                    }}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={addr.second == "" || addr.second == undefined}>
                    此項必須填寫
                </FormControl.ErrorMessage>
                
            </FormControl>

                {/* {input.area == "新界" && districtsOfNT.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))}
                {input.area == "香港" && districtsOfHK.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))}
                {input.area == "九龍" && districtsOfKLN.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))} */}

            
        </>
    )
}