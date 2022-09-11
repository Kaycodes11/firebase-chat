import React from 'react';
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";
import {ChatContext} from "../context/ChatContext";

function Chats() {
    const {currentUser} = React.useContext(AuthContext);
    const {dispatch} = React.useContext(ChatContext);
    const [chats, setChats] = React.useState({});

    React.useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
                setChats(doc.data());
            });
            return () => unsub();
        };
        currentUser.uid && getChats();
    }, [currentUser.uid]);

    console.log('chats', JSON.stringify(Object.entries(chats)));

    const handleSelect = (user) => {
        dispatch({type: 'CHANGE_USER', payload: user});
    }

    return (
        <div className='chats'>
            {Object.entries?.(chats)?.sort((a, b) => b[1].date - a[1].date)?.map((chat) => (
                <div className="userChat" key={chat?.[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat?.[1]?.userInfo?.photoURL} alt="chat-user"/>
                    <div className="userChatInfo">
                        <span>{chat?.[1]?.userInfo?.displayName}</span>
                        <p>{chat?.[1]?.lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Chats;
