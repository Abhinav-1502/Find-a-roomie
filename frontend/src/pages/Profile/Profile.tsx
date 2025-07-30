import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUser, resetUser } from '../../redux/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Fab
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './UserProfile.css'; 
import axios from 'axios';
import { useAlert } from '../../handlers/AlertProvider';

const UserProfile: React.FC = () => {
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const sessionUser = useSelector((state: RootState) => state.user);
  const isLogged = Boolean(sessionUser.userId); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(sessionUser);
  const {showAlert} = useAlert();

  // Function to handle profile update
  const handleUpdate = () => {
    console.log("Changed Data structer");
    console.log(userData);
    console.log("Session Data structer");
    console.log(sessionUser);
    const apiURL = `${process.env.REACT_APP_API_BASE_URL}/api/users/api/update/`;
    axios
      .put(apiURL, userData)
      .then((response)=>{
        console.log(response.data);
        showAlert('success', response.data.message);
      })
      .catch((error)=>{
        console.log(error);
      })
  };

  // Function to confirm deletion
  const handleDelete = () => {
    setOpenDeleteConfirm(true);
  };

  // Function to handle user account deletion
  const deleteUserAccount = () => {
    // Make API call to delete account
    dispatch(resetUser());
    setOpenDeleteConfirm(false);
    navigate('/login');
  };

  
  type Props={
    dataField: string;
    value: string;
    label: string
  }
  
  const DisplayData = (props:Props) =>{
      const [toggleTF, setToggler] = useState(false);
      const [TFData, setTFData] = useState("");
      const handleSave = () =>{
        if(TFData){
          setUserData((prevData) => ({
            ...prevData,
            [props.dataField]: TFData,
          }));
        }
      }
      const handleBack =() =>{
        setToggler(!toggleTF);
      }
      return (
        <Typography variant="h6" className='textData'>
          {props.label} {": "}  
          {(toggleTF)?
            (
              <div style={{display: 'inline'}}>
                <TextField label={props.label} name={props.dataField} type="text" variant="outlined" onChange={(e)=>{setTFData(e.target.value)}}></TextField>
                  <Button size='small' sx={{marginLeft:2}} variant="contained" onClick={handleSave}> Save</Button>
                  <Button size='small' sx={{marginLeft:2}} variant="contained" onClick={handleBack}> Back</Button>
              </div>
              ):(
                <p style={{display: 'inline'}}>
                  {props.value}
                  <Fab onClick={(e)=>{setToggler(!toggleTF)}} color="inherit" sx={{zoom:0.7, marginLeft:3}} aria-label="edit">
                    <EditIcon />
                  </Fab>
                  
                </p>
            )} 
        </Typography>
      )
  }

  const handleReset = () =>{
    setUserData(sessionUser);
  }

  return (
    <Paper className="userProfilePaper">
      <Grid container spacing={2} alignItems={"center"} justifyContent="center">
      <Grid item xs={12} className='user-details'>
        {isLogged ? (
          <>
            <Typography variant="h6" className='textData'>User Id: {userData.userId}</Typography>
            <DisplayData label='First Name' dataField='firstName' value={userData.firstName}></DisplayData>
            
            <DisplayData label='Last Name' dataField='lastName' value={userData.lastName} ></DisplayData>
            <Typography variant="h6" className='textData'>Age: {sessionUser.age}</Typography>
            <Typography variant="h6" className='textData'>Gender: {userData.gender}</Typography>
            <DisplayData label='Email' dataField='email' value={userData.email}></DisplayData>
            <DisplayData label='Phone' dataField='phone' value={userData.phone}></DisplayData>
          </>
        ) : (
          <Typography variant="body1">Please log in to view your profile details.</Typography>
        )}
      </Grid>
        <Grid item xs={12}>
          <Button sx={{marginRight: 3}} variant="contained" color="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
          <Button sx={{marginRight: 3}} variant="contained" color="primary" onClick={handleReset}>
            Reset Changes
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete Account
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openDeleteConfirm}
        onClose={() => setOpenDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your profile? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteConfirm(false)} color="primary">
            No
          </Button>
          <Button onClick={deleteUserAccount} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserProfile;