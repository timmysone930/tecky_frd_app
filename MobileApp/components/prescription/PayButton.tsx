import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { styles } from '../../pages/PrescriptionRecords/styles/prescriptionPageStyles';

interface Props {
    title: string,
    onPressFunction: ()=> void,
}

export const PayButton = (props:any) => {
    return (
        <TouchableHighlight 
            style={[styles.payButton , {marginBottom:40}]} 
            onPress={props.onPressFunction}
        >
            <Text style={{fontSize: 22, color: "white"}}>{props.title}</Text>
        </TouchableHighlight>
    );
}
