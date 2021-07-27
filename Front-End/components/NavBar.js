import React, { useState } from 'react';
import { StyleSheet, 
        View,
        Dimensions,
        Text,
        TouchableOpacity,
        Button, } from 'react-native';
        
import OptionsIcon from '../imgs/OptionsIcon';
import HumanIcon from '../imgs/HumanIcon';
import XIcon from '../imgs/XIcon';
import EvolutionIcon from '../imgs/EvolutionIcon';
import GradeIcon from '../imgs/GradeIcon';
import MessageIcon from '../imgs/MessageIcon'
import * as SecureStore from 'expo-secure-store';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default NavBar = (props) => {

    const [openMoreOptions, setMoreOptions] = useState(0);
    const [openProfile, setProfile] = useState(0);

    return (
        <View style={{ position: 'absolute' }}>
            <View style={ styles.container }>
                <OptionsIcon style={ [styles.img, { marginLeft: windowWidth / 100 * 5 }] } 
                             width={ windowWidth / 100 * 12.5 } 
                             onPress={() => setMoreOptions(1)}/>

                <View style={ styles.textContainer }>
                    <Text style={ styles.text }>
                        {props.text}
                    </Text>
                </View>

                <HumanIcon style={ styles.img } 
                           width={ windowWidth / 100 * 10 }
                           onPress={() => { setProfile(1), setMoreOptions(0) }}/>
            </View>

            { openMoreOptions == 1 ? 
                    <SlideWindow setOpen={ setMoreOptions } 
                                 setPage={ props.setPage }/> 
                    : <></> }

            { openProfile == 1 ? 
                <ProfileWindow name={ props.name }
                               setOpen={ setProfile }
                               setLoggedIn={ props.setLoggedIn }
                               setPage={ props.setPage }/>
            : <></> }
        </View>
    )
}

const SlideWindow = ({ setOpen, setPage }) => {
    return (
        <View style={ styles.window }>
            <XIcon height={ windowWidth / 100 * 12.5 } 
                   width={ windowWidth / 100 * 12.5 }
                   style={{
                       marginLeft: windowWidth / 100 * 5,
                       marginTop: windowWidth / 100 * 8.75 + 10,
                   }}
                   onPress={() => setOpen(0)}
            />

            <StudentButtons setPage={ setPage }/>

        </View>
    )
}

const StudentButtons = ({ setPage }) => {
    return (
        <>
            <TouchableOpacity style={{ marginTop: windowWidth / 100 * 10, }} 
                              onPress={() => { setPage('evolution') }}>
                <View style={{ height: windowWidth / 100 * 20 }}>
                    <View style={{ flex: 1, 
                                   flexDirection: 'row', 
                                   alignItems: 'center' }}>
                        <EvolutionIcon width={ windowWidth / 100 * 12.5 } 
                                       height={ windowWidth / 100 * 20 }
                                       marginLeft={ windowWidth / 100 * 7 }/>
                        <Text style={{ fontSize: windowWidth / 100 * 7,
                                       color: '#BABABA',
                                       fontFamily: 'Roboto',
                                       fontWeight: 'bold',
                                       marginLeft: windowWidth / 100 * 5, }}>
                            Evoluție
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: windowWidth / 100 * 2, }} 
                              onPress={() => { setPage('grades') }}>
                <View style={{ height: windowWidth / 100 * 20 }}>
                    <View style={{ flex: 1, 
                                   flexDirection: 'row', 
                                   alignItems: 'center' }}>
                        <GradeIcon width={ windowWidth / 100 * 12.5 } 
                                   height={ windowWidth / 100 * 20 }
                                   marginLeft={ windowWidth / 100 * 7 }/>
                        <Text style={{ fontSize: windowWidth / 100 * 7,
                                       color: '#BABABA',
                                       fontFamily: 'Roboto',
                                       fontWeight: 'bold',
                                       marginLeft: windowWidth / 100 * 5, }}>
                            Note
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: windowWidth / 100 * 2, }} 
                              onPress={() => { setPage('messages') }}>
                <View style={{ height: windowWidth / 100 * 20 }}>
                    <View style={{ flex: 1, 
                                   flexDirection: 'row', 
                                   alignItems: 'center' }}>
                        <MessageIcon width={ windowWidth / 100 * 12.5 } 
                                     height={ windowWidth / 100 * 20 }
                                     marginLeft={ windowWidth / 100 * 7 }/>
                        <Text style={{ fontSize: windowWidth / 100 * 7,
                                       color: '#BABABA',
                                       fontFamily: 'Roboto',
                                       fontWeight: 'bold',
                                       marginLeft: windowWidth / 100 * 5, }}>
                            Mesaje
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

const ProfileWindow = ({ setOpen, name, setLoggedIn, setPage }) => {
    return (
        <>
            <View style={{ position:'absolute', 
                        width:windowWidth, 
                        height:windowHeight, 
                        backgroundColor:'#272727' }}>
                <View style={{ height: windowWidth / 100 * 30 }}>
                    <View style={{ flex: 1, flexDirection:'row'}}>
                        <View style={{ width:windowWidth / 100 * 83.5, justifyContent:'center', alignItems: 'center' }}>
                            <Text style={[ styles.text ]}>
                                { name.map((_) => _ + ' ') }
                            </Text>
                        </View>
                        <XIcon height={ windowWidth / 100 * 12.5 } 
                            width={ windowWidth / 100 * 12.5 }
                            style={{
                                marginTop: windowWidth / 100 * 8.75 + 10,
                            }}
                            onPress={() => setOpen(0)}
                        />
                    </View>
                </View>
            </View>

            <Button title='Log Out'
                    onPress={ () => { LogOut(setLoggedIn, setPage) } } />
        </>
    )   
}

const LogOut = ( setLoggedIn, setPage ) => {
    SecureStore.deleteItemAsync('mail').then(SecureStore.deleteItemAsync('pass')).then(setLoggedIn(0)).then(setPage(''));
};

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
        alignItems: 'center',
    },
    img: {
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
        width: windowWidth / 100 * 67.5,
        alignItems: 'center',
    },
    window: {
        position: 'absolute',
        backgroundColor: '#272727',
        shadowColor: "#000",
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 0.7,
        shadowRadius: 9.51,
        width: windowWidth / 100 * 60,
        height: windowHeight,
    },
});

