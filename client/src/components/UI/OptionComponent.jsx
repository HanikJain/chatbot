import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";

import Button from 'react-bootstrap/Button';
import { ChatItem } from 'react-chat-elements'
import Card from 'react-bootstrap/Card';
import styles from './OptionComponent.module.css';

import useHttp from "../../hooks/use-http";
import { dataActions } from "../../store/data"
import createMsgStructure from "../chatbot/createMsgStructure";


export default function OptionComponent(props) {
    const dispatch = useDispatch();
    const [request, setRequest] = useState({ request: false, id: '', text: '' });
    const { isLoading, error, sendRequest } = useHttp();


    const data = props.data;
    const optionList = [];

    function clickHandler(e) {
        e.preventDefault();
        const id = e.target.id;
        const value = e.target.value;
        setRequest({ request: true, id: id, text: value });

    }

    useEffect(() => {
        console.log(request)
        if (request.request) {
            const text = request.text;
            const id = request.id;
            const says = createMsgStructure('ME', 'TEXT', { text: text })
            console.log(says);
            dispatch(dataActions.setRenderMessage(says));

            async function requestHandler() {
                const config = {
                    url: "/api/options",
                    method: "POST",
                    body: {
                        id: id,
                        title: `Following service under ${text}`,
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
                            const data = { text: "No service found" }
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

                setRequest({ request: false, id: "", text: "" });


            }

            requestHandler()
        }



    }, [request, sendRequest])

    const modifyOption = () => {

        for (let i = 1; i <= data.count; i++) {
            const d = {
                text: data[i].text,
                id: data[i].id,
                sr_no: data[i].sr_no,

            }

            optionList.push(d);
        }

        return optionList;
    }

    const renderOption = (data) => {
        return (
            <Fragment >
                <Button
                    variant="outline-primary"
                    onClick={clickHandler}
                    id={data.id}
                    key={data.id}
                    value={data.text}
                >
                    {data.text}
                </Button>
            </Fragment >
        );
    }

    modifyOption();

    return (
        <div>
            <ChatItem
                avatar={'https://cdn3.vectorstock.com/i/1000x1000/38/17/chat-bot-icon-outline-robot-sign-in-blue-circle-vector-18943817.jpg'}
                avatarFlexible={true}
                alt={'Bot'}
                title={'Chatbot'}
                subtitle={data.title}
                date={new Date()}
                unread={0}
                onClick={false} />
            <br />

            <div className={styles.optionList}>
                {optionList.map(renderOption)}
            </div>
        </div>
    )
}
