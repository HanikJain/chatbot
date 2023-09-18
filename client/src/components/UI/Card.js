import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Card.module.css'
import { ChatItem } from 'react-chat-elements'


export default function CardComponent(props) {
    const data = props.data;
 
    return (
        <div className={styles.cardContainer}>
            <Card style={{width: '100%', height: '100%', padding: '8px'}}>
                <Card.Body>
                    <Card.Title style={{marginBottom: '16px', fontSize: '1.2rem'}}>
                        {data.name.length <= 40 ? data.name: (data.name.slice(0, 41) + '...')}
                    </Card.Title>

                    <Card.Text style={{marginBottom: '16px', fontSize: '0.7rem'}}>

                    {data.description.length <= 60 ? data.description: (data.description.slice(0, 110) + '...')}
                    </Card.Text>

                    <Button variant="primary" style={{marginBottom: '16px', fontSize: '0.7rem'}}> <span>&#8377;</span> {data.price}/-</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
