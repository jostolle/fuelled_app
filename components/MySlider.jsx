import { React, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { styles, colorBurnout, colorHealthy, colorWatchit } from '../styles';
import { Slider } from '@miblanchard/react-native-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDateStringFromToday } from '../utility/utility.js';

const MySlider = props => {
    const [value, setValue] = useState(0);
    const [bgc, setBackgroundColor] = useState("#ddd");

    function mySetValues(valueArray){
        // for some reason this gives an array...
        var value = valueArray[0];
        if (value < 30) {
            setBackgroundColor(colorBurnout);
        } else if (value < 70) {
            setBackgroundColor(colorWatchit);
        } else {
            setBackgroundColor(colorHealthy);
        }
        props.callBackUpdate({name: props.title, value: value});

        setValue(value);
    }

    function calculateStyle(value) {
      let customStyle;
      if (value < 30) {
          customStyle = StyleSheet.create({
          trackStyle: {
              backgroundColor: colorBurnout
          }
          })
      } else if (value < 70) {
          customStyle = StyleSheet.create({
            trackStyle: {
              backgroundColor: colorWatchit
          }
          })
      } else {
          customStyle = StyleSheet.create({
            trackStyle: {
              backgroundColor: colorHealthy
          }
          })
      }
      const combinedStyles = StyleSheet.flatten( [customStyle.trackStyle]);
      return combinedStyles;
    }
    

    // retrieve data
    const getData = async () => {
        try {
            const date = createDateStringFromToday();
            const jsonValue = await AsyncStorage.getItem(date);
            if (jsonValue != null) {
                var data = JSON.parse(jsonValue);
                if (props.title == "Emotional") {
                    setValue(data.emotional);
                    props.callBackUpdate({name: props.title, value: data.emotional});
                } else if (props.title == "Mental") {
                    setValue(data.mental);
                    props.callBackUpdate({name: props.title, value: data.mental});
                } else if (props.title == "Physical") {
                    setValue(data.physical);
                    props.callBackUpdate({name: props.title, value: data.physical});
                } else if (props.title == "Spiritual") {
                    setValue(data.spiritual);
                    props.callBackUpdate({name: props.title, value: data.spiritual});
                }
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return (
        <View style={styles.slideContainer} onLayout={getData}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.sliderHeading}>{props.title}</Text> 
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text style={styles.sliderValue}>{value}</Text>
                </View>                
            </View>
            <View>
                <View style={styles.behind}>
                    <View style={styles.behindBurnout}></View>
                    <View style={styles.behindWatchit}></View>
                    <View style={styles.behindHealthy}></View>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    trackClickable={true}
                    value={value}
                    onValueChange={mySetValues}
                    trackStyle={styles.track_default}
                    minimumTrackStyle={calculateStyle(value)}
                    thumbStyle={styles.thumb}
                />
            </View>
        </View>
    );
};

export default MySlider;