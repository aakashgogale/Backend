import React, { useState } from 'react'



const App = () => {

  const [contact, setContact] = useState([
    {
      name: "Aakash",
      email: "aakash@gmail.com",
      phone: 626174872
    }
  ])

  return (
    <>
     <div className="form">
     <form className='form-card'>
       <input className='input' name='name' type="text" placeholder='Enter name' />
       <input className='input' name='email' type="text" placeholder='Enter email'/>
       <input className='input' name='phone' type="text" placeholder='Enter number'/>
     </form>
     <button>Create</button>
   </div>

    <div>
      <div className="main-contact">
        <div className="contact-card">
          <h1>name {contact.name}</h1>
          <p>email</p>
          <p>phone</p>
        </div>
      </div>
    </div>
  </>  
  )
}

export default App
