import React from 'react';
import {collection, updateDoc, query, getDoc, doc, where, serverTimestamp, getDocs, setDoc} from 'firebase/firestore';
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";

function Search() {
    const {currentUser} = React.useContext(AuthContext);
    const [username, setUsername] = React.useState("");
    const [user, setUser] = React.useState(null);
    const [err, setErr] = React.useState(false);

    const handleSearch = async () => {
        // preparing query
        const q = query(collection(db, 'users'), where('displayName', '==', username));
        try {
            // executing query
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                setUser(doc.data());
            });
        } catch (e) {
            setErr(true);
        }
    };

    const handleKeydown = (e) => {
        e.code === 'Enter' && handleSearch()
    };

    const handleSelect = async () => {
        // check whether the group(chats within the firestore) exists, if not then create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const result = await getDoc(doc(db, 'chats', combinedId));
            if (!result.exists()) {
                console.log("has", !result.exists());
                // then make a chat within 'chats' collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                // create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        } catch (e) {
            // setErr(true)
        }
        setUser(null);
        setUsername('');
    }

    return (
        <div className='search'>
            <div className="searchForm">
                <input value={username} type="text" placeholder='Search user' onKeyDown={handleKeydown}
                       onChange={e => setUsername(e.target.value)}/>
            </div>
            {err && <span>User is not found</span>}
            {user &&
                <div className="userChat" onClick={handleSelect}>
                    <img src={user.photoURL} alt="chat-user"/>
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
            }
        </div>
    );
}


export default Search;
