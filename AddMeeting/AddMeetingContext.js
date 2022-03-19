import React, { useContext } from 'react'

const Context = React.createContext();

export default function AddMeetingContext({children, value}) {
    return (
        <Context.Provider value={value}>
            {
                children
            }
        </Context.Provider>
    );
}

export function useAddMeetingContext() {
    return useContext(Context);
}

