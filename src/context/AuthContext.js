import React from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "../firebase";

export const AuthContext = React.createContext(null);

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState({});
    React.useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log("user: ", user);
        });
        return () => {
            unsub();
        };
    }, []);
    return <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>;
};
