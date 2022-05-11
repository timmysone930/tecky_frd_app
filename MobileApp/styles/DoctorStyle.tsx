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
    infoBox: {
        justifyContent: 'center',
        backgroundColor: '#F3F3F3',
        height: 'auto',
        borderRadius: 4,
        marginBottom: 20,
        marginRight: 10,
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
    },
    // infoCardComponent
    docInfoCard:{
        backgroundColor:'white', 
        marginTop:6,
        marginBottom:6,
        padding:15,
        shadowColor: '#E4E4E4',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    docInfoTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 8,
        marginVertical: 8,
        paddingHorizontal: 15,
        marginTop: 20,
        color: '#292929',
    },
    docInfoText: {
        color: '#3B5C7D',
        fontWeight: '500',
        fontSize: 15,
    },
    listView: {
        flexDirection: 'row',
        marginHorizontal: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    listCircle: {
        marginRight: 10,
        justifyContent: 'center',
        marginTop: 4,
    },
    // Res Payment confirm page
    subTitle: {
        color: '#225D66',
        fontSize: 26,
        fontWeight: '900',
        marginTop: 10,
        marginBottom: 15,
        textAlign: 'center',
    },
    contentText: {
        color: '#3B3B3B',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '500',
        marginTop: 8,
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6d7f99',
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 20,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    // margin/ position/ padding
    ml_20: {
        marginLeft: 20,
    },
    t_center:{
        textAlign:'center'
    },
});