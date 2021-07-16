import React from 'react';
import { StyleSheet, 
        Text,
        View, 
        Dimensions, 
        TouchableOpacity } from 'react-native';
import Canvas from 'react-native-canvas';
import { Redirect } from 'react-router-native'

export default HomePage = (props) => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    let k = 0;
    let handleCanvas = (canvas) => {
        if(k++)
            return;
        canvas.width = windowWidth;
        canvas.height = windowHeight;

        const ctx = canvas.getContext('2d');
        ctx.lineWidth = windowWidth / 1.3;
        ctx.strokeStyle = "#BABABA";
        animate(ctx);
    };

    let pos = windowWidth * 2;
    const animate = (ctx) => {
        pos -= 4;
        ctx.beginPath();
        ctx.arc(pos, windowHeight, windowWidth / 2, 0, 2 * Math.PI);
        ctx.stroke();
        if(pos > windowWidth * 1.2)
            requestAnimationFrame(() => animate(ctx));
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button1} onPress={() => props.setPage('login')}>
                <Text style={styles.text1}> 
                    Autentificare 
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => props.setPage('register')}>
                <Text style={styles.text2}> 
                    Creează cont
                </Text>
            </TouchableOpacity>

            <Canvas style={styles.canvas} 
                    ref={handleCanvas}/>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    button1: {
        borderColor: '#BABABA',
        borderWidth: 3,
        width: '55%',
        marginTop: '40%',
        alignItems: 'center',
    },
    button2: {
        backgroundColor: '#BABABA',
        width: '55%',
        marginTop: '10%',
        alignItems: 'center',
    },
    text1: {
        fontSize: 16,
        padding: 13,
        color: '#BABABA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    text2: {
        fontSize: 16,
        padding: 13,
        color: '#272727',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    canvas: {
        position: 'absolute',
        zIndex: -1,
        elevation: -1,
    },
});
