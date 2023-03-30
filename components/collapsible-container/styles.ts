import { StyleSheet } from 'react-native';
 import { colors } from '../../theme/colors';
 import { metrics } from '../../theme/metrics';
 
 export const styles = StyleSheet.create({
   container: { width: '100%', padding: metrics.baseMargin },
   headerContainer: {
     flexDirection: 'row',
     marginBottom: metrics.doubleMargin,
   },
   headerLeftSide: {
     flex: 1,
     alignContent: 'center',
     flexDirection: 'row',
   },
   headerRightSide: {
     flex: 0,
     justifyContent: 'center',
     alignItems: 'flex-end',
   },
   headerLabel: {
     fontSize: metrics.h1FontSize,
   },
   image: {
     tintColor: colors.blankedOutBackground,
     height: metrics.icons.tiny,
     width: metrics.icons.small,
   },
 });