import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

interface Props {
    cost: string,
}

export function CostDisplay(props: Props) {
    return (

            <Text style={[styles.mt_30, styles.mb_10, styles.textCenter, styles.title]}>
                藥費合共：{props.cost}
            </Text>

    );
}