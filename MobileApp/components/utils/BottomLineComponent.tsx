import React from 'react'
import { StyleSheet, View } from 'react-native';

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