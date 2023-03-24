import React, { ReactElement } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 
 import { SimpleButton } from '../components/simple-button';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
 import { Tab2StackScreenProps } from './nav-types';
 
 type Props = Tab2StackScreenProps<'Screen5'>;
 
 export function Screen5(props: Props): ReactElement<Props> {
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Screen 5 Body</Text>
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