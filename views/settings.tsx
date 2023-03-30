 import { SimpleButton } from '../components/simple-button';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
import { useTabNavigation } from './nav-hooks';
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
 import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OptionsList } from '../components/options-list';
import { images } from '../theme/images';
import { SelectList } from 'react-native-dropdown-select-list'


export const MeasurementType ="Imperial";

export function Settings() {
  const navigation = useTabNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Measurement</Text>
      <Icon name="tape-measure" size={100} color="#900" />
       <OptionsList
        title=""
        rows={[
          { title: 'Imperial', leftIcon: images.favIcon },
          { title: 'Metric', leftIcon: images.favIcon },
        ]}
      />
      <SimpleButton
        title="Set"
        onPress={() => {
          navigation.navigate('Tab1');
        } }
        style={styles.button} isDisabled={false}      />
    </View>
  );
}
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     padding: metrics.doubleMargin,
   },
   button: { margin: metrics.baseMargin },
   title: {
     fontSize: metrics.titleFontSize,
     color: colors.title,
   },
 });