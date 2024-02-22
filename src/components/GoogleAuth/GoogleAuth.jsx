import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

import styles from './GoogleAuth.module.css';

const GoogleAuth = () => {
  const [click, setClick] = useState(false);
  const [userName, setUserName] = useState('');

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await new Promise((resolve) => {
          const xhr = new XMLHttpRequest();

          xhr.open('GET', `https://www.googleapis.com/oauth2/v3/userinfo`);
          xhr.setRequestHeader(
            'Authorization',
            `Bearer ${response.access_token}`
          );
          xhr.onload = function () {
            if (this.status >= 200 && this.status < 300)
              resolve(JSON.parse(this.responseText));
            else resolve({ err: '404' });
          };
          xhr.send();
        });
        setUserName(res?.name);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const clickAuthHandler = () => {
    login();
    setClick(true);
  };

  const clickSingOutHandler = () => {
    setClick(false);
    setUserName('');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authInfo}>
        <p>{userName}</p>
        {click && !!userName ? (
          <button onClick={clickSingOutHandler}>Sing out</button>
        ) : (
          <button onClick={clickAuthHandler}>
            Sing in <FcGoogle className={styles.googleIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleAuth;
