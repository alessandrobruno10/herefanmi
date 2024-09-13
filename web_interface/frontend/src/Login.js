import "./Login.css";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth, GoogleProvider, FacebookProvider, MicrosoftProvider, AppleProvider } from './firebase';
import axios from 'axios';
import logoIMG from './icons/HeReFanMi.png';
import googleIMG from './icons/google.png';
import microsoftIMG from './icons/microsoft.png';
import facebookIMG from './icons/facebook.png';
import appleIMG from './icons/apple.png';
import phoneIMG from './icons/telephone.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './userContext';


function Login() {

  // declaration of all our variables

  const { setUser } = useUser();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loginPage, setLoginPage ] = useState(true);  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // a use effect method to change the text after writing
  const handleEmailTextChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordTextChange =(e)=> {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordTextChange =(e)=> {
    setConfirmPassword(e.target.value);
  }

  const handleEnterpress = (e) => {
    if (e.key === 'Enter') {
      if(loginPage){
        
        verifyLogin();
        return;
      }

      verifySignup();

    }
  };

  const handlePageDisplay = ()=> {
    if (loginPage) {
      setLoginPage(false);
      return;
    }

    setLoginPage(true);
  }

  const authGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider);
      toast.success("Logged in successfully!", {
        position: "top-center"
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(error, {
        position: "top-center"
      });
    }
  }

  const authFacebook = async () => {
    try {
      await signInWithPopup(auth, FacebookProvider);
      toast.success("Logged in successfully!", {
        position: "top-center"
      });
    } catch (error) {

      if (error.message === "Firebase: Error (auth/account-exists-with-different-credential)."){
        toast.error("You already have an account signed in with that email !", {
          position: "top-center"
        });
        console.error("Error signing in with Facebook:", error); 
        return;
      }

      toast.error(error.message, {
        position: "top-center"
      });
      console.error("Error signing in with Facebook:", error); 
    }
  }

  const authMicrosoft = async () => {
    try {
      await signInWithPopup(auth, MicrosoftProvider);
      toast.success("Logged in successfully!", {
        position: "top-center"
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center"
      });
      console.error("Error signing in with Microsoft:", error); 
    }
  }

  const authApple = async () => {
    try {
      await signInWithPopup(auth, AppleProvider);
      toast.success("Logged in successfully!", {
        position: "top-center"
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center"
      });
      console.error("Error signing in with Apple:", error); 
    }
  }

  const verifyLogin = async () => {
    if (email.trim() === "") {
      toast.error("Please enter your email", {
        position: "top-center"
      });
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter your password", {
        position: "top-center"
      });
      return;
    }

    await login();
  }

  const verifySignup = async () => {
    if (email.trim() === "") {
      toast.error("Please enter your email", {
        position: "top-center"
      });
      return;
    }

    if (password.trim() === "") {
      toast.error("Please enter your password", {
        position: "top-center"
      });
      return;
    }

    if (password.length < 7) {
      toast.error("Password too short", {
        position: "top-center"
      });
      return;
    }

    if (confirmPassword.trim() === "") {
      toast.error("Please confirm your password", {
        position: "top-center"
      });
      return;
    }
  

    if (confirmPassword !== password) {
      toast.error("Passwords don't match", {
        position: "top-center"
      });
      return;
    }

    await signup();
  }

  const login = async (e) => {
    // e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email.trim(), password.trim())
    .then((userCredential) => {

      // Signed in
      const user = userCredential.user;
      console.log(user)

      setLoading(false);
      toast.success("Logged in successfully!", {
        position: "top-center"
      });
    })
    .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        toast.error(errorMessage, {
          position: "top-center"
        });
    });
   
  }

  const signup = async (e) => {
    // e.preventDefault()
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {

          // Signed in
          const user = userCredential.user;
          console.log(user);

          setLoading(false);
          toast.success("Signed up successfully!", {
            position: "top-center"
          });
      })
      .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast.error(errorMessage, {
            position: "top-center"
          });
      });
  }

  // get the current signed in user, and going to the next page
  useEffect(()=>{
    onAuthStateChanged(auth, (User) => {
        if (User) {
          // User is signed in, see docs for a list of available properties
          
          setUser(User);
          console.log(User)

          setTimeout(() => {
            nextPage();
          }, 2000);

        } else {
          // User is signed out
          console.log("user is logged out")
        }
      });
  }, [])

  const nextPage = () => {
    navigate(`/home`)
  }
 

  return (

    <div className="page-container2">

      <ToastContainer />

      <div className="inside-page-container">

        <img className="logo2" src={logoIMG} alt="Image" />
        

        { loginPage === true ? (

          <>
            <div className="input-section2">

              <p className="text">
                Email 
              </p>

              <input
                type="text"
                className="text-input2"
                placeholder="Enter you email"
                onKeyDown={handleEnterpress}
                value={email}
                onChange={handleEmailTextChange}
              /> 

              <p className="text">
                Password 
              </p>

              <input
                type="text"
                className="text-input2"
                placeholder="Enter your password"
                onKeyDown={handleEnterpress}
                value={password}
                onChange={handlePasswordTextChange}
              />    
              
              <button className="login-button" onClick={verifyLogin}>
                Login
              </button>

              {loading ? ( 
                <div className="loading-indicator"></div>
              ) : (
                <></>
              )}

              <p className="text2">
                Don't have an account ?<span class="text4" onClick={handlePageDisplay}> Sign up</span>
              </p>

            </div>

            <div className="separate-container">

              <div className="separator"/>
              <p className="text3"> OR </p>
              <div className="separator"/>

            </div>

            <div className="auth-container">
              <button className="google-button" onClick={authGoogle}>
                  <img src={googleIMG} alt="Google Logo" className="google-icon" />
              </button>

              <div className="space"/>

              <button className="google-button" onClick={()=>{}}>
                  <img src={phoneIMG} alt="Google Logo" className="fb-icon" />
              </button>

              <div className="space"/>

              <button className="google-button" onClick={authFacebook}>
                  <img src={facebookIMG} alt="Google Logo" className="fb-icon" />
              </button>

              <div className="space"/>

              <button className="google-button" onClick={authMicrosoft}>
                  <img src={microsoftIMG} alt="Google Logo" className="google-icon" />
              </button>

              <div className="space"/>

              <button className="google-button" onClick={authApple}>
                  <img src={appleIMG} alt="Google Logo" className="apple-icon" />
              </button>
            </div>
          </>

        ) : (

          <>
            <div className="input-section2">

              <p className="text">
                Email 
              </p>

              <input
                type="text"
                className="text-input2"
                placeholder="Enter you email"
                onKeyDown={handleEnterpress}
                value={email}
                onChange={handleEmailTextChange}
              /> 

              <p className="text">
                Password 
              </p>

              <input
                type="text"
                className="text-input2"
                placeholder="Enter your password"
                onKeyDown={handleEnterpress}
                value={password}
                onChange={handlePasswordTextChange}
              /> 

              <p className="text">
                Confirm Password 
              </p>

              <input
                type="text"
                className="text-input2"
                placeholder="Confirm your password"
                onKeyDown={handleEnterpress}
                value={confirmPassword}
                onChange={handleConfirmPasswordTextChange}
              />    

              <button className="login-button" onClick={verifySignup}>
                Signup
              </button>

              {loading ? ( 
                <div className="loading-indicator"></div>
              ) : (
                <></>
              )}

              <p className="text2">
                Already have an account ?<span class="text4" onClick={handlePageDisplay}> Sign in</span>
              </p>

            </div>
          </>

        ) }

      </div>

    </div>
  );
}

export default Login;
