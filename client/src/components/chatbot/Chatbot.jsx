import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";

import axios from 'axios/index';
import Cookies from "universal-cookie";
import { v4 as uuid } from 'uuid';
import messageComponent from "./messageComponent";
import "./Chatbot.css"
import styles from "./chatbot.module.css"
import useHttp from "../../hooks/use-http";
import { dataActions } from "../../store/data"
import createMsgStructure from "./createMsgStructure";

const cookies = new Cookies();



export default function Chatbot() {

    const messages = useSelector((state) => state.data.messages);
    const dispatch = useDispatch();

    const [request, setRequest] = useState({ request: false, text: '' });
    const { isLoading, error, sendRequest } = useHttp();
    const scrollDiv = useRef();
    const [startTime, setStartTime] = useState();
    const [finalTime, setFinalTime] = useState();
    // console.log(startTime);

    // Startup message
    useEffect(() => {
        async function df_event_query(event) {

            const res = await axios.post('/api/df_event_query', { event })

            for (let msg of res.data.responses[0].queryResult.fulfillmentMessages) {
                const says = createMsgStructure('BOT', 'TEXT', { text: msg.text.text })
                dispatch(dataActions.setRenderMessage(says));

            }
        }

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }

        df_event_query("Welcome");
        setStartTime(Date.now());

    }, [setStartTime]);


    // message send
    useEffect(() => {

        if (request.request) {
            const text = request.text;
            const says = createMsgStructure('ME', 'TEXT', { text: text })
            dispatch(dataActions.setRenderMessage(says));

            async function requestHandler() {
                const config = {
                    url: "/api/text_query",
                    method: "POST",
                    body: {
                        text: text
                    }
                }
                const response = await sendRequest(config);

                if (response === undefined) {
                    const says = createMsgStructure('BOT', 'TEXT', { text: "Something went wrong!" })
                    dispatch(dataActions.setRenderMessage(says));
                } else {
                    const data = response.responses;
                    const intentExits = response.intentExits;

                    if (intentExits) {
                        if (data.length !== 0) {
                            for (let value of data) {
                                const says = createMsgStructure('BOT', value.type, value.data)
                                dispatch(dataActions.setRenderMessage(says));
                            }

                        } else {
                            const data = { text: "No course found" }
                            const says = createMsgStructure('BOT', 'TEXT', data)
                            dispatch(dataActions.setRenderMessage(says));
                        }

                    }
                    else {
                        for (let msg of data[0].queryResult.fulfillmentMessages) {
                            const data = { text: msg.text.text };
                            const says = createMsgStructure('BOT', 'TEXT', data)
                            dispatch(dataActions.setRenderMessage(says));
                        }
                    }
                }

                setRequest({ request: false, text: "" });

            }

            requestHandler();
        }

    }, [request, sendRequest])


    // calculate interaction time
    useEffect(() => {
        const timer = setTimeout(() => {
            let inter_time = Math.floor((Date.now() - startTime) / 1000) - 10;
            console.log(inter_time);

        }, 1000 * 10);

        return () => {
            clearTimeout(timer);
        }

    }, [request, startTime])



    // scroll to bottom when compnents updated
    useEffect(() => {
        scrollDiv.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])


    // Executes when user click on "Enter"
    function handleInputKeyPress(e) {
        if (e.key === 'Enter' && e.target.value !== '') {
            setRequest({ request: true, text: e.target.value });
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
                    {/* <input type="checkbox" id="clicked" />
                    <label for="clicked"><i className="fas fa-times"></i></label> */}
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
