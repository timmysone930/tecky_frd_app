import React, { useState } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
// API route
import { useGetDoctorListQuery } from '../../API/DoctorAPI';
// Component
import { DrListCard } from '../../components/doctor/DrListCard';
import { SpinnerComponent } from '../../components/NativeBase/SpinnerComponent';
import { SearchComponent } from '../../components/SearchComponent';

// Need to be removed; only for testing
export const FakeDrDATA = [
    {
        id: '1',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay, Kowloon, Hong Kong, ...',
        gender: '男',
        type: '中醫',
        pic: require(`../../images/profilePic/test-01.jpg`),
        service: ['超聲波掃描', '電腦掃描', 'X 光檢查'],
        qualifications: ['專業證書課程', '特許公認會計師', '證券及期貨從業員資格', '專業證書課程', '特許公認會計師', '證券及期貨從業員資格'],
        roster: true,
        availableDate: [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 2, date: '2022-05-05', time: ['13:00 - 13:30', '14:30 - 15:00', '16:00 - 16:30'] },
        { id: 3, date: '2022-05-07', time: ['09:00 - 10:30', '12:30 - 14:00', '17:00 - 17:30'] },
        ],
    },
];

export const DrList: React.FC = (prop: any) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    // white background
    const backgroundStyle = { backgroundColor: 'white', };
    const { mode } = prop.route.params;
    let data:any;
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
        let newData = data.filter( (item:any) => (item.name.includes(searchQuery) || item.name_en.toLowerCase().includes(searchQuery.toLowerCase())
        ||item.spec_name.toString().includes(searchQuery) )
        );
        data = newData
    }
    // For FlatList
    const renderItem = (props: any) =>
    (
        <TouchableOpacity style={styles.drListCard} onPress={() => {
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
            <DrListCard props={props.item} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <SearchComponent placeholder={"搜索醫生以及科目"} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <View style={[backgroundStyle, { flex: 1 }]}>
                {isLoading && <SpinnerComponent />}
                {isError && <Text style={styles.title}>Somethings gone wrong...</Text>}
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

const styles = StyleSheet.create({
    drListCard: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 8,
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 0.8,
        flexDirection: 'row',
    },
    drInfo: {
        marginLeft: 20,
    },
    title: {
        fontSize: 16,
        color: '#545454',
        marginBottom: 8,
    },
    infoBox: {
        justifyContent: 'center',
        backgroundColor: '#F3F3F3',
        height: 'auto',
        borderRadius: 4,
        marginBottom: 20,
        marginRight: 10,
    },
    blue: {
        backgroundColor: '#5990BE',
    },
    red: {
        backgroundColor: '#CC7373'
    },
    gender: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 11,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    address: {
        color: '#545454',
        fontSize: 12,
        marginRight: 80,
        marginLeft: 6,
    }
});