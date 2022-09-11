import React from 'react';
import Add from '../img/add.png';
import More from '../img/more.png';
import Cam from '../img/cam.png';
import Messages from "./Messages";
import Input from "./Input";
import {ChatContext} from "../context/ChatContext";

export default function Chat() {
    const { data: { chatId, user }} = React.useContext(ChatContext);
    return (
        <div className='chat'>
            <div className="chatInfo">
                <span>{user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Add} alt="add"/>
                    <img src={More} alt="more"/>
                    <img src={Cam} alt="camera"/>
                </div>
            </div>
            <Messages/>
            <Input />
        </div>
    )
};
