
import { StatusBar } from 'expo-status-bar';
import { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Modal } from './components/modal-dialog';
import { OptionsList } from './components/options-list';
import { SimpleButton } from './components/simple-button';
import { colors } from './theme/colors';
import { images } from './theme/images';
import { metrics } from './theme/metrics';
import { useIsMounted } from './utils/common-hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { AppDispatch, persistor, RootState, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Screen1 } from './views/screen1';
import { Screen2 } from './views/screen2';
import { Screen3 } from './views/screen3';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen4 } from './views/screen4';
import { Screen5 } from './views/screen5';
import type { StackScreenProps } from '@react-navigation/stack';
import { Screen6 } from './views/screen6';
import { GlobalLoader } from './components/global-loader';
import { GlobalLoaderActions } from './reducers/global-loader/reducer';
import { useDispatch } from 'react-redux';
import { getDeviceLocation, NO_LOCATION_PERMISSIONS_GRANTED } from './apis/location';
import { deviceLocation, locationActions } from './reducers/location/reducer';
import { isErrorObject } from './utils/error';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { Settings } from './views/settings';
const Stack = createNativeStackNavigator<Tab1StackNavigatorParamList>();


interface HelloWorldProps {
  shouldRenderWorld: boolean;
}

function Tab1Stack() {
  return (
    <Stack.Navigator initialRouteName="Screen1">
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{ title: 'Screen 1' }}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{ title: 'Screen 2' }}
      />
      <Stack.Screen
        name="Screen3"
        component={Screen3}
        options={{ title: 'Screen 3' }}
      />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();




export type Tab1StackNavigatorParamList = {
  Screen1?: never;
  Screen2?: never;
  Screen3: { counter: number };
};



export type Tab1StackScreenProps<T extends keyof Tab1StackNavigatorParamList> = StackScreenProps<
  Tab1StackNavigatorParamList,
  T
>;

export type BottomTabNavigatorParamList = {
  Tab1?: Tab1StackNavigatorParamList;
  Tab2?: Tab2StackNavigatorParamList;
};
export type Tab2StackNavigatorParamList = {
  Screen4?: never;
  Screen5?: never;
  Settings?: never;
};

export type Tab2StackScreenProps<T extends keyof Tab2StackNavigatorParamList> = StackScreenProps<
  Tab2StackNavigatorParamList,
  T
>;

const SettingsStack = createNativeStackNavigator<Tab2StackNavigatorParamList>();

function Tab2Stack() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings" screenOptions={{ animation: 'slide_from_right' }}>
      <SettingsStack.Screen name="Settings" component={Settings} options={{ title: 'Screen 4' }} />
      <SettingsStack.Screen name="Screen5" component={Screen5} options={{ title: 'Screen 5' }} />
    </SettingsStack.Navigator>
  );
}



