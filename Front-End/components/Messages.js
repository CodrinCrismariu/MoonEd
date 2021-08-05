import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';
import { GiftedChat } from 'react-native-gifted-chat';

const socket = io('http://192.168.1.189:8080');
export default Messages = ({ userData, chatId }) => {
    const [messages, setMessages] = useState([]);
    const onSend = useCallback((msg = []) => {
        socket.emit('message', { message: msg, chatId: '0' });
    }, [])

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg.message));
        });
        socket.on('get id', () => {
            socket.emit('get id', userData.id);
        });
    }, [])

    return (
      <GiftedChat
        messages={messages}
        onSend={msg => onSend(msg)}
        user={{
          _id: userData.id,
          name: userData.name
        }}
        renderAvatar={null}
      />
    )
}

const styles = StyleSheet.create({

});
