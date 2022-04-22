import React from 'react'
import { Searchbar } from 'react-native-paper';

// Search Component
export const SearchComponent = (props:any) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: any) => setSearchQuery(query);

    return (
        <Searchbar
            placeholder={props.placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
            inputStyle={{ fontSize: 16 }}
            iconColor={'#B7B7B7'}
            style={{ margin: 20, backgroundColor: '#F2F2F2', borderRadius: 13, shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 0 }, height: '5%' }}
        />
    );
};