function RootContainer() {
  const globalLoaderState = useSelector((state: RootState) => state.globalLoader);


const dispatch = useDispatch<AppDispatch>();
useEffect(() => {
  dispatch(deviceLocation());
}, [dispatch]);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     getDeviceLocation()
//       .then(async (location) => {
//   const loc = await dispatch(locationActions.setMyLocation(location.coords));
//   console.log(loc.payload);
//       })
//       .catch((e) => {
//   console.log(e);
//   const errorTitle = 'Error retrieving device location';
//   const error = isErrorObject(e);
//   if (error?.message === NO_LOCATION_PERMISSIONS_GRANTED) {
//           Alert.alert(
//             errorTitle,
//   'Location permissions have not been granted. Please add them in settings.'
//           );
//  } else {
//           Alert.alert(
//             errorTitle,
//   `${error?.message ?? 'Unknown issue has occurred'}`
//           );
//         }
//       });
//   }, [dispatch]);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Tab1"
          component={Tab1Stack}
          options={{ 
            title: 'Weather Tab', 
            tabBarLabel: 'Weather',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcon name="weather-cloudy" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tab2"
          component={Tab2Stack}
          options={{ 
            title: 'Settings Tab', 
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <FontistoIcon name="player-settings" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Tab3"
          component={Screen6}
          options={{ 
            title: 'Favourite Tab', 
            tabBarLabel: 'Favourites',
            tabBarIcon: ({ color, size }) => (
              <FontistoIcon name="favorite" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>

      <GlobalLoader

        show={globalLoaderState.show}

        message={globalLoaderState.message}

        cancelMessage={globalLoaderState.cancelMessage}

        onDismiss={() => dispatch(GlobalLoaderActions.hide())}

      />
    </NavigationContainer>

  );



}


export default function App() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider >
  );

  // useEffect(() => {
  //   fetch('https://api.openweathermap.org/data/2.5/weather?lat=-32.168841&lon=115.809106&units=metric&appid=6d79331901ebcd0818c10da8d4c49ff7'
  //   )
  //     .then((result) => {
  //       console.log('SUCCESS', result);
  //     })
  //     .catch((error) => {
  //       console.warn('FAILURE', error);
  //     });
  // }, []);
  // console.group('People');
  //  const person = {
  //    givenName: 'Tomas',
  //    surname: 'Haake',
  //    age: 52,
  //  };
  //  const person2 = {
  //    givenName: 'Fredrik',
  //    surname: 'Thordendal',
  //    age: 52,
  //  };

  //  console.log('Print a person object', person);
  //  console.log('Print a person object', person2);
  //  console.groupEnd();
  //  console.group('Cars');
  //  const car = {
  //    make: 'Nissan',
  //    model: 'Skyline',
  //    badge: 'GT-R R32',
  //  };
  //  console.log('Print a car object', car);
  //  console.groupEnd();

  // console.error("Hello Log");
  // console.warn("Hello Log warn");

  // console.log('Print a person object', person);
  // return (
  //   <View style={styles.container}>

  //     <ShowRandomNumber2/>
  //      <MyForm />
  //      <Counter />
  //      <Accumulator bigArray={[...Array(100000).keys()]} />
  //     <SimpleButton title="Show Modal" onPress={() => setShowDialog(true)} isDisabled={false} />
  //     <HelloWorld shouldRenderWorld={true} />
  //     <StatusBar style="auto" />
  //     <Counter />
  //     <OptionsList
  //       title="Settings"
  //       rows={[
  //         { title: 'Notifications', leftIcon: images.favIcon },
  //         { title: 'Sounds & Haptics', leftIcon: images.favIcon },
  //         { title: 'Focus', leftIcon: images.favIcon },
  //         { title: 'Screen Time', leftIcon: images.favIcon },
  //       ]}
  //     />
  //     <Modal
  //       title="Custom Success"
  //       content={{
  //         type: 'custom',
  //         element: (
  //           <OptionsList
  //             title="Settings"
  //             rows={[
  //               { title: 'Notifications', leftIcon: images.favIcon },
  //               { title: 'Sounds & Haptics', leftIcon: images.favIcon },
  //             ]}
  //           />
  //         ),
  //       }}
  //       show={showDialog}
  //       dismissButton={{ onDismiss: () => setShowDialog(false), title: 'dismiss' }}
  //     />
  //   </View>
  // );
}

function HelloWorld(props: HelloWorldProps) {

  return (
    <View style={helloWorldStyles.container}>
      <Text style={helloWorldStyles.text}>Hello</Text>
      {props.shouldRenderWorld && <Text style={helloWorldStyles.text}>World</Text>}
    </View>
  );
}

function MyForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const textInputEmailRef = useRef<TextInput>(null);
  const textInputPhoneRef = useRef<TextInput>(null);

  // On component mount
  useEffect(() => {
    textInputEmailRef.current?.focus();
  }, []);

  const isPhoneValid = phone.length >= 1;

  return (
    <>
      <TextInput
        ref={textInputEmailRef}
        style={{
          backgroundColor: colors.lightGrey,
          color: colors.buttonWhite,
          padding: metrics.largerMargin,
          borderRadius: metrics.borderRadius,
          fontSize: metrics.h3FontSize,
          fontWeight: 'bold',
        }}
        returnKeyType={isPhoneValid ? 'done' : 'next'}
        value={email}
        placeholder="Enter email"
        onChangeText={(input) => setEmail(input)}
        onEndEditing={() => {
          // If phone number is invalid focus on the phone input field when hitting 'next'
          if (!isPhoneValid) {
            textInputPhoneRef.current?.focus();
          }
        }}
      />

      <TextInput
        ref={textInputPhoneRef}
        style={{
          backgroundColor: colors.lightGrey,
          color: colors.buttonWhite,
          padding: metrics.largerMargin,
          marginTop: metrics.baseMargin,
          borderRadius: metrics.borderRadius,
          fontSize: metrics.h3FontSize,
          fontWeight: 'bold',
        }}
        returnKeyType="done"
        value={phone}
        placeholder="Enter phone number"
        onChangeText={(input) => setPhone(input)}
        keyboardType="phone-pad"
      />
    </>
  );
}

function Accumulator(props: AccumulatorProps): ReactElement<AccumulatorProps> {
  const allAdded = useMemo(
    // Reduce will take an array, and turn it into a single value of the same type. In this case, it's summing all numbers in the array
    () => props.bigArray.reduce((a, b) => a + b, 0),
    // The dependency array says only recalculate when props.bigArray changes
    [props.bigArray],
  );

  return <Text>{allAdded}</Text>;
}

/**
  * Simulate an API call fetching a number. Return a random number after 5 seconds
  */
async function fetchRandomNumber(): Promise<number> {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(Math.trunc(Math.random() * 100));
    }, 1500)
  );
}

