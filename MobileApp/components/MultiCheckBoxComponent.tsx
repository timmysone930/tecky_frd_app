import React from 'react'
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { setHealthFormMultiBox } from '../redux/slice';
import { store } from '../redux/store';
import { useSelector } from 'react-redux';

export const CheckBoxComponent = (props: any) => {
    // const [checked, setChecked] = React.useState(false);

    // get form data
    const formData = useSelector((state: any) => state.getHealthFormData);
    return (
        <Checkbox.Item label={props.label} status={props.checked ? 'checked' : 'unchecked'}
            // onPress={() => {
            //     setChecked(!checked)
            // }}
            onPress={props.setChecked}
            mode='android' color='#6d7f99' />
    );
};


export const MultiCheckBoxComponent = () => {
    const [checked, setChecked] = React.useState(false);
    const onPressChecked = () => {
        setChecked(!checked);
        store.dispatch(setHealthFormMultiBox({ selectedFever: checked }))
    }
    const [checked2, setChecked2] = React.useState(false);
    const onPressChecked2 = () => {
        setChecked2(!checked2);
        store.dispatch(setHealthFormMultiBox({ selectedCough: checked2 }))
    }
    const [checked3, setChecked3] = React.useState(false);
    const onPressChecked3 = () => {
        setChecked3(!checked3);
        store.dispatch(setHealthFormMultiBox({ selectedDiarrhea: checked3 }))
    }
    const [checked4, setChecked4] = React.useState(false);
    const onPressChecked4 = () => {
        setChecked4(!checked4);
        store.dispatch(setHealthFormMultiBox({ selectedInfluenza: checked4 }))
    }
    return (
        <View>
            <CheckBoxComponent label={'發燒'} setChecked={onPressChecked} checked={checked} />
            <CheckBoxComponent label={'咳嗽、呼吸困難或咽喉痛'} setChecked={onPressChecked2} checked={checked2} />
            <CheckBoxComponent label={'腹瀉或嘔吐'} setChecked={onPressChecked3} checked={checked3} />
            <CheckBoxComponent label={'流感症狀'} setChecked={onPressChecked4} checked={checked4} />
        </View>
    )
}
