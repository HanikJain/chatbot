import React, { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios/index';
import Cookies from "universal-cookie";
import { v4 as uuid } from 'uuid';
import messageComponent from "./messageComponent";
import "./Chatbot.css"
import styles from "./chatbot.module.css"

const cookies = new Cookies();


export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [sendRequest, setSendRequest] = useState({ request: false, text: '' });
    const scrollDiv = useRef();


    // Startup message
    useEffect(() => {
        async function df_event_query(event) {

            const res = await axios.post('/api/df_event_query', { event })


            for (let msg of res.data[0].queryResult.fulfillmentMessages) {
                msg['type'] = "TEXT";
                let says = {
                    speaks: 'ME',
                    msg: msg
                }
                setMessages(prevState => [...prevState, says]);
            }
        }

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }

        df_event_query("Welcome");

    }, [])


    // message send
    useEffect(() => {

        async function df_text_query(text) {
            let says = {
                speaks: "ME",
                msg: {
                    text: {
                        text: text
                    },
                    type: "TEXT"
                }
            };

            setMessages(prevState => [...prevState, says]);


            const response = await axios.post('/api/text_query', { text })
            const data = response.data.responses;


            if (response.data.intentExits) {
                if (data.length !== 0) {
                    let res = data[0].data;
                    let newData = ""
                    if (data[0].type === 'CARD') {
                        newData = `
                        Name: ${res.name}
                        Description: ${res.description}
                        Price: ${res.price}/-
                        Rating: ${res.rating}
                        `
                    } else {
                        newData = res.text;
                    }

                    let msg = { text: { text: newData }, type: data[0].type };
                    let says = {
                        speaks: 'BOT',
                        msg: msg
                    }

                    setMessages(prevState => [...prevState, says]);

                } else {
                    let d = { text: { text: "No course found" }, type: 'TEXT' };

                    let says = {
                        speaks: 'BOT',
                        msg: d
                    }

                    setMessages(prevState => [...prevState, says]);
                }

            }
            else {

                for (let msg of data[0].queryResult.fulfillmentMessages) {
                    let d = { text: { text: msg.text.text }, type: 'TEXT' };

                    let says = {
                        speaks: 'BOT',
                        msg: d
                    }

                    setMessages(prevState => [...prevState, says]);
                }
            }

            setSendRequest({ request: false, text: "" });

        }

        if (sendRequest.request)
            df_text_query(sendRequest.text);

    }, [sendRequest])


    // scroll to bottom when compnents updated
    useEffect(() => {
        scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])


    // Executes when user click on "Enter"
    function handleInputKeyPress(e) {
        if (e.key === 'Enter' && e.target.value !== '') {
            setSendRequest({ request: true, text: e.target.value });
            e.target.value = '';
        }

    }


    // render messages
    function renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {

                return messageComponent([message.msg.type, message, i])
            })
        } else {
            return null;
        }

    }


    return (
        <Fragment>
            <input type="checkbox" id="click" />
            <label className="label" for="click">
                <i className="fab fa-facebook-messenger"></i>
                <i className="fas fa-times"></i>
            </label>

            <div className="wrapper">
                <div className="head-text">
                    <span> Chatbot </span>
                    <input type="checkbox" id="clicked" />
                    <label for="clicked"><i className="fas fa-times"></i></label>
                </div>
                <div className="chat-box">
                    <div style={{ height: 400, width: 400 }}>
                        <div id='chatbot' style={{ height: "95%", width: "95%", overflow: "auto" }}>
                            <h2> Chatbot! </h2>

                            {renderMessages(messages)}

                            <div style={{ height: "10px", width: "99%" }} ref={scrollDiv}></div>
                            <input type="text" placeholder="Type something..." onKeyPress={handleInputKeyPress} className={styles.inputBox} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>

    );
}
