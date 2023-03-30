import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalLoaderActions } from '../reducers/global-loader/reducer';
import { Locality } from '../reducers/location/reducer';
import { lookUpWeather, WeatherResponse } from '../reducers/weather/reducer';
import { AppDispatch, RootState } from '../store';
import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';
import LoadingSpinner from './loading-spinner';

const DEGRESS_CELSIUS = '°C';

interface Props {
  locationDetails: Locality;
 blocking?: boolean;
}

export function WeatherData({ locationDetails, blocking = false }: Props): ReactElement<Props> {
  const weatherState = useSelector(
    (state: RootState): WeatherResponse | undefined => state.weather.weatherData[`${locationDetails}`],
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(lookUpWeather(locationDetails));
  }, [dispatch, locationDetails]);

  useEffect(() => {
  if (blocking && weatherState?.type === 'pending') {
      dispatch(GlobalLoaderActions.show());
 } else if (blocking && weatherState?.type !== 'pending') {
      dispatch(GlobalLoaderActions.hide());
    }
  }, [dispatch, blocking, weatherState?.type]);

  switch (weatherState?.type) {
  case 'success': {
  return (
        <View style={styles.container}>
          <Text style={styles.cityText}>{`Today's weather in ` + weatherState.data.name + ` be like👇`}</Text>
          <Text style={styles.dataText}>
            Current temp: {weatherState.data.main.temp}
            {DEGRESS_CELSIUS} but it feels like:{` `}
            {weatherState.data.main.feels_like}
            {DEGRESS_CELSIUS}
          </Text>
          <Text style={styles.dataText}>
            Max temp: {weatherState.data.main.temp_max}
            {DEGRESS_CELSIUS}
          </Text>
          <Text style={styles.dataText}>
            Min temp: {weatherState.data.main.temp_min}
            {DEGRESS_CELSIUS}
          </Text>
        </View>
      );
    }
    case undefined:
    case 'pending': {
      return (
        <View
          style={{
            ...styles.container,
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size="small"  />
        </View>
      );
    }
    case 'failure': {
      return (
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Text>ERROR</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { width: '100%', minWidth: 200 },
  title: {
    fontSize: metrics.titleFontSize,
    color: colors.title,
  },
  cityText: { fontSize: metrics.h3FontSize, color: colors.title },
  dataText: {
    fontSize: metrics.bodyFontSize,
  },
});