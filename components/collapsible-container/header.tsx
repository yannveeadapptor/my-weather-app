import React, { MutableRefObject, ReactElement } from 'react';
 import { Animated, Text, TouchableOpacity, View } from 'react-native';
 import { images } from '../../theme/images';
 import { styles } from './styles';
 
 interface Props {
   /** Whether or not the component is collapsed */
   collapsed: boolean;
   /** The label for the header */
   label: string;
   /** A reference to the animation value used in this component */
   animationRef: MutableRefObject<Animated.Value>;
   onPress: () => void;
 }
 
 export function Header(props: Props): ReactElement<Props> {
   const angle = props.animationRef.current?.interpolate({
     /** It's easier to reason about values between 0 and 1 when determining how far through the interpolation the value is */
     inputRange: [0, 1],
     /** The input values ultimately map to the output range, in this case we're going from -90 degrees to 0 degrees */
     outputRange: ['-90deg', '0deg'],
   });
 
   return (
     <TouchableOpacity style={styles.headerContainer} onPress={props.onPress}>
       <View style={styles.headerLeftSide}>
         <Text style={styles.headerLabel}>{props.label}</Text>
       </View>
       <View style={styles.headerRightSide}>
         {/**
          Animated provides us with an animated Image type which allows us to use animation values, not just regular numbers
         */}
         <Animated.Image
           source={images.arrowDown}
           style={[
             styles.image,
             angle !== undefined ? { transform: [{ rotateZ: angle }] } : undefined,
           ]}
         />
       </View>
     </TouchableOpacity>
   );
 }