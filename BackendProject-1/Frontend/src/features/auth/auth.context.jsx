
import {createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const {user, setUser} = useState(null)
    const {loading, setLoading} = useState(null)

    return (
        <AuthContext.Provider  value={(user, setUser, loading, setLoading)}> 
            {children}
        </AuthContext.Provider>
    )
}
// auth.Context -> ye user ke data ko store kr rhii he 
// SARE STATE KO MANAGE KRTE HE STATE FILE ME /-> like as a storage data ko store krti he