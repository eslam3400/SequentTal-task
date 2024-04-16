import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { environment } from '../../environment';
import './style.css';

function GoogleAuthPage() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      axios.get(`${environment.backendV1}/auth/google/callback?code=${code}`)
        .then(response => {
          localStorage.setItem("token", response.data.data.token);
          window.location.href = '/posts';
        })
        .catch(error => {
          setError(error);
          console.error(error);
        });
    }
  }, []);

  return (
    <main className='google-auth-page'>
      {
        error ? <div>{error}</div> : <div>loading.....</div>
      }
    </main>
  );
}

export default GoogleAuthPage