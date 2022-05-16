import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/GeneralStyles';

interface Props {
    prescription_details: any
}

export const PrescriptionDetail = (props: Props) => {

    const treatments = JSON.parse(props.prescription_details)
    console.log(treatments);

    return (
        <>
            <Text style={[styles.mb_10, styles.mt_30 , styles.title]}>
                藥物明細：
            </Text>
            {
                treatments.map((item: any)=>(
                    <View 
                        key={`treatment${treatments.indexOf(item)}`} 
                        style={[styles.mv_10]}
                    >
                        <Text style={[styles.contentText]}>
                            {treatments.indexOf(item) + 1}. {item.name_en}: {item.quantity} {item.dosage}
                        </Text>
                    </View>
                ))
            }
        </>
    );
}

