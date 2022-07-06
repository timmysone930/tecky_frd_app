import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useGetAllDoctorBySpecQuery, useGetDoctorListQuery } from '../../API/DoctorAPI';
import { DocListComponent } from '../../components/doctor/DocListComponent';
import { SpinnerComponent } from '../../components/utils/SpinnerComponent';
import { SearchComponent } from '../../components/utils/SearchComponent';
import {styles} from '../../styles/DoctorStyle';
import { useNavigation } from '@react-navigation/native';

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

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export const DocListPage: React.FC = (prop: any) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const [dBList, setDbList] =React.useState<any>([])
    const { mode } = prop.route.params;
    let data:any;
    let isLoading;
    let isSuccess;
    let isError;
    let listData;
    // fetch doctor list data
    if (mode === '所有專科') {
        data = useGetDoctorListQuery();
        isLoading = data.isLoading;
        isError = data.isError;
        isSuccess = data.isSuccess;
        listData = data.data
    }else{
        data = useGetAllDoctorBySpecQuery(mode);
        isLoading = data.isLoading;
        isError = data.isError;
        isSuccess = data.isSuccess;
        listData = data.data
    }
    // set dbLIst
    useEffect(()=>{
        setDbList(data.data)
    },[data.isFetching])


    // search function
    useEffect(()=>{
        if(data.data){
            let newData = data.data.filter( (item:dataType) => (
                item.name.includes(searchQuery) 
                ||  item.name_en.toLowerCase().includes(searchQuery.toLowerCase())
                ||  item.spec_name.toString().includes(searchQuery) )
            );
            setDbList(newData)
        }
    },[searchQuery])

    // refresh
    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            data.refetch();
            wait(2000).then(() => setRefreshing(false));
        } catch (e) {
            console.log(e)
        }
    }, []);

    const navigation = useNavigation(); 
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            data.refetch();
        });
        return () => {unsubscribe}
    }, [navigation])


    // For FlatList
    const renderItem = (props: any) =>
    (
        <TouchableOpacity style={styles.docListCard} onPress={() => {
            prop.navigation.navigate('相關醫生', {
                screen: '醫生詳情',
                params: {
                    id: props.item.doctor_code, docData: {
                        name: props.item.name, 
                        gender: props.item.gender, 
                        id: props.item.doctor_code, 
                        doctor_des: props.item.doctor_des,
                        img: props.item.img, 
                        name_en: props.item.name_en, 
                        clinic: props.item.clinic, 
                        spec_name: props.item.spec_name, 
                        video_diag_fee:props.item.video_diag_fee, 
                        status:props.item.status
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
                {isError && <Text style={[styles.title,,styles.t_center]}>沒有醫生</Text>}
                {isSuccess &&
                    <FlatList
                        data={dBList}
                        refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                        renderItem={renderItem}
                        keyExtractor={(item, idx) => `docList_${item.doctor_code}_${idx}`}
                    />
                }
            </View>
        </SafeAreaView>
    )
}