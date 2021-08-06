import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    StyleSheet,
    BackHandler,
    Dimensions,
    ScrollView,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';
import NavBar from './NavBar'
import axios from 'react-native-axios';
import { GiftedChat } from 'react-native-gifted-chat';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default Chat = (props) => {
    const [chats, setChats] = useState([]);
    const [open, setOpen] = useState(0);
    const [openChat, setOpenChat] = useState();
    const [messages, setMessages] = useState();

    useEffect(() => {
        axios.post('http://192.168.1.189:3000/getChats', {
            id: props.userData.id,
        })
            .then((res) => {
                let tmp = res.data;
                tmp.sort((chat1, chat2) => {
                    if (chat1.messages.length != 0 && chat2.messages.length != 0)
                        return chat1.messages[chat1.messages.length - 1].createdAt
                            < chat2.messages[chat2.messages.length - 1].createdAt;
                    return 0;
                });
                setChats(tmp);
            })
            .catch((err) => {
                console.error(err)
            })

        this.socket = io('http://192.168.1.189:8080');

        this.socket.on('get id', () => {
            this.socket.emit('get id', props.userData.id);
        });

    }, []);

    if (this.socket) {
        this.socket.on('message', (msg) => {
            let tmp = chats;
            tmp.forEach(chat => {
                if (chat.id == msg.chatId) {
                    if (chat.messages.length == 0)
                        chat.messages = GiftedChat.append(chat.messages, msg.message)
                    else if (chat.messages[0]._id != msg.message[0]._id)
                        chat.messages = GiftedChat.append(chat.messages, msg.message)
                }
                if (openChat) {
                    if (openChat.id == chat.id) {
                        setOpenChat(chat);
                        setMessages(chat.messages);
                    }
                }
            })
            tmp.sort((chat1, chat2) => {
                if (chat1.messages.length != 0 && chat2.messages.length != 0)
                    return chat1.messages[chat1.messages.length - 1].createdAt
                        < chat2.messages[chat2.messages.length - 1].createdAt;
                return 0;
            });
            setChats(tmp);
        });

    }

    const onSend = (msg = []) => {
        this.socket.emit('message', { message: msg, chatId: openChat.id });
    }

    return (
        <View style={{ backgroundColor: '#202020', height: windowHeight }}>
            <View style={{ height: windowWidth / 100 * 30, width: windowWidth }} />

            <ScrollView style={{}}>
                {chats.map((chat) => {
                    return (
                        <ChatCard setMessages={setMessages} setOpen={setOpen} setOpenChat={setOpenChat} key={chat.id} chat={chat} />
                    )
                })}
            </ScrollView>

            <NavBar text={'Mesaje'}
                setPage={props.setPage}
                userData={props.userData}
                setUserData={props.setUserData}
                setLoggedIn={props.setLoggedIn} />

            {open ? <>
                <View style={{
                    position: 'absolute',
                    width: windowWidth,
                    height: windowHeight,
                    backgroundColor: '#272727'
                }}>
                    <View style={{ height: windowWidth / 100 * 30 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: windowWidth / 100 * 83.5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.text}>
                                    {openChat.name.map(n => n + ' ')}
                                </Text>
                            </View>
                            <XIcon height={windowWidth / 100 * 12.5}
                                width={windowWidth / 100 * 12.5}
                                style={{
                                    marginTop: windowWidth / 100 * 8.75 + 10,
                                }}
                                onPress={() => { setOpen(0) }}
                            />
                        </View>
                    </View>

                    <GiftedChat
                        messages={messages}
                        onSend={msg => onSend(msg)}
                        user={{
                            _id: props.userData.id,
                            name: props.userData.name
                        }}
                        renderAvatar={null}
                    />
                </View>
            </>
                : <></>}

        </View>
    )
}

const ChatCard = ({ chat, setOpen, setOpenChat, setMessages }) => {

    const pressed = () => {
        setOpen(1);
        setOpenChat(chat);
        setMessages(chat.messages)
    }

    return (
        <TouchableHighlight style={styles.chatCard} onPress={pressed}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: (chat.imgUrl ? chat.imgUrl : 'https://reactnative.dev/img/tiny_logo.png'),
                    }}
                />
                <View style={{ width: windowWidth / 100 * 72.5, marginLeft: windowWidth / 100 * 2.5, height: windowWidth / 100 * 30, justifyContent: 'center' }}>
                    <Text style={styles.bigText}>
                        {chat.name.map((n) => { return (n + ' ') })}
                    </Text>
                    {chat.messages.length > 0 ?
                        <Text style={styles.messageText}>
                            {chat.messages[0].user.name[0] + ': ' + chat.messages[0].text}
                        </Text>
                        : <></>}
                </View>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    chatCard: {
        height: windowWidth / 100 * 30,
        width: windowWidth,
    },
    tinyLogo: {
        height: windowWidth / 100 * 22.5,
        width: windowWidth / 100 * 22.5,
        borderRadius: windowWidth / 100 * 22.5,
        marginLeft: windowWidth / 100 * 2.5,
    },
    bigText: {
        color: '#BABABA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: windowWidth / 100 * 6,
        marginBottom: windowWidth / 100 * 2.5,
    },
    messageText: {
        color: '#666666',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: windowWidth / 100 * 5,
    },
    text: {
        top: 10,
        fontSize: windowWidth / 100 * 8,
        color: '#BABABA',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
});
