import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import LoadingSpinner from './loading-spinner';
import { GlobalLoaderActions } from '../reducers/global-loader/reducer';
import { Locality } from '../reducers/location/reducer';
import { useGetWeatherByLocalityQuery } from '../reducers/weather/reducer';
import { colors } from '../theme/colors';
import { metrics } from '../theme/metrics';

const DEGRESS_CELSIUS = '°C';

interface Props {
  locationDetails: Locality;
 blocking?: boolean;
}

export function WeatherData({ locationDetails, blocking = false }: Props): ReactElement<Props> {
  const weatherState = useGetWeatherByLocalityQuery(locationDetails);
  const dispatch = useDispatch();

  useEffect(() => {
  if (blocking && weatherState.isFetching) {
      dispatch(GlobalLoaderActions.show());
 } else if (blocking && !weatherState.isFetching) {
      dispatch(GlobalLoaderActions.hide());
    }
  }, [dispatch, blocking, weatherState.isFetching]);

  return (
 <View style={{ width: '100%', minWidth: 200 }}>
 {weatherState.data != null && !weatherState.isFetching && (
        <>
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
        </>
      )}
      {weatherState.isFetching && !blocking && (
        <View
          style={{
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <LoadingSpinner size="small" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: metrics.titleFontSize,
    color: colors.title,
  },
  cityText: { fontSize: metrics.h3FontSize, color: colors.title },
  dataText: {
    fontSize: metrics.bodyFontSize,
  },
});