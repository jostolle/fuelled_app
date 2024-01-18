import { StyleSheet } from "react-native";

export const colorHealthy = "#161242";
export const colorWatchit = "#E42A28";
export const colorBurnout = "#C1203D";
export const mainColor_blue = "#161242";
export const mainColor_red = "#C1203D";
export const mainBackgroundColor = "#F2F2F3";
export const mainFontColor = "#000";
export const underlayColor = "#cccccc";

export const mainFont1 = 'Questrial';
export const mainFont2 = 'Questrial';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        color: mainFontColor,
    },
    scrollViewContainer: {
      backgroundColor: mainBackgroundColor,
      color: mainFontColor,
      padding: 16,
    },
    regularText: {
      fontFamily: mainFont2,
      color: mainFontColor,
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
      backgroundColor: mainBackgroundColor,
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
      textTransform: 'uppercase',
      fontFamily: mainFont1,
      color: mainFontColor,
      padding: 8
    }, 
    statisticsValueText: {
      fontSize: 24,
      borderRadius: 5,
      fontFamily: mainFont1,
      color: mainFontColor,
      padding: 8
    }, 
    statisticsButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#000',
      elevation: 3,
      backgroundColor: '#fff',
      margin: 8,
      fontFamily: mainFont1,
    },
    statisticsButtonText: {
      fontSize: 16,
      lineHeight: 21,
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: '#000',
      fontFamily: mainFont1,
    },
    homeTabHeading: {
      fontWeight: "bold",
      fontFamily: mainFont1,
      textTransform: 'uppercase',
      fontSize: 24,
      margin: 16,
      textAlign: 'center',
      color: mainFontColor,
    },
    settingsItem: {
      flexDirection: 'row',
      margin: 8,
    },
    settingsListItem: {
      fontWeight: "bold",
      flex:1,
      fontSize: 18,
      textTransform: 'uppercase',
      padding: 8,
      fontFamily: mainFont1,
      color: mainFontColor,
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
      borderColor: mainBackgroundColor,
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
      shadowOpacity: 0,
      shadowRadius: 5,
      shadowOffset: 0,
    },
    sliderHeading: {
      fontWeight: "bold",
      textTransform: "uppercase",
      flex:1,
      fontSize: 18,
      padding: 16,
      paddingLeft: 0,
      fontFamily: mainFont1,
      color: mainFontColor,
    },
    sliderValue: {
      flex: 1,
      fontSize: 18,
      fontFamily: mainFont1,
      borderRadius: 5,
      fontWeight: 'bold',
      color: mainFontColor,
      padding: 16, 
      paddingRight: 0,
    },
    homeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      borderColor: '#000',
      borderWidth: 1,
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
      textTransform: 'uppercase',
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
      borderRadius: 2,
      borderColor: mainBackgroundColor,
      backgroundColor: mainBackgroundColor,
      shadowColor: '#fff',
      shadowOpacity: 0,
      shadowRadius: 5,
      shadowOffset: 0,
    },
    behindBurnout: {
      flex: 3,
      borderRadius: 3,
      width: '100%',
      height: '100%',
      backgroundColor: colorBurnout,
      borderWidth: 1,
      borderColor: mainBackgroundColor,
    },
    behindWatchit: {
      flex: 4,
      width: '100%',
      height: '100%',
      backgroundColor: colorWatchit,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: mainBackgroundColor,
    },
    behindHealthy: {
      flex: 3,
      width: '100%',
      height: '100%',
      borderBottomRightRadius: 5,
      borderRadius: 3,
      backgroundColor: colorHealthy,
      borderWidth: 1,
      borderColor: mainBackgroundColor,
    },
    licenseText: {
      fontFamily: mainFont1,
      color: mainFontColor,
      textAlign: 'center'
    }
})
