import React from 'react';
import AddAvatar from "../img/addAvatar.png";
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {uploadBytesResumable, getDownloadURL, ref} from 'firebase/storage';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db, storage} from "../firebase";
import {Link, useNavigate} from "react-router-dom";

// gohan@gmail.com Vegeta@12
const Register = () => {
    const [err, setErr] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on((error) => {
                // do something when upload failed
                setErr(true);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(result.user, {
                        displayName: name,
                        photoURL: downloadURL,
                    });
                    await setDoc(doc(db, 'users', result.user.uid), {
                        uid: result.user.uid,
                        displayName: name,
                        email,
                        photoURL: downloadURL
                    });
                    // just makes a new collection
                    await setDoc(doc(db, 'userChats', result.user.uid), {})
                    navigate('/');
                });
            });
        } catch (e) {
            setErr(true)
        }

    };

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">Lama chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder={'enter name'}/>
                    <input type="email" placeholder={'enter email'}/>
                    <input type="password" placeholder={'enter password'}/>
                    <input style={{display: "none"}} type="file" id='file'/>
                    <label htmlFor="file">
                        <img src={AddAvatar} alt={"add-avatar"}/>
                        <span>Add an Avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span>Registration is not done</span>}
                </form>
                <p>do you have an account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
