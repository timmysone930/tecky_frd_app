import React, { useState } from 'react';
import { Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { areas, districtsOfHK, districtsOfKLN, districtsOfNT} from '../../pages/Address/HongKongDistrictData';
import { TextInput } from 'react-native-paper';
import { styles } from '../../styles/GeneralStyles';

// Data of Hong Kong District
const HKdata = require("../../pages/Address/HKGS_Dataset_2019-District.json")

const HKDistricts = HKdata.features.map((item:any)=>{
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
    inputData: {
        hkid: string,
        name: string,
        phone: string,
        area: string,
        district: string,
        addr: Addr,
        is_default: boolean,
    }[],
    enabled: boolean
}

// Component
export const AddressForm = (props: Props) => {
    const defaultInput = props.inputData.filter((obj:any) => obj.is_default == true)[0]
    const [input, setInput] = useState(defaultInput)
    const areaSelection = areas
    return (
        <>
            <Text style={[styles.subTitle, styles.mb_10]}>收貨聯絡人</Text>
            <TextInput editable={props.enabled} label={"聯絡人"} value={input.name} onChangeText={text => setInput({...input, name: text})}/>
            <TextInput editable={props.enabled} label={"聯絡電話"} value={input.phone} onChangeText={text => setInput({...input, phone: text})}/>
            <Text style={[styles.subTitle, styles.mb_10, styles.mt_10]}>收貨地址</Text>
        
            <Picker
                style={[{backgroundColor:"#e7e7e7"}]}
                enabled={props.enabled}
                selectedValue={input.area}
                onValueChange={(itemValue, itemIndex) =>
                    setInput({
                        ...input,
                        area: itemValue
                    })
            }>
                {areaSelection.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))}
            </Picker>

            <Picker
                style={[{backgroundColor:"#e7e7e7"}]}
                enabled={props.enabled}
                selectedValue={input.district}
                onValueChange={(itemValue, itemIndex) =>
                    setInput({
                        ...input,
                        district: itemValue
                    })
            }>
                {input.area == "新界" && districtsOfNT.map((item: any) => (
                    HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                        <Picker.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                    )
                ))}
                {input.area == "香港" && districtsOfHK.map((item: any) => (
                    HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                        <Picker.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                    )
                ))}
                {input.area == "九龍" && districtsOfKLN.map((item: any) => (
                    HKDistricts.filter((i:any)=> i.DISTRICT_T == item.chi).map((x:any)=>
                        <Picker.Item label={x.DISTRICT_T+" - "+x.CNAME} value={x.DISTRICT_T+x.CNAME} key={x.CNAME}/>
                    )
                ))}
                {/* {input.area == "新界" && districtsOfNT.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))}
                {input.area == "香港" && districtsOfHK.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))}
                {input.area == "九龍" && districtsOfKLN.map((item: any) => (
                    <Picker.Item label={item.chi} value={item.chi} key={item.eng}/>
                ))} */}
            </Picker>
            <TextInput editable={props.enabled} label={"街道"} value={input.addr.street} onChangeText={text => setInput({...input, addr:{street:text} as Addr})}/>
            <TextInput editable={props.enabled} label={"屋苑/大廈"} value={input.addr.estate} onChangeText={text => setInput({...input, addr:{estate:text} as Addr})}/>
            <TextInput editable={props.enabled} label={"座"} value={input.addr.block} onChangeText={text => setInput({...input, addr:{block:text} as Addr})}/>
            <TextInput editable={props.enabled} label={"樓層"} value={input.addr.floor} onChangeText={text => setInput({...input, addr:{floor:text} as Addr})}/>
            <TextInput editable={props.enabled} label={"室"} value={input.addr.flat} onChangeText={text => setInput({...input, addr:{flat:text} as Addr})}/>
        </>
    )
}