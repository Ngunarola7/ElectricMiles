// --------------- LIBRARIES ---------------
import React, { useEffect } from 'react';
import { View, StyleSheet, Platform, Text, Image, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';

// --------------- ASSETS ---------------
import { Colors, Fonts, Images, Matrics, Scale } from '../CommonConfig';
import JSONData from './List.json'

const deviceWidth = Dimensions.get('screen').width;
// --------------- FUNCTION DECLARATION ---------------
const CharecterDetails = ({ route, navigation }) => {
    // --------------- REDUCER STATE ---------------
    const { Auth, Common } = useSelector((state) => state);
    const dispatch = useDispatch();
    const userDetails = route.params.UserDetails;
    console.log('UserDetails-->', userDetails)
    // --------------- LIFECYCLE ---------------

    // --------------- RENDER ---------------
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.PRIMARY} />
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                    <Image source={Images.IC_BLACK_BACK} style={styles.img} />
                </TouchableOpacity>
            </View>
            <View style={styles.bootomContainer}>
                <View style={styles.bootomInnerView}>
                    <View style={styles.profileContainer}>
                        <Image
                            source={
                                Object.keys(userDetails).length > 0
                                    ? { uri: userDetails.img }
                                    : Images.PROFILE_PLACEHOLDER
                            }
                            style={styles.Profile}
                            defaultSource={Images.PROFILE_PLACEHOLDER}
                            resizeMode="cover"
                        />
                    </View>
                    <Text style={styles.TitleText}>{userDetails.name}</Text>
                    <View style={{ top: Scale(-30) }}>
                        <View>
                            <Text style={[styles.labelText, {}]}>Occupation</Text>
                            {
                                userDetails.occupation.map((data, i) => {
                                    return (
                                        <Text key={i} style={[styles.valueText, { marginBottom: i == userDetails.occupation.length - 1 ? Scale(10) : Scale(0) }]}>{data}</Text>
                                    )
                                })
                            }
                            <Text style={styles.labelText}>Status</Text>
                            <Text style={styles.valueText}>{userDetails.status}</Text>
                            <Text style={styles.labelText}>Nickname</Text>
                            <Text style={styles.valueText}>{userDetails.nickname}</Text>
                            <Text style={[styles.labelText]}>Season Appearance</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    userDetails.appearance.map((appearance, j) => {
                                        return (
                                            <Text key={j} style={[styles.valueText, { marginRight: Scale(10) }]}>{appearance}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CharecterDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY
    },
    headerContainer: {
        height: Scale(120),
        backgroundColor: Colors.PRIMARY,
    },
    headerBtn: {
        paddingLeft: Scale(20)
    },
    img: {
        tintColor: Colors.WHITE,
    },
    backBtn: {
        paddingLeft: Scale(20),
        position: 'absolute',
        top: Scale(40),
    },
    bootomContainer: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    bootomInnerView: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: Scale(30),
        borderTopRightRadius: Scale(30),
        marginHorizontal: Scale(20),
        top: Scale(-40)
    },
    profileContainer: {
        width: (deviceWidth) / 3,
        backgroundColor: Colors.WHITE,
        height: Scale(105),
        width: Scale(105),
        borderRadius: Scale(105) / 2,
        alignSelf: 'center',
        justifyContent: 'center',
        top: Scale(-50),
    },
    Profile: {
        height: Scale(100),
        width: Scale(100),
        borderRadius: Scale(100) / 2,
        alignSelf: 'center',
    },
    detailsContainer: {
        flex: 1,
    },
    TitleText: {
        fontSize: Scale(25),
        fontWeight: 'bold',
        color: Colors.GRAY,
        fontFamily: Fonts.SemiBold,
        textAlign: 'center',
        marginBottom: Scale(20),
        top: Scale(-30),
    },
    leftContainer: {
        width: '50%',
    },
    rightContainer: {
        width: '50%',
    },
    labelText: {
        fontSize: Scale(18),
        color: Colors.GRAY,
        fontFamily: Fonts.SemiBold,
        fontWeight: '700',
        marginBottom: Scale(5),
    },
    valueText: {
        fontSize: Scale(16),
        color: Colors.GRAY,
        fontFamily: Fonts.Regular,
        marginBottom: Scale(20),
        marginLeft: Scale(20)
    }
})
