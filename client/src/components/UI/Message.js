import React from 'react'
import styles from './Message.module.css';
import { ChatItem, MessageBox } from 'react-chat-elements'

// RCE CSS
import 'react-chat-elements/dist/main.css';

export default function Message(props) {
    if (props.speaks === "BOT") {
        return (


            <ChatItem
                avatar={'https://cdn3.vectorstock.com/i/1000x1000/38/17/chat-bot-icon-outline-robot-sign-in-blue-circle-vector-18943817.jpg'}
                avatarFlexible={true}
                alt={'Bot'}
                title={'Chatbot'}
                subtitle={props.data.text}
                date={new Date()}
                unread={0}
                onClick={false} />

        );
    } else if (props.speaks === "ME") {
        return (
            <ChatItem
                avatar={'https://cdn3.vectorstock.com/i/1000x1000/38/17/chat-bot-icon-outline-robot-sign-in-blue-circle-vector-18943817.jpg'}
                alt={'User'}
                title={'You'}
                subtitle={props.data.text}
                date={new Date()}
                unread={0} />

        )
    } else {
        return (<p>Something went wrong</p>);
    }
}
