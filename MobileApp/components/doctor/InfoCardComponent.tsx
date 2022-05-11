import React from 'react'
import { Text, View,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../../styles/DoctorStyle';

interface Props{
    title:string,
    array:[]
}

export const InfoCardComponent = (props:Props) => {
    return (
        <View style={styles.docInfoCard}>
            <Text style={styles.docInfoTitle}>{props.title}</Text>
            {props.array.map((item: String, idx: number) => (
                <View key={`service_${idx}`} style={styles.listView}>
                    <Icon name="circle" size={10} color="#325C80" style={styles.listCircle} />
                    <Text style={styles.docInfoText}>{item}</Text>
                </View>
            ))}
        </View>
    )
}
