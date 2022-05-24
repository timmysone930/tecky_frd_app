import { CheckIcon, Select, } from 'native-base'
import React from 'react'

interface Props{
    placeholder:string,
    data:string[],
    onChange:(item:string)=>void, 
    mode:string,
    selectedValue:string,
}

export const DropdownSelectComponent = (props: Props) => {
    const data = props.data;
    let selectFunction;
    // Check the picker mode
    if (props.mode === 'id') {
        selectFunction = data.map((item: string, idx: Number) => (
            <Select.Item label={`${item}`} value={`${item}`} key={`picker_id_${idx}`} />
        ))
    } else if (props.mode === 'other') {
        selectFunction = data.map((item: string, idx: Number) => (
            <Select.Item label={`${item}`} value={`${item}`} key={`picker_other_${idx}`} />
        ))
    }
    return (
        <Select accessibilityLabel={props.placeholder} placeholder={props.placeholder} _selectedItem={{
           endIcon: <CheckIcon size={5}/>
        }} mt="1.5" mb='1' fontSize="sm" borderColor="#737474" onValueChange={props.onChange} flex={1} borderRadius="3" borderWidth='0.7' selectedValue={props.selectedValue}>
            {selectFunction}
        </Select>
    )
}
