import { StyleSheet } from "react-native";

export const colorHealthy = "#238823";
export const colorWatchit = "#FFBF00";
export const colorBurnout = "#D2222D";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statisticsContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    statisticsContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'start'
    },
    buttonRow: {
      backgroundColor: '#fff',
      alignItems: 'center',
      height: 50,
      flexDirection: 'row'
    },
    statisticsText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      padding: 8
    }, 
    statisticsValueText: {
      fontSize: 24,
      borderRadius: 5,
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#bbb',
      padding: 8
    }, 
    statisticsButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      margin: 8
    },
    statisticsButtonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    homeTabHeading: {
      fontWeight: "bold",
      fontSize: 24,
      margin: 16,
      textAlign: 'center',
    },
    slideContainer: {
      flex: 1,
      width: 300,
      marginLeft: 0,
      marginRight: 0,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    track_default: {
      backgroundColor: '#d0d0d0',
      borderRadius: 5,
      borderColor: '#111',
      height: 40,
      opacity: 0,
    },
    thumb: {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 46,
      width: 10,
      borderColor: '#000',
      borderWidth: 1,
      shadowColor: '#555',
      shadowOpacity: 0.7,
      shadowRadius: 5,
    },
    sliderHeading: {
      fontWeight: "bold",
      flex:1,
      fontSize: 18,
      padding: 8,
    },
    sliderValue: {
      flex: 1,
      fontSize: 18,
      borderRadius: 5,
      fontWeight: 'bold',
      color: '#000',
      padding: 8, 
    },
    SubmitButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#115E00',
      margin: 2
    },
    submitButtonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    behind: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      flexDirection: 'row',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      borderRadius: 5,
      backgroundColor: '#A55'
    },
    behindBurnout: {
      flex: 3,
      borderBottomLeftRadius: 5,
      borderTopLeftRadius: 5,
      width: '100%',
      height: '100%',
      backgroundColor: colorBurnout,
      borderLeftWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: '#111',
    },
    behindWatchit: {
      flex: 4,
      width: '100%',
      height: '100%',
      backgroundColor: colorWatchit,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: '#111',
    },
    behindHealthy: {
      flex: 3,
      width: '100%',
      height: '100%',
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
      backgroundColor: colorHealthy,
      borderLeftWidth: 0,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: '#111',
    },
})
