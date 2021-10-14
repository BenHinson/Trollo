import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'


export default function AccountPopup({accountLogin, setAccountLogin, setDisplayModal}) {
    return (
      <div className='accountPopup'>

        <i className='closePopup' onClick={() => setDisplayModal(false)}>✕</i>

        <h2>{accountLogin ? 'Sign into your Trollo Account' : 'Create your Trollo Account'}</h2>
    
        {accountLogin
          ? <Login setAccountLogin={setAccountLogin} setDisplayModal={setDisplayModal}></Login>
          : <SignUp setAccountLogin={setAccountLogin}></SignUp>
        }        
      </div>
    )
}