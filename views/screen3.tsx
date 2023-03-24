import React, { ReactElement } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 
 import { SimpleButton } from '../components/simple-button';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
 import { DefaultStackScreenProps } from './nav-types';
 
 type Props = DefaultStackScreenProps<'Screen3'>;
 
 export function Screen3(props: Props): ReactElement<Props> {
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Screen 3 Body</Text>
       <Text style={styles.counter}>{`Navigated here ${props.route.params.counter}`}</Text>
       <SimpleButton
               title="Go back"
               onPress={() => {
                   props.navigation.goBack();
               } }
               secondary isDisabled={false}       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: { flex: 1, alignItems: 'center' },
   title: {
     fontSize: metrics.titleFontSize,
     color: colors.title,
   },
   counter: {
     fontSize: metrics.h1FontSize,
     color: colors.purple,
   },
 });