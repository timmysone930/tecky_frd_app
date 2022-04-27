import React from 'react'

import {
    View, Text, SafeAreaView, FlatList, StyleSheet, Image,TouchableOpacity
} from 'react-native';
// Component
import { DrListCard } from '../../components/doctor/DrListCard';
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
    {
        id: '2',
        name: '何家家 Ho Kar Ka',
        address: '2715-16, 27/F, ONE MIDTOWN11 Hoi Shing Rd, Tsuen Wan',
        gender: '女',
        type: '西醫',
        pic: require(`../../images/profilePic/test-02.jpg`),
        service: ['超聲波掃描', '電腦掃描 (Computed Tomography，簡稱CT) 是利用X 光穿透人體後', 'X 光檢查'],
        qualifications: ['專業證書課程', '特許公認會計師'],
        roster: false,
        availableDate: [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 2, date: '2022-05-15', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 3, date: '2022-05-17', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        ],
    },
    {
        id: '3',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '男',
        type: '心臟科',
        pic: '',
        service: ['超聲波掃描', 'X 光檢查'],
        qualifications: ['專業證書課程'],
        roster: true,        
        availableDate: [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 2, date: '2022-05-05', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 3, date: '2022-05-07', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        ],
    },
    {
        id: '4',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '男',
        type: '物理治療',
        pic: require(`../../images/profilePic/test-02.jpg`),
        service: ['超聲波掃描'],
        qualifications: ['專業證書課程', '特許公認會計師', '證券及期貨從業員資格'],
        roster: true,
        availableDate: [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 2, date: '2022-05-05', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 3, date: '2022-05-07', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        ],
    },
    {
        id: '5',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '女',
        type: '耳鼻喉科',
        pic: require(`../../images/profilePic/test-01.jpg`),
        service: ['超聲波掃描', 'X 光檢查'],
        qualifications: ['專業證書課程', '特許公認會計師', '證券及期貨從業員資格'],
        roster: true,
        availableDate: [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 2, date: '2022-05-05', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 3, date: '2022-05-07', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        ],
    },
    {
        id: '6',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '女',
        type: '精神及心理治療',
        pic: require(`../../images/profilePic/test-01.jpg`),
        service: ['超聲波掃描', 'X 光檢查'],
        qualifications: ['專業證書課程', '特許公認會計師', '證券及期貨從業員資格'],
        roster: true,
        availableDate: [{ id: 1, date: '2022-05-03', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 2, date: '2022-05-05', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        { id: 3, date: '2022-05-07', time: ['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30'] },
        ],
    },

];


// html and style for FlatList
const Item = (props: any) => (
    <TouchableOpacity style={styles.drListCard} onPress={() => {
        props.navigate.navigation.navigate('相關醫生', {
            screen: '醫生詳情',
            params: { id: props.id },
        })
    }}>
        <DrListCard props={props} />
    </TouchableOpacity>
);


export const DrList: React.FC = (prop: any) => {
    // white background
    const backgroundStyle = {
        backgroundColor: 'white',
    };

    // For FlatList
    const renderItem = (props: any) => (
        <Item name={props.item.name} address={props.item.address}
            gender={props.item.gender} type={props.item.type} navigate={prop} id={props.item.id}
            pic={props.item.pic}
        />
    );

    return (
        <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
            <SearchComponent placeholder={"搜索醫生，科目，疾病"} />
            <View style={[backgroundStyle, { flex: 1 }]}>
                <FlatList
                    data={FakeDrDATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
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