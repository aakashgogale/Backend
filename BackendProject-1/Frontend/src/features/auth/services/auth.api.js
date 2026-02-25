
import axios from 'axios';

const api = axios.create({
    baseUrl : 'http://localhost:3000/api/auth',
    withCredentials: true,
})

export async function login(username, password) {
        const respone = await api.post("/login", {
            username, password
        })
        return respone.data
    }

export async function register(username, email, password) {
    const respone = await api.post("/register",{
        username,
        email,
        password
    })

    return respone.data
}    

export async function getMe() {
    const respone = await api.get("/get-me")

    return respone.data
}


// well ye auth.api.js intreact krti he backend APIs se
// like kese backend se intreact krna he uska code yaha likha he 

