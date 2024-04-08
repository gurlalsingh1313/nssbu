import React, {useContext,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import {userContext} from '../context/userContext'

import React from 'react'

const Logout = () => {
    const {setCurrentUser} = useContext(userContext)
    const navigate = useNavigate();
    setCurrentUser(null)
    navigate('/')
  return (
    <></>
  )
}

export default Logout
