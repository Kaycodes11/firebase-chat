import React from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import {ChatContext} from "../context/ChatContext";
import {AuthContext} from "../context/AuthContext";
import {doc, serverTimestamp, arrayUnion, Timestamp, updateDoc} from "firebase/firestore";
import {db, storage} from "../firebase";
import {nanoid} from "nanoid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";

function Input() {
    const [text, setText] = React.useState("");
    const [img, setImg] = React.useState(null);
    const {currentUser} = React.useContext(AuthContext);
    const {data} = React.useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, nanoid());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: nanoid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: nanoid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        // this will make lastMessage and date properties within the mentioned document below

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <img src={Attach} alt="" />
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Input;
