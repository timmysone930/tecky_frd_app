import React from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

// import icon for location pin
import Icon from 'react-native-vector-icons/FontAwesome';

export const DrListCard = ({props}:any) => {
    return (
        <>
            <View >
                {props.pic === '' ? <Image style={{ width: 75, height: 75, borderRadius: 50 }} resizeMode="contain" source={require('../../images/profilePic/default.jpg')} /> :
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
        </>
    )
}


const styles = StyleSheet.create({
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