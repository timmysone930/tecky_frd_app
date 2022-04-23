import React from 'react'
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export const CheckBoxComponent = (props: any) => {
    const [checked, setChecked] = React.useState(false);
    return (
        <Checkbox.Item label={props.label} status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked)
            }} mode='android' color='#6d7f99' />
    );
};



export const MultiCheckBoxComponent = () => {
    return (
        <View>
            <CheckBoxComponent label={'發燒'}/>
            <CheckBoxComponent label={'咳嗽、呼吸困難或咽喉痛'}/>
            <CheckBoxComponent label={'腹瀉或嘔吐'}/>
            <CheckBoxComponent label={'流感症狀'}/>
        </View>
    )
}
