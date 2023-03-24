
import { NavigationProp, useNavigation } from '@react-navigation/native';
 
 import { BottomTabNavigatorParamList, Tab1StackNavigatorParamList, Tab2StackNavigatorParamList } from './nav-types';
 
 export function useScreensNavigation() {
   return useNavigation<NavigationProp<Tab1StackNavigatorParamList & Tab2StackNavigatorParamList>>();
 }
 
 export function useTabNavigation() {
   return useNavigation<NavigationProp<BottomTabNavigatorParamList>>();
 }
 
 export function useDefaultNavigation() {
   return useNavigation<
     NavigationProp<Tab1StackNavigatorParamList & Tab2StackNavigatorParamList & BottomTabNavigatorParamList>
   >();
 }