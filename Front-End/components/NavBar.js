import React, { useState } from 'react';
import { StyleSheet, 
        View,
        Dimensions,
        Text,
        TouchableOpacity } from 'react-native';
        
import OptionsIcon from '../imgs/OptionsIcon';
import HumanIcon from '../imgs/HumanIcon';
import XIcon from '../imgs/XIcon';
import EvolutionIcon from '../imgs/EvolutionIcon';
import GradeIcon from '../imgs/GradeIcon';
import MessageIcon from '../imgs/MessageIcon'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default NavBar = (props) => {

    const [open, setOpen] = useState(0);

    return (
        <View style={{ position: 'absolute' }}>
            <View style={styles.container}>
                <OptionsIcon style={styles.img} 
                             width={ windowWidth / 100 * 12.5 } 
                             onPress={() => setOpen(!open)}/>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        {props.text}
                    </Text>
                </View>

                <HumanIcon style={[styles.img]} 
                           width={ windowWidth / 100 * 10 }/>
            </View>
            { open == 1 ? 
                    <SlideWindow open={ open } 
                                 setOpen={ setOpen } 
                                 setPage={ props.setPage }/> 
                    : <></> }
        </View>
    )
}

const SlideWindow = ({ open, setOpen, setPage }) => {
    const [test, setTest] = useState(0);

    return (
        <View style={styles.window}>
            <XIcon 
                height={windowWidth / 100 * 12.5} 
                width={windowWidth / 100 * 12.5}
                style={{
                    marginLeft: windowWidth / 100 * 5,
                    marginTop: windowWidth / 100 * 8.75 + 10,
                }}
                onPress={() => setOpen(!open)}
            />

            {/* Student Buttons */}
            <TouchableOpacity style={{ marginTop: windowWidth / 100 * 10, }} 
                              onPress={() => { setPage('/evolution') }}>
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
                              onPress={() => { setPage('/grades') }}>
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
                              onPress={() => { setPage('/messages') }}>
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

