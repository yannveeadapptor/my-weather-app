import React, {
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
  } from 'react';
  import { Animated, Easing, View } from 'react-native';
  import { Collapsible } from './collapsible';
  import { Header } from './header';
  import { styles } from './styles';
  
  export const DEFAULT_COLLAPSE_DURATION_MS = 400;
  
  interface Props {
    /** The children nodes to be rendered/hidden depending on collapse state. */
    children: ReactNode;
    /** The label for the header */
    label: string;
    /** Whether or not the component is collapsed */
    collapsed: boolean;
    /** A function that should toggle the collapsed state */
    toggleCollapsed: () => void;
  }
  
  export function Container(props: Props): ReactElement<Props> {
    // Initialise the reference to an Animated.Value. Start at 0.
    // We will use this reference to both rotate the arrow and expand/collapse the collapsible view containing props.children.
    const animationRef = useRef(new Animated.Value(0));
  
    /**
     * Close the expanding view down to its minHeight.
     */
    const collapse = useCallback(() => {
      Animated.timing(animationRef.current, {
        easing: Easing.inOut(Easing.ease),
        duration: DEFAULT_COLLAPSE_DURATION_MS,
        // On collapse we interpolate to 0 from 1
        toValue: 0,
        // Animated.timing is not supported by the native driver
        useNativeDriver: false,
      }).start();
    }, []);
  
    /**
     * Open the expanding view to its maxHeight.
     */
    const expand = useCallback(() => {
      Animated.timing(animationRef.current, {
        easing: Easing.inOut(Easing.ease),
        duration: DEFAULT_COLLAPSE_DURATION_MS,
        // On expand we interpolate to 1 from 0
        toValue: 1,
        // Animated.timing is not supported by the native driver
        useNativeDriver: false,
      }).start();
    }, []);
  
    // When props.collapsed changes, call the corresponding function
    useEffect(() => {
      if (props.collapsed) {
        collapse();
      } else {
        expand();
      }
    }, [props.collapsed, expand, collapse]);
  
    return (
      <View style={styles.container}>
        <Header
          animationRef={animationRef}
          collapsed={props.collapsed}
          label={props.label}
          onPress={props.toggleCollapsed}
        />
        <Collapsible collapsed={props.collapsed} animationRef={animationRef}>
          {props.children}
        </Collapsible>
      </View>
    );
  }