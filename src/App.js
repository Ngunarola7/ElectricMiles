// --------------- LIBRARIES ---------------
import React, { Fragment, useEffect } from 'react';
import { TextInput, SafeAreaView, Text, Platform, UIManager, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from './Components/Hooks/ThemeProvider';
import AsyncStorage from '@react-native-community/async-storage';

// --------------- ASSETS ---------------
import Routes from './Routes';
import { Store, Persistor } from './Redux/Store';
import { Colors, Fonts, Images, Matrics, Scale } from './CommonConfig';
import AlertComponent from './Components/Common/AlertComponent';

/**
 * Font scalling configuration, 
 * By setting this configuration it will not allow app to use mobile default configuration for fonts and font size.
 */
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

/**
 * Animation configuration for Android
 */
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

// --------------- MAIN ---------------
export default () => {
    console.disableYellowBox = true;

    //Lifecycle methods
    useEffect(() => {
        
    }, []);

    return (
        <ThemeProvider>
                <Fragment>
                    <Provider store={Store}>
                        <PersistGate persistor={Persistor}>
                            {/* <StatusBar barStyle={'dark-content'} /> */}
                            <Routes />
                            <AlertComponent />
                        </PersistGate>
                    </Provider>
                </Fragment>
        </ThemeProvider>
    );
};
