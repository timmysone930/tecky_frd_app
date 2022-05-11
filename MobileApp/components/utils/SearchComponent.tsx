import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

interface searchProps{
    placeholder:string,
    searchQuery: string, 
    setSearchQuery:(query:string)=>void,
}

// Search Component
export const SearchComponent = (props: searchProps) => {
    const onChangeSearch = (query: string) => props.setSearchQuery(query);

    return (
        <Searchbar
            placeholder={props.placeholder}
            onChangeText={onChangeSearch}
            value={props.searchQuery}
            inputStyle={{ fontSize: 16 }}
            iconColor={'#B7B7B7'}
            style={{ margin: 20, backgroundColor: '#F2F2F2', borderRadius: 13, shadowOpacity: 0.2, shadowRadius: 4, shadowOffset: { width: 0, height: 0 } }}
        />
    );
};