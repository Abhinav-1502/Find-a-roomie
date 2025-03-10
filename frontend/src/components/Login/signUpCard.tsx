import { Numbers } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Link, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { error } from "console";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../handlers/AlertProvider";

const SignUpCard: React.FC = ():ReactElement =>{
    // const [firstName, ]  
    const [userNameError,setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPassError] = useState("");
    const [changePassErr, setChangePassErr] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userAge, setUserAge] = useState("");
    const [gender, setGender] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { showAlert } = useAlert(); // Get showAlert function from useAlert

    const handleFirstName = (event: any)=>{
        setFirstName(event.target.value);
    }
    const handleLastName = (event: any)=>{
        setLastName(event.target.value);
    }

    const handleUserNameTF = (event:any) =>{
        setUsername(event.target.value);
        
        if(event.target.value.length<5 && Boolean(event.target.value)){
            setUsernameError("Should be greater than 5 characters");
        }else{
            setUsernameError("");
        }
    }

    const handlePhoneChange = (event:any) => {
        setUserPhone(event.target.value);
        const sanitizedValue = event.target.value.replace(/[^0-9+]/g, '');
        event.target.value = sanitizedValue;
        event.target.variant = "standard";
      };

    const handleEmailChange = (event:any)=>{
        setEmail(event.target.value);
        const emailRegEx: RegExp = new RegExp(/\S+@\S+\.\S+/);
        if(!emailRegEx.test(event.target.value) && Boolean(event.target.value)){
            setEmailError("Invalid Email");
        }else{
            setEmailError("");
        }
    }
    const handlePasswordChange = (event:any)=>{
        setPassword(event.target.value);
        if(event.target.value.length<8 && Boolean(event.target.value)){
            setPassError("Should be greater than 8 characters");
        }else{
            setPassError("");
        }
    }
    const handleConfirmPasswordChange = (event:any) =>{
        setConfirmPassword(event.target.value);
        if(event.target.value !== password && Boolean(event.target.value)){
            setChangePassErr("Password Doesn't Match");
        }else{
            setChangePassErr("");
        }
    }
    const handleSubmit = (event:any) => {
        event.preventDefault();
        if(!Boolean(firstName) 
            || !Boolean(lastName) 
            || !Boolean(username) 
            || !Boolean(email) 
            || !Boolean(userPhone) 
            || !Boolean(password) 
            || !Boolean(confirmPassword) 
            || Boolean(userNameError)){
            showAlert("error","PLEASE ENTER ALL THE DETAILS");
        } else if(Boolean(emailError)){
            showAlert("error", "Enter a valid email");
        } else if(Boolean(passwordError)){
            showAlert("error", "Enter a valid password")
        } else if(password!==confirmPassword){
            showAlert("error", "Password doen't match")
        }
        else{
            registerUser();
        }
    };

    const registerUser = () =>{
        const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api/users/api/signup`;
        axios
            .post(apiURL,
                {
                    userId: username,
                    firstName: firstName,
                    lastName: lastName,
                    gender: gender,
                    age: userAge,
                    email: email,
                    phone: userPhone,
                    password: password
                })
            .then((response)=>{
                    showAlert("success", "Account Created Successfully");
                    window.location.reload();   
                    console.log(response.data.message);
                    
                })
            .catch((error)=>{showAlert("error",(error.response.data.message as string))});
    }

    return(
        
        <form  onSubmit={handleSubmit}>
        <Grid  container direction="column"  alignItems="center" spacing={3}>
            
            <Grid item alignSelf="center">
                <Typography variant="h4">Register </Typography>
            </Grid>
            
            <Grid item>
                <TextField label="First Name" type="text" variant="outlined" onChange={(e)=>setFirstName(e.target.value)}></TextField>
            </Grid>
            <Grid item>
                <TextField label="Last Name" type="text" variant="outlined" onChange={(e)=>setLastName(e.target.value)}></TextField>
            </Grid>
            <Grid item>
                <TextField label="Age" type="number" variant="outlined" onChange={(e)=>setUserAge(e.target.value)}></TextField>
            </Grid>
            <Grid item>
                <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    onChange={(e)=>{setGender(e.target.value)}}
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <TextField error={Boolean(userNameError)}  helperText={userNameError} label="User Name" variant="outlined" onChange={handleUserNameTF}></TextField>
            </Grid>
            
            <Grid item>
                <TextField  label="Phone" type="tel"  variant="outlined" onChange={handlePhoneChange}></TextField>
            </Grid>
            <Grid item>
                <TextField error={Boolean(emailError)}  helperText={emailError} label="Email" variant="outlined" onChange={handleEmailChange}></TextField>
            </Grid>
            <Grid item>
                <TextField error={Boolean(passwordError)}  helperText={passwordError} label="Password" type="password" variant="outlined" onChange={handlePasswordChange}></TextField>
            </Grid>
            <Grid item>
                <TextField error={Boolean(changePassErr)} helperText={changePassErr} label="Confirm Password" variant="outlined" onChange={handleConfirmPasswordChange}></TextField>
            </Grid> 
            
            <Grid item>
                <Button size="large" variant="contained" type="submit"color="primary"> SignUp</Button> 
            </Grid>
            
            
        </Grid>
        </form>
    );
}

export default SignUpCard;