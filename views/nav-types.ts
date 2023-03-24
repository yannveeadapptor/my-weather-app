import type { StackScreenProps } from '@react-navigation/stack';

 
 export type Tab1StackNavigatorParamList = {
   Screen1?: never;
   Screen2?: never;
   Screen3: { counter: number };
 };

 

export type Tab1StackScreenProps<T extends keyof Tab1StackNavigatorParamList> = StackScreenProps<
   Tab1StackNavigatorParamList,
   T
 >;
 

  export type Tab2StackNavigatorParamList = {
    Screen4?: never;
    Screen5?: never;
  };
  
  export type Tab2StackScreenProps<T extends keyof Tab2StackNavigatorParamList> = StackScreenProps<
    Tab2StackNavigatorParamList,
    T
  >;
  

  export type BottomTabNavigatorParamList = {
    Tab1?: Tab1StackNavigatorParamList;
    Tab2?: Tab2StackNavigatorParamList;
    Tab3?: never;
  };