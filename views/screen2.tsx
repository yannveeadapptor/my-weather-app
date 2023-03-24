import React, { ReactElement, useRef } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 
 import { SimpleButton } from '../components/simple-button';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
 import { DefaultStackScreenProps } from './nav-types';
 
 type Props = DefaultStackScreenProps<'Screen2'>;
 
 export function Screen2(props: Props): ReactElement<Props> {
   const counterRef = useRef(0);
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Screen 2 Body</Text>
       <View style={styles.buttonContainer}>
         <SimpleButton
                   title="Go back"
                   onPress={() => {
                       props.navigation.goBack();
                   } }
                   style={styles.backButton}
                   secondary isDisabled={false}         />
         <SimpleButton
                   title="Go To Screen 3"
                   onPress={() => {
                       counterRef.current += 1;
                       props.navigation.navigate('Screen3', {
                           counter: counterRef.current,
                       });
                   } } isDisabled={false}         />
       </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: { flex: 1, alignItems: 'center', margin: metrics.baseMargin },
   buttonContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
   backButton: { marginRight: metrics.baseMargin },
   title: {
     fontSize: metrics.titleFontSize,
     color: colors.title,
   },
 });