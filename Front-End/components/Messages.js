import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';

export default Messages = () => {
    const socket = io('http://192.168.1.189:3000');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    socket.on('chat message', msg => {
        setMessages([...messages, msg]);
    });

    const sendText = () => {
        socket.emit('chat message', message);
        setMessage('');
        console.log('test');
    }

    const chat = messages.map(msg => (
        <Text style={{borderWidth: 2, top: 500}}>{msg}</Text>
    ));

    return (
        <View>
            {chat}
            <TextInput style={{height: 40, borderWidth: 2}} 
                       onSubmit={() => sendText()}
                       onChangeText={ msg => setMessage(msg) }/> 
        </View>
    );
}

const styles = StyleSheet.create({

});