import { Checkbox } from 'native-base';
import React from 'react'
import { setHealthFormMultiBox } from '../../redux/slice';
import { store } from '../../redux/store';


export const BaseCheckBoxComponent = (props: any) => {
    const [groupValues, setGroupValues] = React.useState([]);
    const data = props.data;

    return (
        <Checkbox.Group onChange={(values)=>{setGroupValues(values||[]); store.dispatch(setHealthFormMultiBox({ symptoms: groupValues})) }} value={groupValues} accessibilityLabel="choose the symptoms" mt={1}>
            {data.map((item: any, idx: number) => (
                <Checkbox value={item} key={`health_check_${idx}`} mt={4} mb={3}>{item}</Checkbox>
            )
          )}
        </Checkbox.Group>
    )
}
