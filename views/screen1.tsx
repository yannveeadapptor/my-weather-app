import React, { ReactElement } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SimpleButton } from '../components/simple-button';
import { GlobalLoaderActions } from '../reducers/global-loader/reducer';
 
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
 import { Tab1StackScreenProps } from './nav-types';
 
 type Props = Tab1StackScreenProps<'Screen1'>;
 
 export function Screen1(props: Props): ReactElement {
  const dispatch = useDispatch();
   return (
     <View style={styles.container}>
       <Text style={styles.title}>Screen 1 Body</Text>
       <SimpleButton
         title="Go To Screen 2"
         onPress={() => {
           props.navigation.navigate('Screen2');
         } }
         style={styles.button} isDisabled={false}       />


<SimpleButton
         title="Load"
         onPress={() => {
          dispatch(GlobalLoaderActions.show({ cancelMessage: 'Cancel load' }));
         } }
         style={styles.button}
         secondary isDisabled={false}       />
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