import React, { Component, Fragment} from 'react';
import { render } from 'react-dom';
import axios from 'axios/index';
// import Message from './Message';
import  Message from "../Bots/Message"
import "./Chatbot.css"
class Chatbot extends Component {

    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this.state = {
            messages: []
        }
    }

    async df_text_query(text) {
        let says ={
            speaks: "ME",
            msg:{
                text: {
                    text: text
                }
            }
        };

        this.setState({messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query', {text})
      
        for (let msg of res.data[0].queryResult.fulfillmentMessages) {
            let says = {
                speaks : 'BOT',
                msg : msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

 

    async df_event_query(event) {

        const res = await axios.post('/api/df_event_query', {event})

  
    
        for (let msg of res.data[0].queryResult.fulfillmentMessages) {
           let says = {
                speaks : 'ME',
                msg : msg
            }
            this.setState({messages: [...this.state.messages, says]});
        }
    }

    componentDidMount() {
        this.df_event_query("Welcome");
    }



    renderMessages(stateMessages) {
        if(stateMessages){
            return stateMessages.map((message, i) => {
                console.log(message.msg.text.text)
                return <Message key = {i} speaks = {message.speaks} text = {message.msg.text.text}/>
            })
        } else {
            return null;
        }

    }

    _handleInputKeyPress(e){
        if(e.key === 'Enter'){
            this.df_text_query(e.target.value);
            e.target.value = '';
        }

    }

    // render() {
    //     return (
        // <div style = {{height : 400, width : 400, float: 'right'}}> 
        //     <div id = 'chatbot' style = {{height : "100%", width : "100%", overflow: "auto"}}> 
        //    <h2> Chatbot! </h2> 
        //    {this.renderMessages(this.state.messages)}
      
        //    <input type="text" onKeyPress = {this._handleInputKeyPress}/>
        //     </div>
        // </div>);
    // }

    render() {
        return (
        <Fragment>
            <input type="checkbox" id="click" />
            <label className = "label" for="click">
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
               <div style = {{height : 400, width : 400}}> 
                    <div id = 'chatbot' style = {{height : "95%", width : "95%", overflow: "auto"}}> 
                        <h2> Chatbot! </h2> 
                        {this.renderMessages(this.state.messages)}
                
                        <input type="text" onKeyPress = {this._handleInputKeyPress}/>
                    </div>
                </div>
               </div>
            </div>
         </Fragment>

        );
    }
   
}


export default  Chatbot;