import React from 'react';
import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
    isLoggedIn: false,
    userId: null,
    userEmail: null,
};

function reducer(state, action) {
    let saveState = { ...state };

    if (action.type === 'REGISTER') {
        saveState.isLoggedIn = false;
        saveState.userId = action.payload.userId;
        saveState.userEmail = action.payload.userEmail;
        saveState.userRole = action.payload.userRole;
    }

    if (action.type === 'LOGIN') {
        saveState.isLoggedIn = true;
        saveState.userId = action.payload.userId;
        saveState.userEmail = action.payload.userEmail;
    }

    if (action.type === 'LOGOUT') {
        saveState.isLoggedIn = false;
        saveState.userId = null;
        saveState.userEmail = null;
    }
    return saveState;
}

function AppStateProvider({ children }) {
    const [appstate, dispatch] = useReducer(reducer, initialState);

    const contextObject = {
        state: appstate,
        dispatch: dispatch,
    };

    return (
        <AppContext.Provider value={contextObject}>
            {children}
        </AppContext.Provider>
    );
}

export default AppStateProvider;