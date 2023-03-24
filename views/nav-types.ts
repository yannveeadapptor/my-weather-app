import type { StackScreenProps } from '@react-navigation/stack';
 
export type ScreensParamList = {
    Screen1?: never;
    Screen2?: never;
    Screen3: { counter: number };
  };
 export type DefaultStackScreenProps<T extends keyof ScreensParamList> =
   StackScreenProps<ScreensParamList, T>;