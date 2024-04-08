import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreatePosts = () => {
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('Uncategorized');
  const [description,setDescription] = useState('');
  const [thumbnail,setThumbnail] = useState('');

  const POST_CATEGORIES = ["Social Events","Fun Events"]

  return (
    <div>
      <section className='create-post'>
        <div className='container'>
          <p className='form_error-message'>
            This is an error message
          </p>
          <form className='form create-post_form'>
            <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} autoFocus/>
            <select name="category" value={category} onChange={e=>setCategory(e.target.value)}>
              {
                POST_CATEGORIES.map(cat=><option key={cat}>{cat}</option>)
              }
            </select>
            <ReactQuill value={description} onChange={setDescription} />
              <input type="file" onChange={e=>setThumbnail(e.target.value[0])} accept='png,jpg,jpeg'/>
              <button className='btn primary' type='submit'>Create</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CreatePosts
