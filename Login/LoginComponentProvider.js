import React, {useContext} from 'react'


const LoginComponent = React.createContext();


export default function LoginComponentProvider({children, value}) {
    
    return (
        <LoginComponent.Provider value={value}>
            {
                children
            }
        </LoginComponent.Provider>
    );

}

export function useLoginComponentContext() {
    return useContext(LoginComponent);
}