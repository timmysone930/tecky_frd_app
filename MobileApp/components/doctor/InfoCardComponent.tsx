import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
// import icon for circle
import Icon from 'react-native-vector-icons/FontAwesome';

export const InfoCardComponent = (props:any) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.title}</Text>
            {props.array.map((item: String, idx: number) => (
                <View key={`service_${idx}`} style={styles.listView}>
                    <Icon name="circle" size={10} color="#325C80" style={styles.listCircle} />
                    <Text style={styles.subTitle}>{item}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white', 
        marginTop:6,
        marginBottom:6,
        padding:15,
        shadowColor: '#E4E4E4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 8,
        marginVertical: 8,
        paddingHorizontal: 15,
        marginTop: 20,
        color: '#292929',
    },
    listView: {
        flexDirection: 'row',
        marginHorizontal: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    subTitle: {
        color: '#3B5C7D',
        fontWeight: '500',
        fontSize: 15,
    },
    listCircle: {
        marginRight: 10,
        justifyContent: 'center',
        marginTop: 4,
    }
});