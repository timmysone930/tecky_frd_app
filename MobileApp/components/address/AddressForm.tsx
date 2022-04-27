import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { areas, districtsOfHK, districtsOfKLN, districtsOfNT} from '../../pages/Address/HongKongDistrictData';
import { TextInput } from 'react-native-paper';
import { styles } from '../../styles/GeneralStyles';

//Native-Base
import { Input, Select, FormControl, CheckIcon, Box } from 'native-base';

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
                    onChangeText={text => props.setInput({...props.input, name: text})}
                />
                <Text style={[styles.subTitle, styles.mv_10]}>
                    聯絡電話
                </Text>
                <Input 
                    size="m"  
                    placeholder="聯絡電話" 
                    value={props.phone} 
                    onChangeText={text => props.setInput({...props.input, phone: text})}
                />

                {/* <TextInput editable={props.enabled} label={"聯絡人"} value={props.name} onChangeText={text => props.setInput({...props.input, name: text})}/>
                <TextInput editable={props.enabled} label={"聯絡電話"} value={props.phone} onChangeText={text => props.setInput({...props.input, phone: text})}/> */}

            
            
                <Text style={[styles.subTitle, styles.mb_10, styles.mt_10]}>
                    收貨地址
                </Text>

                <FormControl.Label>地域</FormControl.Label>
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
                    selectedValue={props.input.area}
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
                {props.input.area === "香港" && 
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

                            {districtsOfHK.map((item: any) => (
                                HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                    <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                                )
                            ))}

                    </Select>
                }
                {props.input.area === "新界" && 
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

                        {districtsOfNT.map((item: any) => (
                            HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                            )
                        ))}
                        
                </Select>}

                {props.input.area == "九龍" && 
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

                        {districtsOfKLN.map((item: any) => (
                            HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                                <Select.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                            )
                        ))}
                        
                </Select>}

                <FormControl.Label>街道</FormControl.Label>
                <Input size="m" mb='1' placeholder={"街道"} value={props.input.addr.street} onChangeText={text => props.setInput({...props.input, addr:{street:text} as Addr})}/>
                <FormControl.Label>屋苑/大廈</FormControl.Label>
                <Input size="m" mb='1' placeholder={"屋苑/大廈"} value={props.input.addr.estate} onChangeText={text => props.setInput({...props.input, addr:{estate:text} as Addr})}/>
                <FormControl.Label>座</FormControl.Label>
                <Input size="m" mb='1' placeholder={"座"} value={props.input.addr.block} onChangeText={text => props.setInput({...props.input, addr:{block:text} as Addr})}/>
                <FormControl.Label>樓層</FormControl.Label>
                <Input size="m" mb='1' placeholder={"樓層"} value={props.input.addr.floor} onChangeText={text => props.setInput({...props.input, addr:{floor:text} as Addr})}/>
                <FormControl.Label>室</FormControl.Label>
                <Input size="m" mb='1' placeholder={"室"} value={props.input.addr.flat} onChangeText={text => props.setInput({...props.input, addr:{flat:text}as Addr})}/>
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