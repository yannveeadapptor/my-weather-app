import React from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 
 import { SimpleButton } from '../components/simple-button';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
import { useTabNavigation } from './nav-hooks';
 
 export function Screen6() {
  const navigation = useTabNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen 6 Body</Text>
      <SimpleButton
        title="What will I do?"
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