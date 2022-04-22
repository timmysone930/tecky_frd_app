import React from 'react'

import {
    View, Text, SafeAreaView, FlatList, StyleSheet, Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

// Search Component
const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: any) => setSearchQuery(query);

    return (
        <Searchbar
            placeholder="搜索醫生，科目，疾病"
            onChangeText={onChangeSearch}
            value={searchQuery}
            inputStyle={{ fontSize: 16 }}
            iconColor={'#B7B7B7'}
            style={{ margin: 20, backgroundColor: '#F2F2F2', borderRadius: 13, shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 0 }, height: '5%' }}
        />
    );
};

export const FakeDrDATA = [
    {
        id: '1',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay, Kowloon, Hong Kong, ...',
        gender: '男',
        type: '中醫',
        pic: require(`../images/profilePic/test-01.jpg`),
    },
    {
        id: '2',
        name: '何家瑜 Ho Kar Yu',
        address: '2715-16, 27/F, ONE MIDTOWN11 Hoi Shing Rd, Tsuen Wan',
        gender: '女',
        type: '西醫',
        pic: require(`../images/profilePic/test-02.jpg`),
    },
    {
        id: '3',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '男',
        type: '心臟科',
        pic: '',
    },
    {
        id: '4',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '男',
        type: '物理治療',
        pic: require(`../images/profilePic/test-02.jpg`),
    },
    {
        id: '5',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '女',
        type: '耳鼻喉科',
        pic: require(`../images/profilePic/test-01.jpg`),
    },
    {
        id: '6',
        name: '何家瑜 Ho Kar Yu',
        address: 'Room 11, ABC centre, Kowloon Bay,Kowloon',
        gender: '女',
        type: '精神及心理治療',
        pic: require(`../images/profilePic/test-01.jpg`),
    },

];


const Item = (props: any) => {
    
    return (
        <TouchableOpacity style={styles.drListCard} onPress={() => { props.navigate.navigation.navigate('醫生詳情', { id: props.id }) }}>
            {/* Profile Pic */}
            <View >
                {props.pic === ''?<Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={require('../images/profilePic/default.jpg')} />:
                <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={props.pic} />}
            </View>
            <View style={styles.drInfo}>
                {/* Dr Name */}
                <Text style={styles.title}>{props.name}</Text>
                {/* Dr Type & Gender */}
                <View style={{ flexDirection: 'row' }}>
                    {/* Dr Gender */}
                    <View style={[styles.infoBox, props.gender === '男' ? styles.blue : styles.red]} >
                        <Text style={styles.gender}>{props.gender === '男' ? '男' : '女'}</Text>
                    </View>
                    {/* Dr Type */}
                    <View style={styles.infoBox} >
                        <Text style={[styles.gender, { color: 'grey' }]}>{props.type}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    {/* Dr address */}
                    <Icon name="map-marker" size={20} color="#325C80" />
                    <Text style={styles.address}>{props.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};


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
            <SearchComponent />
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