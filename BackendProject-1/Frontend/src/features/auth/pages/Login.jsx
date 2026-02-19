import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import axios from 'axios'

const Login = () => {

    const [username , setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSumbit(e){
      e.preventDefault()
      axios.post("http://localhost:3000/api/auth/login",{
        username,
        password
      },{
        withCredentials: true
      })
      .then(res=>{
        console.log(res.data);
      })
    }
  return (
      <main>
        <div className="form-contrainer">
          <h1>Login</h1>
          <form onSubmit={handleSumbit}>
            <input onInput={(e)=>{setUsername(e.target.value)}} type="text" name='username' placeholder='Enter username' />
            <input onInput={(e)=>{setPassword(e.target.value)}} type="password" name='password' placeholder='Enter password' />
            <button>Login</button>
          </form>
          <p>Don't have an account? <Link className='toggleAuthFrom' to='/Register'>Register</Link></p>
        </div>
      </main>
  )
}

export default Login
