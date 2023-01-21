import Message from "../UI/Message"
import Card from "../UI/Card"

export default function messageComponent(props) {
    const [type, message, i] = props;

    switch (type) {

        case "TEXT":
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />

        case "CARD":
            return <Card key={i} text={message.msg.text.text} />

        default:
            break;
    }
}
