import { StyleSheet } from "react-native";

export const colorHealthy = "#238823";
export const colorWatchit = "#FFBF00";
export const colorBurnout = "#D2222D";
export const mainColor_blue = "#181a4a";
export const mainColor_red = "#a33d25";
export const underlayColor = "#cccccc";

export const mainFont1 = 'Aquire';
export const mainFont2 = 'Questrial';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor_blue,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    scrollViewContainer: {
      backgroundColor: mainColor_blue,
      color: '#fff',
      padding: 16,
    },
    regularText: {
      fontFamily: mainFont2,
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 20,
    },
    statisticsContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    statisticsContainer: {
      flex: 1,
      backgroundColor: mainColor_blue,
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
      fontFamily: mainFont1,
      color: '#fff',
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
      backgroundColor: '#fff',
      margin: 8,
      fontFamily: mainFont1,
    },
    statisticsButtonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#000',
      fontFamily: mainFont1,
    },
    homeTabHeading: {
      fontWeight: "bold",
      fontFamily: mainFont1,
      fontSize: 24,
      margin: 16,
      textAlign: 'center',
      color: '#fff',
    },
    settingsItem: {
      flexDirection: 'row',
      margin: 8,
    },
    settingsListItem: {
      fontWeight: "bold",
      flex:1,
      fontSize: 18,
      padding: 8,
      fontFamily: mainFont1,
      color: '#fff',
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
      shadowColor: '#fff',
      shadowOpacity: 0.7,
      shadowRadius: 5,
      shadowOffset: 0,
    },
    sliderHeading: {
      fontWeight: "bold",
      flex:1,
      fontSize: 18,
      padding: 16,
      paddingLeft: 0,
      fontFamily: mainFont1,
      color: '#fff',
    },
    sliderValue: {
      flex: 1,
      fontSize: 18,
      fontFamily: mainFont1,
      borderRadius: 5,
      fontWeight: 'bold',
      color: '#fff',
      padding: 16, 
      paddingRight: 0,
    },
    homeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#fff',
      margin: 8,
      fontFamily: mainFont1,
    },
    homeButtonText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#000',
      fontFamily: mainFont1,
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
      backgroundColor: '#A55',
      shadowColor: '#fff',
      shadowOpacity: 0.7,
      shadowRadius: 5,
      shadowOffset: 0,
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
    licenseText: {
      fontFamily: mainFont1,
      color: '#fff',
      textAlign: 'center'
    }
})
