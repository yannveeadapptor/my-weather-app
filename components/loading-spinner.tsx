import React, { ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

import { animations } from '../theme/animations';
import { metrics } from '../theme/metrics';

const DEFAULT_SPEED = 0.5;

export type LoadingSpinnerSize = 'small' | 'regular' | 'large';

/**
 * Function to calculate size based on LoadingSpinnerSize property
 */
function getAnimationSize(size: LoadingSpinnerSize): number {
  switch (size) {
  case 'small':
  return metrics.baseMargin * 6;
  case 'regular':
  return metrics.baseMargin * 12;
  case 'large':
  return metrics.baseMargin * 24;
  }
}

interface Props {
  /**
  * Determine the spinner size. In this lesson we're just using the loading spinner with
  * the global loader however it can be used in anyway you desire. For example as an inline spinner
  * when you don't want to block the whole screen during an operation.
   */
  size?: LoadingSpinnerSize;
}

export default function LoadingSpinner({
  // Default size to regular
  size = 'regular',
}: Props): ReactElement<Props> {
  // Calculate width based on the size prop
  const animStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: getAnimationSize(size),
    }),
    [size]
  );

  return (
    <LottieView
      source={animations.loading}
      style={[styles.lottie, animStyle]}
      speed={DEFAULT_SPEED}
  // Play as soon as we start to render
      autoPlay
  // Play again as soon as the animation reaches the end
      loop
    />
  );
}

const styles = StyleSheet.create({
  lottie: {
 alignSelf: 'center',
  },
});