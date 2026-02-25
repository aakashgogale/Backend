import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {user, loading, handleLogin} = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSumbit = async (e)=>{
        e.preventDefault()

        await handleLogin(username, password)
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSumbit}>
                <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username'
                 placeholder='Enter username' />
                <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password'
                 placeholder='Enter password' />
                <button className='button primary-button'>Login</button>
            </form>
            <p> Don't have an account? <Link to={'/Register'}>Create One.</Link></p>
        </div>
    </main>
  )
}

export default Login
