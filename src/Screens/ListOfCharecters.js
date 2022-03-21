// --------------- LIBRARIES ---------------
import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, FlatList, TextInput, Image, View, Platform, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// --------------- ASSETS ---------------
import { Colors, Fonts, Images, Matrics, Scale, Constants } from '../CommonConfig';
import CharecterCard from './Components/CharecterCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loader from "../Components/Common/Loader";
import { getCharacters } from '../Redux/Actions';
import { Popup } from '../Helpers';

// --------------- FUNCTION DECLARATION ---------------
const ListOfCharecters = ({ navigation }) => {
    // --------------- REDUCER STATE ---------------
    const { Common, Character } = useSelector((state) => state);
    const dispatch = useDispatch();

    // --------------- REDUCER STATE ---------------
    const [Data, setData] = React.useState([]);
    const [AllData, setAllData] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    // --------------- LIFECYCLE ---------------
    React.useEffect(() => {
        setIsLoading(true);
        dispatch(getCharacters.Request({}));
    }, []);

    React.useEffect(() => {
        if (isLoading && Character.getCharacterSuccess == true) {
            setIsLoading(false);
            setData(Character.characterListResponse);
            setAllData(Character.characterListResponse);
        } else if (isLoading && Character.getCharacterSuccess == false) {
            setIsLoading(false);
            Popup.errorToast(Character?.errorMsg ?? Constants.SOMETHING_WRNG);
        }
    }, [Character.getCharacterSuccess]);

    // --------------- METHODS ---------------
    const onChangeSearchQuery = (text) => {
        const newData = AllData.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
        setSearchQuery(text);
    }

    const onPressSearch = () => {
        if (searchQuery !== '') {
            let searchArr = [];
            for (let i = 0; i < AllData.length; i++) {
                let searchstr = (AllData[i].name).toLowerCase();
                if (searchstr.trim().search(searchQuery.trim().toLowerCase()) > -1) {
                    searchArr.push(AllData[i]);
                }
            }
            setData(searchArr);
        }
    }

    const renderEmptyComponent = () => {
        return (
            <View style={styles.NodataContainer}>
                {
                    !isLoading &&
                    <Text style={styles.nodataText}>No Data Found!</Text>
                }
            </View>
        );
    }
    // --------------- RENDER ---------------
    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle="dark-content" backgroundColor={Colors.WHITE} />
            <View style={styles.headerContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Search'
                    placeholderTextColor={Colors.GRAY}
                    value={searchQuery}
                    onChangeText={(text) => { onChangeSearchQuery(text) }}
                    returnKeyType={'search'}
                    onSubmitEditing={() => { onPressSearch() }}
                />
                <TouchableOpacity onPress={() => onPressSearch()} style={styles.BtnIcon}>
                    <Image source={Images.IC_SEARCH} style={styles.Icon} />
                </TouchableOpacity>

            </View>
            <FlatList
                data={Data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <CharecterCard item={item} navigation={navigation} />}
                numColumns={2}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={{ flexGrow: 1 }}
            />
            <Loader visible={isLoading} />
        </SafeAreaView >
    );
};

export default ListOfCharecters;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    headerContainer: {
        flexDirection: 'row',
        borderWidth: 0.6,
        borderColor: Colors.LIGHT_GRAY,
        marginHorizontal: Scale(15),
        borderRadius: Scale(5),
        marginBottom: Scale(10),
        marginTop: Scale(10)
    },
    BtnIcon: {
        alignSelf: 'center',
        paddingVertical: Scale(10),
        paddingHorizontal: Scale(10),
    },
    Icon: {
        alignSelf: 'center',
        tintColor: Colors.LIGHT_GRAY
    },
    searchInput: {
        fontSize: Scale(14),
        fontWeight: '500',
        fontFamily: Fonts.SemiBold,
        padding: 0,
        flex: 1,
        paddingVertical: Platform.OS == 'android' ? Scale(5) : Scale(10),
        marginLeft: Scale(10),
        borderRightColor: Colors.LIGHT_GRAY,
        borderRightWidth: 0.6,
        color: Colors.GRAY
    },
    NodataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    nodataText: {
        fontFamily: Fonts.SemiBold,
        fontSize: Scale(18),
        color: Colors.GRAY
    },
})
