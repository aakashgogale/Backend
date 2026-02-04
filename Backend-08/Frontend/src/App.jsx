import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {

  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios.get("https://notesbackend-c0jb0zpz9-aakahs-gogales-projects.vercel.app/api/notes")
    .then(res => {
      const data = res.data;
      setNotes(Array.isArray(data) ? data : data.notes);
    })
    .catch(err => console.log(err));
  }

  useEffect(()=>{
    fetchNotes()
  }, [])

  function handleSubmit(e){
    e.preventDefault()

    const {title, description} = e.target.elements

    console.log(title.value,description.value);

    axios.post("https://notesbackend-c0jb0zpz9-aakahs-gogales-projects.vercel.app/api/notes",{
      title:title.value,
      description:description.value
    })
    .then(res=>{
      console.log(res.data);
      
      fetchNotes()
    })
    
  }

  function handleDelete(noteId){
    axios.delete("https://notesbackend-c0jb0zpz9-aakahs-gogales-projects.vercel.app/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data)
      fetchNotes()
    })
  }


  
  return (
    <>
      <form className='input-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' />
        <input name='description' type="text" placeholder='Enter description' />
        <button className='btn'>Create Note</button>
      </form>

    <div className="notes">
      {
        notes.map(note =>{
        return <div className="note" key={note._id}>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <button className='DeleteBtn' onClick={()=>{handleDelete(note._id)}}>Delete</button>
        </div>
        })
      }
    </div>
    </>
  )
}

export default App
