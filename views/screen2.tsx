import React, { ReactElement, useRef, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

import { SimpleButton } from '../components/simple-button';
import { WeatherData } from '../components/weather-data';
import { Locality } from '../reducers/location/reducer';
import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';
import { Tab1StackScreenProps } from './nav-types';

type Props = Tab1StackScreenProps<'Screen2'>;

export function Screen2(props: Props): ReactElement<Props> {
  const counterRef = useRef(0);
  const [locality, setLocality] = useState<Locality | undefined>();
  return (
    <View style={styles.container}>
      <MapView rotateEnabled={false}
        style={styles.map}
        onLongPress={(event) => {
          setLocality(undefined);

  const locality: Locality = {
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          };
          setTimeout(() => {
            setLocality(locality);
          });
        }}
      >
 {locality != null && (
          <Marker style={styles.marker} coordinate={locality}>
            <Callout style={styles.callout}>
              <WeatherData locationDetails={locality} />
            </Callout>
          </Marker>
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <SimpleButton
          title="Go back"
          onPress={() => {
            props.navigation.goBack();
          } }
          style={styles.backButton}
          secondary isDisabled={false}        />
        <SimpleButton
          title="Go To Screen 3"
          onPress={() => {
            counterRef.current += 1;
            props.navigation.navigate('Screen3', {
              counter: counterRef.current,
            });
          } }
          style={styles.nextButton} isDisabled={false}        />
      </View>
    </View>
  );
}

const buttonStyle: StyleProp<ViewStyle> = {
 width: '40%',
  margin: metrics.baseMargin,
};

const styles = StyleSheet.create({
  container: {
 flex: 1,
 alignItems: 'center',
    marginBottom: metrics.baseMargin,
  },
  buttonContainer: {
 flexDirection: 'row',
 justifyContent: 'space-around',
  },
  backButton: {
    ...buttonStyle,
  /**
  * as we have two buttons next to each other with the same margin negate the margin on one of them
     */
 marginRight: 0,
  },
  nextButton: buttonStyle,
  title: {
    fontSize: metrics.titleFontSize,
    color: colors.title,
  },
  map: {
 flex: 1,
 height: '100%',
 width: '100%',
  },
  marker: { margin: metrics.baseMargin },
 callout: { margin: metrics.baseMargin, minWidth: 300 },
});