/**
  * This will show a number that is "fetched". You can click the random number to "fetch" another number.
  * It takes 5 seconds to fetch this number.
  */
function ShowRandomNumber() {
  const [result, setResult] = useState<number | undefined>();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return function cleanup() {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (result === undefined) {
      fetchRandomNumber()
        .then((res) => {
          if (isMounted.current) {
            setResult(res);
          }
        })
        .catch((error) => {
          if (isMounted.current) {
            setResult(undefined);
          }
          console.warn(error);
        });
    }
  }, [result]);

  const onPress = useCallback(() => {
    setResult(undefined);
  }, []);

  if (result == null) {
    return <Text>Waiting on a number</Text>;
  }

  return <Text onPress={onPress}>{`Random number: ${result}`}</Text>;
}


function ShowRandomNumber2() {
  const [result, setResult] = useState<number | undefined>();

  const isMounted = useIsMounted();

  useEffect(() => {
    if (result == null) {
      fetchRandomNumber()
        .then((res) => {
          if (isMounted()) {
            setResult(res);
          }
        })
        .catch((error) => {
          if (isMounted()) {
            setResult(undefined);
          }
          console.warn(error);
        });
    }
  }, [result, setResult, isMounted]);

  const onPress = useCallback(() => {
    setResult(undefined);
  }, [setResult]);

  if (result == null) {
    return <Text>Waiting on a number</Text>;
  }

  return <Text onPress={onPress}>{`Random number: ${result}`}</Text>;
}

function Counter() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter % 2 === 0) {
      Alert.alert(`Count: ${counter}`);
    }
  }, [counter]);
  const onPress = useCallback(() => setCounter((currentValue) => currentValue + 1), [setCounter]);

  return <Text onPress={onPress}>{`Count: ${counter}`}</Text>;
}

interface AccumulatorProps {
  bigArray: number[];
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const helloWorldStyles = StyleSheet.create({
  text: {
    width: "100%",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: 'red'
  },
  container: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    backgroundColor: 'blue'
  }
})
function useAppSelector(arg0: (state: RootState) => any) {
  throw new Error('Function not implemented.');
}

