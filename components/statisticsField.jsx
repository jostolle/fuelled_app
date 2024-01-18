import { React, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { styles, colorBurnout, colorHealthy, colorWatchit, mainFont2 } from '../styles.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LineChart
  } from "react-native-chart-kit";

const StatisticsField = props => {
    
    function calculateStyle(value) {
        let customStyle;
        if (value < 30) {
          customStyle = StyleSheet.create({
            statisticsValueText: {
              backgroundColor: colorBurnout
            }
          })
        } else if (value < 70) {
          customStyle = StyleSheet.create({
            statisticsValueText: {
              backgroundColor: colorWatchit
            }
          })
        } else {
          customStyle = StyleSheet.create({
            statisticsValueText: {
              backgroundColor: colorHealthy
            }
          })
        }
    
        const combinedStyles = StyleSheet.flatten( [styles.statisticsValueText, customStyle.statisticsValueText]);
    
        return combinedStyles;
      }
      
      // if we have too many data points, we don't want the dots displayed.
      function DotsYesNo(value) {
        if (value < 15) {
            return "1";
        } else {
            return "0";
        }
      }

      const chartConfig = {
        backgroundGradientFrom: styles.main,
        backgroundGradientFromOpacity: 0.0,
        backgroundGradientTo: '#FFF',
        backgroundGradientToOpacity: 0.0,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 1, // optional, default 3
        fillShadowGradientOpacity: 0.7,
        fillShadowGradientFromOpacity: 0.8,
        fillShadowGradientToOpacity: 0.8,
        fillShadowGradientTo: colorBurnout,
        fillShadowGradientFrom: colorHealthy,
        
        useShadowColorFromDataset: false, // optional
        segments: 0, 
        decimalPlaces: 0,
        propsForLabels: {
          fontFamily: mainFont2,
        },
        propsForDots: {
          r: DotsYesNo(props.data.length),
          strokeWidth: "1",
          stroke: colorWatchit,
        }
      };
    
    return (
        <>
        <View style={{ flexDirection: 'row'}}> 
          <View style={{flex: 2, alignItems: 'flex-start'}}>
            <Text style={styles.statisticsText}>{props.title} </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.statisticsValueText}>{props.average}</Text>
          </View>
        </View>
        <View>
          <LineChart
              data={{
                datasets: [
                  {
                    data: props.data
                  },
                  {
                    data: [100],
                    withDots: false
                  }
                ]
              }}
              width={300} // from react-native
              height={220}
              withInnerLines={false}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={7} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              fromZero
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
          />
        </View>
        </>
    );
};

export default StatisticsField;