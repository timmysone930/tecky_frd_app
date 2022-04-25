
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    box: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: 'rgba(0, 0, 0, 0.4)',
      borderBottomWidth: 1,
      padding: 12,
      marginHorizontal: 10,
      marginTop:8,
    },
    resCode: {
      fontSize: 21, 
      fontWeight: "800",
      marginBottom:8,
      color:'#357899',
    },
    resDoctor:{
      fontSize: 17, 
      fontWeight: "700",
      marginBottom:10,
      color:'#4F527E',
    },
    contentFont: {
      fontSize: 15,
      fontWeight:'500',
      color:'#626262',
      marginBottom:5,
    },
    orderStatus: {
      height: 40, 
      width: 80,
      justifyContent: "center",
      alignItems: "center"
    },
    orderStatusFont: {
      color: "#fff",
      fontSize: 20
    },
    resStatus: {
        width: 70,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#F3F3F3',
        height: 'auto',
        borderRadius: 4,
        marginRight: 5,
    },
    resStatusFont: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
  })