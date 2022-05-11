import React from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useGetDoctorListQuery } from '../../API/DoctorAPI';
import { DocListComponent } from '../../components/doctor/DocListComponent';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { SearchComponent } from '../../components/utils/SearchComponent';
import {styles} from '../../styles/DoctorStyle';

interface dataType{
    "clinic": [[Object]], 
    "doctor_code": string, 
    "doctor_des": string, 
    "email": string, 
    "gender": string, 
    "img": null | string, 
    "name": string, 
    "name_en": string, 
    "qual_doc": null|string, 
    "signature": string|null, 
    "spec_name": [string], 
    "status": string, 
    "video_diag_duration": number, 
    "video_diag_fee": number
}
 // white background
const backgroundStyle = { backgroundColor: 'white', };

export const DocListPage: React.FC = (prop: any) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const { mode } = prop.route.params;
    let data;
    let isLoading;
    let isSuccess;
    let isError;
    // fetch doctor list data
    if (mode === '西醫') {
        data = useGetDoctorListQuery().data;
        isLoading = useGetDoctorListQuery().isLoading;
        isError = useGetDoctorListQuery().isError;
        isSuccess = useGetDoctorListQuery().isSuccess;
    }
    // search function
    if (searchQuery !== '') {
        let newData = data.filter( (item:dataType) => (item.name.includes(searchQuery) || item.name_en.toLowerCase().includes(searchQuery.toLowerCase())
        ||item.spec_name.toString().includes(searchQuery) )
        );
        data = newData
    }
    // For FlatList
    const renderItem = (props: any) =>
    (
        <TouchableOpacity style={styles.docListCard} onPress={() => {
            prop.navigation.navigate('相關醫生', {
                screen: '醫生詳情',
                params: {
                    id: props.item.doctor_code, docData: {
                        name: props.item.name, gender: props.item.gender, id: props.item.doctor_code, doctor_des: props.item.doctor_des,
                        img: props.item.img, name_en: props.item.name_en, clinic: props.item.clinic, spec_name: props.item.spec_name, video_diag_fee:props.item.video_diag_fee
                    }
                },
            })
        }}>
            <DocListComponent props={props.item} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <SearchComponent placeholder={"搜索醫生以及科目"} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <View style={[backgroundStyle, { flex: 1 }]}>
                {isLoading && <SpinnerComponent />}
                {isError && <Text style={[styles.title,,styles.t_center]}>載入出現錯誤...</Text>}
                {isSuccess &&
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, idx) => `docList_${item.doctor_code}_${idx}`}
                    />
                }
            </View>
        </SafeAreaView>
    )
}