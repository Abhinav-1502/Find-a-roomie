import React, { useState } from "react";
import { ReactElement } from "react";
import './login.css';
import { Button, Link, Paper, TextField, Typography } from "@mui/material";
import { stat } from "fs";
import LoginCard from "../../components/Login/loginCard";
import SignUpCard from "../../components/Login/signUpCard";
import { FaFacebookF, FaGoogle, FaYahoo } from 'react-icons/fa';
const LoginPage: React.FC = (): React.ReactElement => {
    const [loginS, setLoginS] = useState(true);
    const [btnText, setBtnText] = useState("Don't Have An Account?, Click here to Sign UP");
 
    const handleSignUpBt = () => {
        setLoginS(!loginS);
        setBtnText(loginS ? "Already Have An Account?, Click Here to Sign In" : "Don't Have An Account?, Click here to Sign Up");
    };
 
    // You can handle the login logic here, such as redirecting to OAuth flow
    const handleSocialLogin = (socialNetwork: string) => {
        console.log(`Login with ${socialNetwork}`);
        // Integration with social network login will go here
    };
 
    return (
        <div className="login-div">
            <div className="login-box">
                <Paper sx={{ padding: 5, borderRadius: 4 }} elevation={3}>
                    {loginS ? (
                        <>
                            <LoginCard />
                            {/* Social Login Buttons */}
                            <Button
                                fullWidth
                                startIcon={<FaFacebookF />}
                                onClick={() => handleSocialLogin('Facebook')}
                                style={{ margin: '10px 0' }}
                            >
                                Login with Facebook
                            </Button>
                            <Button
                                fullWidth
                                startIcon={<FaGoogle />}
                                onClick={() => handleSocialLogin('Gmail')}
                                style={{ margin: '10px 0' }}
                            >
                                Login with Gmail
                            </Button>
                            <Button
                                fullWidth
                                startIcon={<FaYahoo />}
                                onClick={() => handleSocialLogin('Yahoo')}
                                style={{ margin: '10px 0' }}
                            >
                                Login with Yahoo
                            </Button>
                        </>
                    ) : (
                        <SignUpCard />
                    )}
                    <Link href="#" onClick={handleSignUpBt} variant="body2" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
                        {btnText}
                    </Link>
                </Paper>
            </div>
        </div>
    );
};
 
export default LoginPage;