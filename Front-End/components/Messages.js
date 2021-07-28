import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';
import { GiftedChat } from 'react-native-gifted-chat';

const socket = io('http://192.168.1.189:8080');
export default Messages = () => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState('');
    const onSend = useCallback((msg = []) => {
        socket.emit('message', msg);
    }, [])

    useEffect(() => {
        socket.emit('get-id');
        socket.on('get-id', (id) => {
            setUserId(id);
        });
        socket.on('message', (msg) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
        });
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={msg => onSend(msg)}
        user={{
          _id: userId,
        }}
        renderAvatar={null}
      />
    )
}

const styles = StyleSheet.create({

});