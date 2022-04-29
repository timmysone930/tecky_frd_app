import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { areas, districtsOfHK, districtsOfKLN, districtsOfNT} from '../../pages/Address/HongKongDistrictData';
import { TextInput } from 'react-native-paper';
import { styles } from '../../styles/GeneralStyles';

//Native-Base
import { Input, Select, FormControl, CheckIcon, Box, WarningOutlineIcon } from 'native-base';

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
    addr: Addr,
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

    useEffect(()=>{
        if ( props.name.length > 0 &&
             props.phone.length == 8 &&
             parseInt(props.phone) != NaN &&
             props.area.length > 0 &&
             props.district.length > 0 && 
             props.addr.estate.length > 0 && 
             props.addr.flat.length > 0 && 
             props.addr.floor.length > 0 ) {

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
                <Input 
                    size="m"
                    placeholder="聯絡電話" 
                    value={props.phone}
                    keyboardType="numeric"
                    isInvalid={props.phone.length != 8}
                    onChangeText={text => props.setInput({...props.input, phone: text})}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={ !(parseInt(props.phone) != NaN && props.phone.length == 8) }>
                    此項必須為 8 位數字電話號碼
                </FormControl.ErrorMessage>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.phone == ""}>
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

                <FormControl.Label>街道</FormControl.Label>
                <Input size="m" mb='1' placeholder={"街道"} value={props.addr.street} onChangeText={text => props.setInput({...props.input, addr:{...props.addr, street:text} as Addr})}/>

                <FormControl.Label>屋苑/大廈</FormControl.Label>
                <Input size="m" mb='1' placeholder={"屋苑/大廈"} value={props.addr.estate} isInvalid={props.addr.estate == ""} onChangeText={text => props.setInput({...props.input, addr:{...props.addr, estate:text} as Addr})}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.addr.estate == ""}>
                    此項必須填寫
                </FormControl.ErrorMessage>

                <FormControl.Label>座</FormControl.Label>
                <Input size="m" mb='1' placeholder={"座"} value={props.addr.block} onChangeText={text => props.setInput({...props.input, addr:{...props.addr, block:text} as Addr})}/>

                <FormControl.Label>樓層</FormControl.Label>
                <Input size="m" mb='1' placeholder={"樓層"} value={props.addr.floor} isInvalid={props.addr.floor == ""} onChangeText={text => props.setInput({...props.input, addr:{...props.addr, floor:text} as Addr})}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.addr.floor == ""}>
                    此項必須填寫
                </FormControl.ErrorMessage>

                <FormControl.Label>室</FormControl.Label>
                <Input size="m" mb='1' placeholder={"室"} value={props.addr.flat} isInvalid={props.addr.flat == ""} onChangeText={text => props.setInput({...props.input, addr:{...props.addr, flat:text} as Addr})}/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />} isInvalid={props.addr.flat == ""}>
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