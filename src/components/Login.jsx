import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  const handleSignIn = () => {
    console.log('hello world');
    // localStorage.setItem('user', JSON.stringify(response.profileObj));
    // const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: '1234',
      _type: 'user',
      username: 'admin',
      image: '',
    };
    localStorage.setItem('user', JSON.stringify(doc));

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
            <div className="shadow-2xl" onClick={() => handleSignIn()}>
              <button onClick={handleSignIn}>SIGN IN</button>
              <GoogleLogin
                clientId=""
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with Google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
