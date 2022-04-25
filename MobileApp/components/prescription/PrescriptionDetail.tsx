import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

interface Props {
    prescription_details: string[]
}

export const PrescriptionDetail = (props: Props) => {
    return (
        <>
            <Text style={[styles.mb_10, styles.mt_30 , styles.title]}>
                藥物明細：
            </Text>
            {
                props.prescription_details.map((item: string)=>(
                    <View key={item} style={[styles.mv_10]}>
                        <Text style={[styles.contentText]}>
                            {props.prescription_details.indexOf(item) + 1}. {item}
                        </Text>
                    </View>
                ))
            }
        </>
    );
}

