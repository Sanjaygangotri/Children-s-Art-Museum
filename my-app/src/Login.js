import React, { useState } from 'react';
import { FaCircleXmark } from "react-icons/fa6";
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isSignup, setSignup] = useState(false);
    const [pass, setpass] = useState(false);

    const [SignupForm, setSignupForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        school: "",
        refName: "",
        refEmail: "",
        schoolMedia: "",
        acceptTerms: false,
        acceptPolicy: false,
    });

    const [ForgoEmail, setForgoEmail] = useState("");

    // New login form state variables
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const CrossNavigationHandler = () => {
        navigate('/')
    }

    const handleSignupChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!SignupForm.acceptPolicy || !SignupForm.acceptTerms) {
            alert("You must accept terms and privacy policy!");
            return;
        }
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(SignupForm)
            });
            if (res.ok) {
                alert("Signup successful! Check your email");
                setSignup(false);
            } else {
                alert("Signup failed. Try again.")
            }
        } catch (e) {
            alert("There was a network error.");
        }
    };


    const handleForgotEmailChange = (e) => {
        setForgoEmail(e.target.value);
    };

    const Forgot_handler = async (e) => {
        e.preventDefault();
        if (!ForgoEmail) {
            alert("Please Enter Your Email");
            return;
        }
        try {
            const res = await fetch("/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: ForgoEmail })
            })
            if (res.ok) {
                alert("Password reset link sent! Check your email.");
                setpass(false);
            } else {
                alert("Failed to send reset link. Try again.");
            }
        } catch (error) {
            alert("Network error. Please try again later.");
        }
    }

    // Handle input change for login form
    const handleLoginEmailChange = (e) => {
        setLoginEmail(e.target.value);
    }

    const handleLoginPasswordChange = (e) => {
        setLoginPassword(e.target.value);
    }

    // Login form submit handler
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/log_in", {  // API endpoint for login
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail, password: loginPassword })
            });

            if (res.ok) {

                alert("Login successful!");
                navigate('/profile'); // Redirect to dashboard or home page after login
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            alert("Network error. Please try again later.");
        }
    }

    return (
        <div id='main'>
            <div className='cross'>
                <FaCircleXmark size={30} onClick={CrossNavigationHandler} />
            </div>
            {isSignup ? (
                <div className="contents">
                    <div className="header">
                        <h1>SIGN UP</h1>
                    </div>
                    <div className="main_container">
                        <form onSubmit={handleSignupSubmit}>
                            <input type="text" placeholder='First Name' name='firstName' value={SignupForm.firstName} onChange={handleSignupChange} required />
                            <input type="text" placeholder='Last Name' name='lastName' value={SignupForm.lastName} onChange={handleSignupChange} required />
                            <input type="email" placeholder='Email' name='email' value={SignupForm.email} onChange={handleSignupChange} required />
                            <input type="password" placeholder='Create New Password' name='password' value={SignupForm.password} onChange={handleSignupChange} required />
                            <input type="tel" placeholder='Phone' name='phone' value={SignupForm.phone} onChange={handleSignupChange} required />
                            <input type="text" placeholder='Your School Name' name='school' value={SignupForm.school} onChange={handleSignupChange} required />
                            <input type="text" placeholder='Referral Name (if any)' name='refName' value={SignupForm.refName} onChange={handleSignupChange} />
                            <input type="text" placeholder='Referral Email (if any)' name='refEmail' value={SignupForm.refEmail} onChange={handleSignupChange} />
                            <input type="text" placeholder='Your School Media Handle Link' name='schoolMedia' value={SignupForm.schoolMedia} onChange={handleSignupChange} />
                            <div className="checkbox">

                                <div>
                                    <input type="checkbox" id='SecondCheck' name='acceptTerms' checked={SignupForm.acceptTerms} onChange={handleSignupChange} />
                                    <label htmlFor="SecondCheck">I accept <a href="http://">Art Submission Terms</a></label>

                                </div>
                                <div>
                                    <input type="checkbox" id='ThirdCheck' name='acceptPolicy' checked={SignupForm.acceptPolicy} onChange={handleSignupChange} />
                                    <label htmlFor="ThirdCheck">I accept <a href="http://">Privacy Policy</a></label>

                                </div>
                            </div>
                            <div>
                                <span>Already a member? <b onClick={() => setSignup(!isSignup)}>Log In</b></span>
                                <input type="submit" value="Sign Up" />
                            </div>

                        </form>
                    </div>
                </div>
            ) :
                (
                    pass ? (
                        <div>
                            <div className="pass_header">
                                <h1>Reset Password</h1>
                                <h3>Enter your login email and we'll send you a link to reset your password.</h3>
                            </div>
                            <form onSubmit={Forgot_handler} method='post'>
                                <label htmlFor="PassEmail">Email</label>
                                <input type="text" placeholder='Enter your email' value={ForgoEmail} onChange={handleForgotEmailChange} required />
                                <input type="submit" value="Reset Password" />
                            </form>
                        </div>
                    ) : (

                        <div className='middle_content'>
                            <div>
                                <h1>LOG IN</h1>
                                <span><p>New to this site?</p><a href="#"
                                    onClick={e => {
                                        e.preventDefault();
                                        setSignup(!isSignup);
                                    }}>
                                    Sign Up</a></span>
                            </div>
                            <div>

                                <form onSubmit={handleLoginSubmit}>
                                    <label htmlFor="Email">Email *</label>
                                    <input type="text" placeholder='Email' id='Email' title='Enter your email id' value={loginEmail} onChange={handleLoginEmailChange} required />
                                    <label htmlFor="password">Password *</label>
                                    <input type="password" placeholder='Password' id='password' title='Enter your password' value={loginPassword} onChange={handleLoginPasswordChange} required />
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        setpass(!pass);
                                    }}>Forgot Password?</a>
                                    <input type="submit" value="LOG IN" className='submit' />
                                </form>
                            </div>

                        </div>
                    )
                )
            }
        </div>
    )
}

export default Login;
