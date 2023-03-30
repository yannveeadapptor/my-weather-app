import React, { ReactElement, useState } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 import { useDispatch, useSelector } from 'react-redux';
 
 import { Tab1StackScreenProps } from './nav-types';
 import { CollapsibleContainer } from '../components/collapsible-container';
 import { SimpleButton } from '../components/simple-button';
 import { GlobalLoaderActions } from '../reducers/global-loader/reducer';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
import { RootState } from '../store';
import { WeatherData } from '../components/weather-data';
 
 type Props = Tab1StackScreenProps<'Screen1'>;
 
 export function Screen1(props: Props): ReactElement {
   const dispatch = useDispatch();
   const [collapsed, setCollapsed] = useState(false);
   const locationState = useSelector((state: RootState) => state.location.myLocation);
   return (
    <View style={styles.container}>
 <Text style={styles.title}>Screen 1 Body</Text>
      {locationState?.locality && <WeatherData locationDetails={locationState.locality} />}
       <SimpleButton
         title="Load"
         onPress={() => {
           dispatch(GlobalLoaderActions.show({ cancelMessage: 'Cancel load' }));
         } }
         style={styles.button}
         secondary isDisabled={false}       />
       <CollapsibleContainer
         label="Collapsible container"
         collapsed={collapsed}
         toggleCollapsed={() => setCollapsed((prev) => !prev)}
       >
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <Text>Copy and paste</Text>
         <SimpleButton
           title="Go To Screen 2"
           onPress={() => {
             props.navigation.navigate('Screen2');
           } }
           style={styles.button} isDisabled={false}         />
       </CollapsibleContainer>
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