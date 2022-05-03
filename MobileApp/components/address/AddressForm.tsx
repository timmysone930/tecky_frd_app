import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { areas, districtsOfHK, districtsOfKLN, districtsOfNT} from '../../pages/Address/HongKongDistrictData';
import { TextInput } from 'react-native-paper';
import { styles } from '../../styles/GeneralStyles';

//Native-Base
import { Input, Select, FormControl, CheckIcon, Box, WarningOutlineIcon, View } from 'native-base';

// Data of Hong Kong District
const HKdata = require("../../pages/Address/HKGS_Dataset_2019-District.json")

export const HKDistricts = HKdata.features.map((item:any)=>{
    return {
        DISTRICT_T: item.properties.DISTRICT_T,
        DISTRICT_E: item.properties.DISTRICT_E,
        CNAME: item.properties.CNAME,
        ENAME: item.properties.ENAME
    }
})

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

// Component
export const AddressForm = (props: Props) => {
    // const [input, setInput] = useState({
    //     hkid: "",
    //     name: "",
    //     phone: "",
    //     area: "",
    //     district: "",
    //     addr: {
    //         street: "", 
    //         estate: "",
    //         flat: "",
    //         floor: "",
    //         block: "",
    //     },
    //     enabled: true,
    // })
    const areaSelection = areas
    const areaForMap = [["香港", districtsOfHK], ["新界", districtsOfNT], ["九龍", districtsOfKLN]]

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
             props.addr.length > 0  ) {

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

                <Text style={[styles.subTitle, styles.mv_10]}>
                    聯絡電話
                </Text>
                <View flexDirection={"row"}>
                    <Input
                        flex={1}
                        size="m"
                        placeholder="區號" 
                        value={props.phone.slice(0, 3)}
                        keyboardType="numeric"
                        isInvalid={!(parseInt(props.phone) != NaN && props.phone.slice(0, 3).length > 0)}
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
                

                {/* <TextInput editable={props.enabled} label={"聯絡人"} value={props.name} onChangeText={text => props.setInput({...props.input, name: text})}/>
                <TextInput editable={props.enabled} label={"聯絡電話"} value={props.phone} onChangeText={text => props.setInput({...props.input, phone: text})}/> */}

            
            
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

                        {areaSelection.map((item: any) => (
                            <Select.Item label={item.chi} value={item.chi} key={item.eng}/>
                            ))}

                    </Select>
                </FormControl>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.area == ""}>
                    此項必須選擇
                </FormControl.ErrorMessage>

                <FormControl.Label>地區</FormControl.Label>

                {/* {areaForMap.map((a: any) => 
                    {props.input.area === a[0] && 
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
                            selectedValue={props.input.district}
                            onValueChange={(itemValue) => {
                                props.setInput({
                                    ...props.input,
                                    district: itemValue
                                })
                            }}
                        >

                                {a[1].map((item: any) => (
                                    HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                        <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                                    )
                                ))}

                        </Select>
                    }
                )} */}
                <FormControl isInvalid={props.district == ""}>
                {props.area === "香港" && 
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

                            {districtsOfHK.map((item: any) => (
                                HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                    <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                                )
                            ))}

                    </Select>
                }
                {props.area === "新界" && 
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

                        {districtsOfNT.map((item: any) => (
                            HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                            )
                        ))}
                        
                </Select>}

                {props.area == "九龍" && 
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

                        {districtsOfKLN.map((item: any) => (
                            HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                            )
                        ))}
                        
                </Select>}
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
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.addr.length == 0}>
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
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.addr.length == 0}>
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