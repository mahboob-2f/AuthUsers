import React, { useState } from 'react';
import { assests } from '../assets/assests';

const Login = () => {
  const [state,setState] = useState('signup');
  return (
    <div>
      <div>
        <img src={assests.logo} alt="logo" loading='lazy' />
      </div>
      <div>
        <h1>{state === 'signup' ? "Create Account" : "Login"}</h1>
        <p>{state === 'signup' ? 'Create Your Account':'Login to Your Account'}</p>
      </div>
    </div>
  );
};

export default Login;