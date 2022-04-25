import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from '../../styles/GeneralStyles';
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FakeDrDATA } from '../DoctorRelated/DrListPage';

const FakeData = {
    pres_code: "RM220319001",
    prescription_details: [
        "acetaminophen: 3粒 (止痛)",
        "diphenhydramine: 100ml (止咳)",
        "Eurax: 50ml (外用止痕)"
    ],
    created_at: "2022年3月19日",
    order_status: "待付款",
    payment: "",
    is_delivery: "",
    courier_code: "",
    delivery_contact: "",
    delivery_phone: "",
    area: "",
    district: "",
    addr: "",
    pick_up_store: "",
    remark: "",
    doctor: "陳大文 Chan Tai Man",
    profession: "表列中醫",
    course_of_treatment: "3日",
    patient_name: "張中和",
    patient_id: "A123456(7)",
    cost: "$300",
    contact_number: "1234 5678",
    districts: [
        {
            district: "馬鞍山",
            addr: "Room 11, ABC centre, Kowloon Bay, Kowloon"  
        },
        {
            district: "青衣",
            addr: "Room 2, DEF centre, Tsing Yi, NT"
        }
    ],
}



// Component
const DisplayDeliveryOption = (props:any) => {
    
    const [deliveryOption, setDeliveryOption] = useState('pick-up');
    const [pickUpClinic, setPickUpClinic] = useState({
        district: props.data.districts[0].district,
        addr: props.data.districts[0].addr
    })

    return (
        <View style={[styles.viewContainer]}>
            <Text style={[styles.title, styles.mb_10]}>
                藥單編號: {props.data.pres_code}
            </Text>
            <View>

                {/* Select Method: 分店自取 */}
                <View style={[styles.flexRow, styles.AICenter]}>
                    <RadioButton
                        value="pick-up"
                        status={ deliveryOption === 'pick-up' ? 'checked' : 'unchecked' }
                        onPress={() => setDeliveryOption('pick-up')}
                    />
                    <Text style={[styles.contentFont]}>
                        分店自取
                    </Text>
                </View>
                <View>
                    <Picker
                        enabled={deliveryOption === 'pick-up'}
                        selectedValue={pickUpClinic.district}
                        onValueChange={(itemValue, itemIndex) =>
                            setPickUpClinic({
                                district: itemValue,
                                addr: props.data.districts[itemIndex].addr
                            })
                    }>
                        {props.data.districts.map((item: any) => (
                            <Picker.Item label={item.district+"分店"} value={item.district} key={item.district}/>
                        ))}
                    </Picker>
                    <View style={[styles.flexRow]}>
                        <Icon name="map-marker" size={20} color="#325C80" />
                        <Text style={[styles.mb_10, styles.mh_10]}>
                            {pickUpClinic.addr}
                        </Text>
                    </View>
                </View>

                {/* Select Method: 上門送藥 */}
                <View style={[styles.flexRow, styles.AICenter, styles.mt_10]}>
                    <RadioButton
                        value="deliver"
                        status={ deliveryOption === 'deliver' ? 'checked' : 'unchecked' }
                        onPress={() => setDeliveryOption('deliver')}
                    />
                    <Text style={[styles.contentFont]}>
                        上門送藥 (運費到付)
                    </Text>
                </View>
                <View>
                    <AddressForm inputData={props.addressFormData} enabled={deliveryOption === 'deliver'}/>
                </View>
            </View>
            <Text style={[styles.mt_10, styles.mb_10]}>
                付款前，請詳細核對送貨地址。
            </Text>
            <Button mode="contained" color='#325C80' onPress={()=> console.log({deliveryOption, pickUpClinic})} disabled={false}> 
                <Text>
                    前往付款
                </Text>
            </Button>
        </View>
    )
}

const FakeAddr = [
    {
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "新界",
        district: "沙田區大圍",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "3", 
            floor: "20", 
            block: "A"
        },
        is_default: true,
    },
    {
        hkid: "A123456(7)",
        name: "張中和",
        phone: "12345678",
        area: "九龍",
        district: "油尖旺區大南",
        addr: {
            street: "XXX街", 
            estate: "XXX屋苑", 
            flat: "3", 
            floor: "20", 
            block: "A"
        },
        is_default: false,
    },
]


import { areas, districtsOfHK, districtsOfKLN, districtsOfNT} from '../Address/HongKongDistrictData';
import { TextInput } from 'react-native-paper';
const HKdata = require("../Address/HKGS_Dataset_2019-District.json")

const HKDistricts = HKdata.features.map((item:any)=>{
    return {
        DISTRICT_T: item.properties.DISTRICT_T,
        DISTRICT_E: item.properties.DISTRICT_E,
        CNAME: item.properties.CNAME,
        ENAME: item.properties.ENAME
    }
})

const AddressForm = (props: any) => {
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
            <TextInput editable={props.enabled} label={"街道"} value={input.addr.street} onChangeText={text => setInput({...input, addr:{street:text}})}/>
            <TextInput editable={props.enabled} label={"屋苑/大廈"} value={input.addr.estate} onChangeText={text => setInput({...input, addr:{estate:text}})}/>
            <TextInput editable={props.enabled} label={"座"} value={input.addr.block} onChangeText={text => setInput({...input, addr:{block:text}})}/>
            <TextInput editable={props.enabled} label={"樓層"} value={input.addr.floor} onChangeText={text => setInput({...input, addr:{floor:text}})}/>
            <TextInput editable={props.enabled} label={"室"} value={input.addr.flat} onChangeText={text => setInput({...input, addr:{flat:text}})}/>
        </>
    )
}

export const DeliveryOptionPage = (props:any)=> {
    return (
        <SafeAreaView>
            <ScrollView>
                <DisplayDeliveryOption data={FakeData} addressFormData={FakeAddr}/>
            </ScrollView>
        </SafeAreaView>
    );
}
