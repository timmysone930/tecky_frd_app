import { Checkbox } from 'native-base';
import React from 'react'

export const BaseCheckBoxComponent = (props: any) => {
    const data = props.data;

    return (
        <Checkbox.Group onChange={props.onChange} value={props.groupValues} accessibilityLabel="choose the symptoms" mt={1}>
            {data.map((item: any, idx: number) => (
                <Checkbox value={item} key={`health_check_${idx}`} mt={4} mb={3}>{item}</Checkbox>
            )
          )}
        </Checkbox.Group>
    )
}
