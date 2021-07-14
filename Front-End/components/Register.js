import React, { useState } from 'react';
import axios from 'react-native-axios';
import { ScrollView, 
        StyleSheet, 
        Text, 
        Dimensions, 
        TextInput, 
        TouchableOpacity } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default Register = (props) => {

    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [key, setKey] = useState('');

    const register = () => {
        axios.post('http://192.168.1.189:3000/register', {
            mail: mail,
            pass: pass,
            id: key,
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
    };

    return (
        <ScrollView>

            <Text style={styles.text}> Creează cont </Text>
            <TextInput style={styles.textinput}
                       placeholderTextColor={'#757575'} 
                       placeholder="exemplu@gmail.com"
                       keyboardType="default"
                       onChangeText={setMail}/>
            <TextInput style={styles.textinput}
                       secureTextEntry={true}
                       placeholderTextColor={'#757575'} 
                       placeholder="••••••••••••"
                       keyboardType="default"
                       onChangeText={setPass}/>

            <Text style={[styles.text, {
                  marginTop:(windowWidth * 0.1), 
                  width:windowWidth * 0.9}]}>
                Cheie de înregistrare
            </Text>
            <TextInput style={styles.textinput}
                       placeholderTextColor={'#757575'} 
                       placeholder="A1G7DBF7"
                       keyboardType="default"
                       onChangeText={setKey}/>

            <TouchableOpacity style={styles.button2} onPress={register}>
                <Text style={styles.text2}> 
                    Continuă
                </Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    text: {
        color: '#BABABA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: (windowWidth / 10),
        marginTop: (windowWidth / 5),
        marginLeft: (windowWidth / 100 * 5),
    },
    text2: {
        fontSize: (windowWidth / 20),
        padding: 13,
        color: '#272727',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    button2: {
        backgroundColor: '#BABABA',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: (windowWidth / 100 * 5),
        marginTop: (windowWidth / 100 * 10),
        width: (windowWidth / 100 * 90),
        height: (windowWidth / 100 * 18),
    },
    textinput: {
        marginLeft: (windowWidth / 100 * 5),
        marginTop: (windowWidth / 100 * 10),
        width: (windowWidth / 100 * 90),
        height: (windowWidth / 100 * 18),
        justifyContent: 'center',
        borderWidth: 3,
        borderRadius: 3,
        borderColor: '#BABABA',
        padding: 20,
        color: '#BABABA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: (windowWidth / 22),
    },
});
