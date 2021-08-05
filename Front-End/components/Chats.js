import React, { useEffect, useState } from 'react';
import { View, 
         StyleSheet, 
         BackHandler, 
         Dimensions,
         ScrollView,
         Image,
         Text } from 'react-native';
import NavBar from './NavBar'
import axios from 'react-native-axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default Chat = (props) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        axios.post('http://192.168.1.189:3000/getChats', {
            id: props.userData.id,
        })
        .then((res) => {
            let tmp = res.data;
            tmp.sort((chat1, chat2) => {
                return chat1.messages[chat1.messages.length - 1].createdAt 
                        > chat2.messages[chat2.messages.length - 1].createdAt;
            });
            setChats(tmp);
        })
        .catch((err) => {
            console.error(err)
        })
    }, []);

    return(
        <View style={{ backgroundColor: '#202020', height: windowHeight }}>
            <View style={{ height: windowWidth / 100 * 30, width: windowWidth }}/>

            <ScrollView style={{ }}>
                { chats.map((chat) => {
                    return(
                        <ChatCard key={ chat.id } chat={ chat } />
                    )
                }) }
            </ScrollView>

            <NavBar text={ 'Mesaje' } 
                    setPage={ props.setPage } 
                    userData={ props.userData }
                    setUserData={ props.setUserData }
                    setLoggedIn={ props.setLoggedIn }/>
        </View>
    )
}

const ChatCard = ({ chat }) => {
    return (
        <View style={ styles.chatCard }>
            <View style={{ flex:1, flexDirection:'row', alignItems: 'center' }}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                    uri: (chat.imgUrl ? chat.imgUrl : 'https://reactnative.dev/img/tiny_logo.png'),
                    }}
                />
                <View style={{ width: windowWidth / 100 * 72.5, marginLeft: windowWidth / 100 * 2.5, height: windowWidth / 100 * 30, justifyContent: 'center' }}>
                    <Text style={ styles.bigText }>
                        { chat.name.map((n) => {return(n + ' ')}) } 
                    </Text>
                    <Text style={ styles.messageText }>
                        { chat.messages[chat.messages.length - 1].user.name.split(' ')[0] + ': ' + chat.messages[chat.messages.length - 1].text } 
                    </Text>
                </View>

            </View>
        </View>
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
    }
});
