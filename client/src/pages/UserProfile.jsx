import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";


const UserProfile = () => {
  const [avatar,setAvatar] = useState('Write Avatar here')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [currPassword,setcurrPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmNewPass,setConfirmNewPass] = useState('')
  return (
    <div>
      <section className='profile'>
        <div className='container profile_container'>
          <Link to={'/myposts/sdfdf'} className='btn'>My Posts</Link>

          <div className='profile_details'>
            <div className='avatar_wrapper'>
              <div className="profile_avatar">
                <img src="" alt="Avatar" />
              </div>
              <form className='avatar_form'>
                <input type="file" name='avatar' accept='png,jpg,jpeg' id='avatar' onChange={e => setAvatar(e.target.files[0])}/>
                <label htmlFor="avatar"><FaEdit /></label>
              </form>
              <button className='profile_avatar-btn'><FaCheck /></button>
            </div>
            <h1>Ernest Achiever</h1>
            <form className='form profile_form'>
              <p className="form_error_message">This is an error message</p>
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="text" placeholder='Current Password' value={currPassword} onChange={e => setcurrPassword(e.target.value)}/>
            <input type="text" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="text" placeholder='Confirm New Password' value={confirmNewPass} onChange={e => setConfirmNewPass(e.target.value)}/>
            <button type='submit' className='btn primary'>Update Details</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserProfile
