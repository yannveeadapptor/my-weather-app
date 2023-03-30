import React, { ReactElement } from 'react';
 import { StyleSheet, Text, View } from 'react-native';
 
 import { GlobalLoaderState } from '../reducers/global-loader/reducer';
 import { colors } from '../theme/colors';
 import { metrics } from '../theme/metrics';
import LoadingSpinner from './loading-spinner';
 
 interface Props extends GlobalLoaderState {
   onDismiss?: () => void;
 }
 
 export function GlobalLoader(props: Props): ReactElement<Props> | null {
   if (!props.show) {
     return null;
   }
   return (
     <View style={styles.container}>
       <View style={styles.loader}>
         <LoadingSpinner />
         {props.message != null && <Text style={styles.optionalText}>{props.message}</Text>}
         {props.cancelMessage != null && (
           <Text style={styles.cancelText} onPress={props.onDismiss}>
             {props.cancelMessage}
           </Text>
         )}
       </View>
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     bottom: 0,
     justifyContent: 'center',
     backgroundColor: colors.blankedOutBackground,
   },
   loader: {
     backgroundColor: colors.standardBackground,
     margin: metrics.baseMargin,
     alignSelf: 'center',
     padding: metrics.baseMargin,
     borderRadius: metrics.borderRadius,
   },
   title: {
     fontWeight: 'bold',
     fontSize: metrics.h1FontSize,
     textAlign: 'center',
   },
   optionalText: {
     fontSize: metrics.bodyFontSize,
     textAlign: 'center',
   },
   cancelText: {
     marginTop: metrics.baseMargin,
     fontSize: metrics.bodyFontSize,
     textAlign: 'center',
     fontWeight: 'bold',
     color: colors.cancelText,
   },
 });