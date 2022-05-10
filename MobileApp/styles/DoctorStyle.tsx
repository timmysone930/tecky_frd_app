import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    docListCard: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 8,
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 0.8,
        flexDirection: 'row',
    },
    docDetailCard: {
        padding: 15,
        paddingTop: 25,
        marginBottom: 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        shadowColor: '#E4E4E4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderBottomColor: '#B5B5B5',
        borderBottomWidth: 0.8,
    },
    videoButton: {
        marginTop: 15,
        marginHorizontal: 15,
        marginBottom: '11%',
    },
    title: {
        fontSize: 16,
        color: '#545454',
        marginBottom: 8,
    },
    blue: {
        backgroundColor: '#5990BE',
    },
    red: {
        backgroundColor: '#CC7373'
    },
    gender: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 11,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    address: {
        color: '#545454',
        fontSize: 12,
        marginRight: 80,
        marginLeft: 6,
    }
});