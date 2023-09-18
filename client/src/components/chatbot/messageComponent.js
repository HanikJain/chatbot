import Message from "../UI/Message"
import CardComponent from "../UI/Card"
import OptionComponent from "../UI/OptionComponent.jsx"

export default function messageComponent(props) {
    const [type, message, i] = props;

    switch (type) {

        case "TEXT":
            return <Message key={i} speaks={message.speaks} data={message.msg.data} />

        case "CARD":
            return <CardComponent key={i} data={message.msg.data} />

        case "OPTION":
            return <OptionComponent key={i} data={message.msg.data} />    

        default:
            break;
    }
}
