import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

// Search Component
export const SearchComponent = (props: any) => {
    // const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: any) => props.setSearchQuery(query);

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

// Bottom Line Component
export const BottomLineComponent = () => (
    <View style={styles.bottomLine} />)

const styles = StyleSheet.create({
    bottomLine: {
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 0.8,
        marginBottom: 20,
    }
});