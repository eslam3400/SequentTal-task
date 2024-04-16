import React from 'react'
import './style.css'
import axios from 'axios'
import { environment } from '../../environment';

function HomePage() {
  async function getUrl() {
    const response = await axios.get(`${environment.backendV1}/auth/google`);
    console.log('response', response);
    window.location.href = response.data.data.url;
  }

  return (
    <main className='home-page'>
      <h1>Another Social App To Try!</h1>
      <button className='google-login' onClick={getUrl}>Google Login</button>
    </main>
  )
}

export default HomePage