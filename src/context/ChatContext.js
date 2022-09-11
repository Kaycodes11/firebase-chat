import React from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "../firebase";
import {AuthContext} from "./AuthContext";

export const ChatContext = React.createContext(null);


export const ChatContextProvider = ({children}) => {
    const {currentUser} = React.useContext(AuthContext);
    const INITIAL_STATE = {chatId: "null", user: {}};
    const chatReducer = (state , action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                };
            default:
                return state;
        }
    };

    // noinspection JSCheckFunctionSignatures
    const [state, dispatch] = React.useReducer(chatReducer, INITIAL_STATE);


    return <ChatContext.Provider value={{data: state, dispatch}}>{children}</ChatContext.Provider>;
};
