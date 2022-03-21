// --------------- LIBRARIES ---------------
import React, { useEffect } from 'react';
import { TouchableOpacity, View, SafeAreaView, StyleSheet, FlatList, Text, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// --------------- ASSETS ---------------
import { Colors, Fonts, Images, Matrics, Scale } from '../../CommonConfig';

// --------------- FUNCTION DECLARATION ---------------
const CharecterCard = ({ item, navigation }) => {
    const { name, img, status } = item
    let cardHeight = Matrics.screenWidth / 1.8
    let imageSize = cardHeight / 2.5
    let statusColor = status == 'Alive' ? Colors.GREEN : status == 'Presumed dead' ? Colors.ORANGE : Colors.TOMATO
    // --------------- LIFECYCLE ---------------
    useEffect(() => {

    }, []);

    // --------------- RENDER ---------------
    return (
        <View style={styles.cardContainer(cardHeight)}>
            <TouchableOpacity style={styles.touchableView} onPress={() => navigation.navigate('CharecterDetails', { UserDetails: item }) }>
                <View style={styles.charecterImageStyle}>
                    <View style={styles.imgContainer(imageSize)}>
                        <Image source={{ uri: img }} defaultSource={Images.PROFILE_PLACEHOLDER} style={styles.profileImgStyle(imageSize)} />
                    </View>
                </View>
                <View style={styles.charNameContainer}>
                    <Text style={styles.charNameTextStyle}>{name}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <View style={styles.statusDotStyle(statusColor)} />
                    <Text style={styles.statusTextStyle(statusColor)}>{status}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CharecterCard;

const styles = StyleSheet.create({
    cardContainer: (cardHeight) => { return { width: '50%', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: Scale(cardHeight), backgroundColor: Colors.WHITE } },
    touchableView: { shadowColor: Colors.GRAY, shadowOffset: { height: 1, width: 0.8 }, shadowRadius: 3, shadowOpacity: 0.6, width: '85%', height: '85%', backgroundColor: Colors.WHITE, borderWidth: 2, borderColor: Colors.PRIMARY, borderRadius: Scale(25), justifyContent: 'center', alignItems: 'center' },
    charecterImageStyle: { flex: 0.7, justifyContent: 'center', alignItems: 'center' },
    imgContainer: (imageSize) => { return { borderWidth: Scale(6), borderColor: Colors.WHITE, borderRadius: Scale(imageSize), shadowColor: Colors.GRAY, shadowOffset: { height: 1, width: 0.8 }, shadowRadius: 3, shadowOpacity: 0.6 } },
    charNameContainer: { flex: 0.15, backgroundColor: Colors.PRIMARY, width: '100%', alignItems: 'center', justifyContent: 'center' },
    charNameTextStyle: { fontSize: Scale(14), fontWeight: '500', color: Colors.WHITE, fontFamily: Fonts.SemiBold },
    statusContainer: { flex: 0.15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    statusDotStyle: (statusColor) => { return { width: 10, height: 10, marginRight: 5, backgroundColor: statusColor, borderRadius: 10 } },
    statusTextStyle: (statusColor) => { return { fontSize: Scale(10), fontWeight: '600', color: statusColor, fontFamily: Fonts.SemiBold } },
    profileImgStyle: (imageSize) => {
        return {
            height: Scale(imageSize), width: Scale(imageSize), borderRadius: Scale(imageSize),
        }
    }
})
