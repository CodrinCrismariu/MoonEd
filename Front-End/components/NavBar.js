import React from 'react';
import { StyleSheet, 
        View,
        Dimensions,
        Text } from 'react-native';
import OptionsIcon from '../imgs/OptionsIcon';
import HumanIcon from '../imgs/HumanIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default NavBar = (props) => {
    return (
        <View style={styles.container}>
            <OptionsIcon style={styles.img} width={ windowWidth / 100 * 12.5 }/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>
            <HumanIcon style={[styles.img]} width={ windowWidth / 100 * 10 }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: windowWidth,
        height: windowWidth / 100 * 30,
        backgroundColor: '#272727',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.7,
        shadowRadius: 9.51,
        elevation: 15,
        alignItems: 'center',
    },
    img: {
        left: windowWidth / 100 * 5,
        top: 10,
    },
    text: {
        top: 10,
        fontSize: windowWidth / 100 * 8,
        color: '#BABABA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    textContainer: {
        left: windowWidth / 100 * 5,
        width: windowWidth / 100 * 67.5,
        alignItems: 'center',
    },
});

