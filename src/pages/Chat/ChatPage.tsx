import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Col, Input, Row} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

const {TextArea} = Input;

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())

        }
    }, [])


    return (
        <div>
            <Messages/>
            <AddMassageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.scrollHeight) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        }else{
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll === true) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return (
        <div style={{height: '500px', overflow: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>

        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {

    return (
        <div>
            <Avatar size="large" src={message.photo} icon={<UserOutlined/>}/> <b>{message.userName}</b>
            <br/>
            {message.message}
        </div>
    )
})

const AddMassageForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) return;
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div>
            <Row>
                <Col span={9}><TextArea placeholder={"Enter your message"}
                                        onChange={(e) => setMessage(e.currentTarget.value)}
                                        value={message}></TextArea></Col>
            </Row>
            <br/>
            <Row>
                <Col><Button disabled={status !== 'ready'} onClick={sendMessageHandler}
                             type='primary'>send</Button></Col>
            </Row>
        </div>
    )
}

export default ChatPage

