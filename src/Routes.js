// --------------- LIBRARIES ---------------
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { useSelector, useDispatch } from 'react-redux';

// --------------- ASSETS ---------------
import { navigationRef } from './Helpers/Navigation';
import { getNetwork } from './Redux/Actions';
import { Colors, Images } from './CommonConfig';

// --------------- SCREENS ---------------

// --------------- SCREENS - Home Tab Bar ---------------

// --------------- SCREENS - Profile Tab Bar ---------------
import ListOfCharecters from './Screens/ListOfCharecters';
import CharecterDetails from './Screens/CharecterDetails';

const Stack = createNativeStackNavigator();

// --------------- ROUTES ---------------
const Routes = () => {
    // --------------- REDUCER STATE ---------------
    const { Common } = useSelector((state) => state); // Get reducer state
    const dispatch = useDispatch(); // dispatch method to dispatch our actions to reducer and saga

    // --------------- LIFECYCLE ---------------
    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            dispatch(getNetwork.Request(state.isConnected));
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // --------------- RENDER ---------------
    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName='ListOfCharecters' headerMode="none">
                    <Stack.Screen name='ListOfCharecters' options={{ headerShown: false }} component={ListOfCharecters} />
                    <Stack.Screen 
                        name='CharecterDetails'
                        options={{   
                            headerShown: false
                            // title: "Charecter Details",
                            // headerBackTitleVisible: false,
                            // headerTitleAlign: 'center',
                            // headerBackImageSource: Images.IC_BLACK_BACK,
                            // headerTintColor: Colors.BLACK
                        }} 
                        component={CharecterDetails} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};


// =============== STYLSHEET ===============

export default Routes;
