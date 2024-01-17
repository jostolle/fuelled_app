import { React, useEffect, useState } from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import { styles } from '../styles.js';

const RawDataTable = props => {

  console.log(props.rawData);

  const item = ({ item }) => (
      <View style={{ flexDirection: 'row' }}>
          <View style={ styles.rawDataTableKeyField }>
              <Text style={ styles.rawDataTableText}>{item.key}</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableText}>{item.physical}</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableText }>{item.emotional}</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableText}>{item.spiritual}</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableText}>{item.mental}</Text>
          </View>
      </View>
  )

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{ flexDirection: 'row' }}>
          <View style={ styles.rawDataTableKeyField }>
              <Text style={ styles.rawDataTableTextHeader}>Date (YMD)</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableTextHeader}>P</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableTextHeader }>E</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableTextHeader}>S</Text>
          </View>
          <View style={ styles.rawDataTableDataField }>
              <Text style={ styles.rawDataTableTextHeader}>M</Text>
          </View>
          
        </View>
        <FlatList data={props.rawData} renderItem={item} keyExtractor={item => item.key.toString()} />
      </View>
  )
};    

export default RawDataTable;