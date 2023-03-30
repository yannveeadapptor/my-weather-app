import produce from 'immer';
 import React, {
   MutableRefObject,
   ReactElement,
   ReactNode,
   useCallback,
   useMemo,
   useState
 } from 'react';
 import { Animated, LayoutChangeEvent, ViewProps } from 'react-native';
 
 interface Props {
   /** Whether or not the component is collapsed */
   collapsed: boolean;
   /** A reference to the animation value used in this component */
   animationRef: MutableRefObject<Animated.Value>;
   /** The children nodes to be rendered/hidden depending on collapse state. */
   children: ReactNode;
 }
 
 /**
  * A view that can be opened or closed and will animate the transition.
  */
 export function Collapsible(props: Props): ReactElement<Props> {
   // This will be used to store the height of the props.children elements. We won't know the height at first so we default it to undefined
   const [expandedHeight, setExpandedHeight] = useState<number | undefined>();
 
   // This performs the interpolation and returns the result to 'height'.
   // It can only start once we've calculated the height of props.children at least once.
   const height =
     expandedHeight !== undefined
       ? props.animationRef.current.interpolate({
           inputRange: [0, 1],
           outputRange: [0, expandedHeight],
         })
       : undefined;
 
   // A callback used to calculate the height of a view. In this case it's for
   // Animated.View and we assign the result to the expanded height
   const onChildrenLayout = useCallback(
     (event: LayoutChangeEvent) => {
       const layoutHeight = event.nativeEvent.layout.height;
       setExpandedHeight(layoutHeight);
     },
     [setExpandedHeight]
   );
 
   // We only want to calculate the height of props.children (through onChildrenLayout)
   // on first render, so set the view props conditionally based on whether or not the height has been set
   const animatedViewProps =
     useMemo((): Animated.WithAnimatedObject<ViewProps> => {
       const defaultAnimatedProps: Animated.WithAnimatedObject<ViewProps> = {
         pointerEvents: props.collapsed ? 'none' : 'auto',
       };
       return produce(defaultAnimatedProps, (draft) => {
         if (expandedHeight !== undefined) {
           draft.style = {
             height,
             overflow: 'hidden',
           };
         } else {
           draft.onLayout = onChildrenLayout;
         }
       });
     }, [expandedHeight, height, onChildrenLayout, props.collapsed]);
 
   return <Animated.View {...animatedViewProps}>{props.children}</Animated.View>;
 }