import React, { useState } from 'react';
import axios from 'react-native-axios';
import { ip, mainColor, secondColor, thirdColor } from '../Variable'; 
import { ScrollView,
        View, 
        StyleSheet, 
        Text, 
        Dimensions, 
        TextInput, 
        TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}
        

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default Register = (props) => {

    const [res, setRes] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const [key, setKey] = useState('');

    const validatemail = (mail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(mail);
    }

    const register = () => {
        if(!validatemail(mail)) {
            setRes('mail-ul nu este valid')
            return;
        }
        if(pass.length < 7) {
            setRes('parola trebuie sa aiba cel putin 8 caractere');
            return;
        }
        axios.post(ip + '/register', {
            mail: mail,
            pass: pass,
            id: key,
        })
        .then((res) => {
            setRes(res.data);
            if(res.data == 'succes') {
                save('mail', mail);
                save('pass', pass);
                props.setUserData({ mail: mail, pass: pass });
            }
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

            {res != '' ? 
                <View style={styles.flexContainer}>
                    <Text style={styles.response}> 
                        {res} 
                    </Text>
                </View> 
                        : <></>}

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
        color: secondColor,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: (windowWidth / 10),
        marginTop: (windowWidth / 5),
        marginLeft: (windowWidth / 100 * 5),
    },
    text2: {
        fontSize: (windowWidth / 20),
        padding: 13,
        color: mainColor,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
    button2: {
        backgroundColor: secondColor,
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
        borderColor: secondColor,
        padding: 20,
        color: secondColor,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: (windowWidth / 22),
    },
    response: {
        color: 'red',
    },
    flexContainer: {
        flex: 1, 
        alignItems: 'center',
    }
});
