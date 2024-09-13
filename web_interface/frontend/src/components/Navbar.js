import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";

function NavBar() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // whenever the width of the screen changes, we change the variable wich make us able to change the drop down from top left absolute parent to our page-container flex under the input text  
    useEffect(() => {
        const handleResize = () => {
        setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navigate = useNavigate();
    const nextPage = (page) => {
        navigate(`/${page}`)
    }
       
    return (
        <>
            { windowWidth > 900 ? (
                <>
                    <nav className="nav">

                        <p className="navText2">
                            HeReFanMi<p className="dot">.</p> 
                        </p>
                    

                        <ul className="navbar">
                            <li><a className="navText" style={{textDecoration:'none'}} href="#home">Home</a></li>
                            <li><a className="navText" style={{textDecoration:'none'}} href="#role">Role</a></li>
                            <li><a className="navText" style={{textDecoration:'none'}} href="#team">Team</a></li>
                            <li><a className="navText" style={{textDecoration:'none'}} href="#features">Features</a></li>
                            <li><a className="navText" style={{textDecoration:'none'}} href="#ngi">NGI</a></li>
                            <li><a className="navText" style={{textDecoration:'none'}} href="#faq">FAQ</a></li>
                        </ul>

                        <div className="space"/>

                        <button className="signin-button" onClick={ ()=> nextPage("login")}>
                            Register
                        </button>

                        <button className="register-button" onClick={ ()=> nextPage("login")}>
                            Sign in
                        </button>

                    </nav>
                </>
            ) : (
                <>
                    <nav className="nav">

                        <p className="navText2">
                            HeReFanMi<p className="dot">.</p> 
                        </p>

                        <div className="space"/>

                        { windowWidth > 320 ? (
                            <button className="signin-button" onClick={ ()=> nextPage("login")}>
                                Register 
                            </button>
                        ) : (
                            <>
                            </>
                        )}

                        <button className="register-button" onClick={ ()=> nextPage("login")}>
                            Signin
                        </button>

                    </nav>

                    <ul className="navbar">
                        <li><a className="navText" style={{textDecoration:'none'}} href="#home">Home</a></li>
                        <li><a className="navText" style={{textDecoration:'none'}} href="#role">Role</a></li>
                        <li><a className="navText" style={{textDecoration:'none'}} href="#team">Team</a></li>
                        <li><a className="navText" style={{textDecoration:'none'}} href="#features">Features</a></li>
                        <li><a className="navText" style={{textDecoration:'none'}} href="#ngi">NGI</a></li>
                        <li><a className="navText" style={{textDecoration:'none'}} href="#faq">FAQ</a></li>
                    </ul>
                </>
            )
            }
        </>
    )
}

export default NavBar;