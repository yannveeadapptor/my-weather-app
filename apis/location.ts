import * as Location from 'expo-location';

export const NO_LOCATION_PERMISSIONS_GRANTED = 'no_location_permissions';

export async function getDeviceLocation(): Promise<Location.LocationObject> {
  try {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
  throw new Error(NO_LOCATION_PERMISSIONS_GRANTED);
    }

  const location = await Location.getCurrentPositionAsync();

  return location;
 } catch (e) {
  console.error(e);
  // Re-throw
  throw e;
  }
}