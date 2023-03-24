import React, { ReactElement } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 
 import { SimpleButton } from '../components/simple-button';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
 import { Tab2StackScreenProps } from './nav-types';
 
 type Props = Tab2StackScreenProps<'Screen4'>;
 
 export function Screen4(props: Props): ReactElement {
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Screen 4 Body</Text>
       <SimpleButton
               title="Go To Screen 5"
               onPress={() => {
                   props.navigation.navigate('Screen5');
               } }
               style={styles.button} isDisabled={false}       />
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