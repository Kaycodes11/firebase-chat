import React from 'react';
import {signOut} from 'firebase/auth'
import {auth} from "../firebase";
import {AuthContext} from "../context/AuthContext";

function Navbar() {
    const {currentUser} = React.useContext(AuthContext)
    return (
        <div className='navbar'>
            <span className="logo">Lama chat</span>
            <div className="user">
                {/*<img src="https://bit.ly/3D47vQy" alt="nav-icon"/>*/}
                <img src={currentUser.photoURL} alt="nav-icon"/>
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>logout</button>
            </div>
        </div>
    )
}

export default Navbar;
