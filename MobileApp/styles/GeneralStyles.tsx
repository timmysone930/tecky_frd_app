import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    drListCard: {
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
    pageMargin: {
      padding: 15,
    },
    input: {
      borderColor: '#737474',
      padding: 10,
      borderWidth: 0.7,
      marginVertical: 8,
    },
    warning: {
      fontSize: 12,
      color: 'red',
      marginLeft: 5,
    },
    subTitle: {
      color: '#225D66',
      fontSize: 17,
      fontWeight: '600',
      marginTop: 8,
    },
    infoText: {
      color: '#C32D3A',
      fontSize: 12,
      fontWeight: '400',
      marginTop: 5,
      marginBottom: 15,
    },
    button: {
      width: '50%',
      backgroundColor: '#6d7f99',
      paddingVertical: 16,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },

    //additional

    title: {
        color: '#225D66',
        fontSize: 24,
        fontWeight: '600',
    },
    magnifiedText: {
        color: '#225D66',
        fontSize: 30,
        fontWeight: '600',
    },
    viewContainer: {
        padding: 20,
      },
      box: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: 'rgba(0, 0, 0, 0.4)',
        borderBottomWidth: 1,
        padding: 12
      },
    
      prescriptionCode: {
        fontSize: 25, 
        fontWeight: "bold"
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
  
      contentFont: {
        fontSize: 20
      },
  
      RowCenterBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
  
      costDisplay: {
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 30,
        marginTop: 10,
      },
  
      payButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "#00cc00",
        paddingVertical: 10,
        marginVertical: 20,
        marginHorizontal: 90,
      },
  
      JCCenter: {
        justifyContent: "center"
      },
  
      AICenter: {
        alignItems: "center"
      },
  
      flexRow: {
        flexDirection: "row"
      },
  
      textCenter: {
        textAlign: "center"
      },
  
      mb_10: {
        marginBottom: 10
      },

      mb_30: {
        marginBottom: 30
      },
  
      mt_10: {
        marginTop: 10
      },

      mt_30: {
        marginTop: 30
      },
      mh_10: {
          marginHorizontal: 10
      }
});