import React from 'react';
import { Button } from 'react-native-paper';
import { Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

interface Props {
    title: string,
    disabled: boolean,
    onPressFunction: () => void,
}

export const PayButton = (props:Props) => {
    return (
        <Button mode="contained" color='#325C80' onPress={props.onPressFunction} disabled={props.disabled}> 
        <Text style={[styles.payButton]}>
            {props.title}
        </Text>
        </Button>
    );
}
