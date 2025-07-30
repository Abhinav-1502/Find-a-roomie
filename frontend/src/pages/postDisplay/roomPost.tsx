import React, { useState, useEffect, ReactElement } from 'react';
import axios from 'axios';
import RoomPost from '../../models/roomPost';
import ImageViewer from '../testPages/imageViewer';
import { Button, Container, Grid, ImageList, ImageListItem, Paper, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./post.css"
import MapComponent from '../../components/Maps/MapComponent';

const RoomDisplay: React.FC = ():ReactElement =>{
    const location = useLocation();
    const { roomPost } = location.state || { roomPost: null };
    const navigate = useNavigate();

    useEffect(() => {
    if (!roomPost) {
        // If roomPost is null, navigate to '/listings'
        navigate('/listings');
    }
    
    }, [roomPost, navigate]);

    // If roomPost is null, render a message or handle it accordingly
    let isRoom = false;
    if (!roomPost) {
    return <div>Loading...</div>; // Or any other handling logic
    } else{
        isRoom = roomPost.Posttype==="Room";
    }
    
    let imageListClass = "imageList-more";
    if(roomPost.photos.length>4){
        imageListClass = "imageList-few"
    }

    return (
        <Paper elevation={4} className='PostPaper'>
            <Grid 
            container
            direction={'column'} 
            >
                <Grid container 
                className='parentGrid'
                direction={'row'} sx={{backgroundColor: '#F2F1EB'}}>
                    <Grid xs={8} className='gd-item-images' item>
                    <ImageList 
                    sx={{height:500}}
                    className= {imageListClass}
                     gap={8}>
                        {roomPost.photos.map((idOImage: string) => (
                            <ImageListItem key={idOImage}>
                            <ImageViewer imageId={idOImage}/>
                            </ImageListItem>
                        ))}
                        </ImageList>
                        
                    </Grid>

                    {(isRoom)?(
                        // If the post is about a room
                    <Grid xs={4} spacing={5} className='postOverView' item>
                        <Typography sx={{paddingBottom:1}} variant='h2' textAlign={'left'}>
                            {roomPost.lookingForRoom.name} 
                        </Typography>
                        <Typography sx={{paddingBottom:15}} variant='h3' textAlign={'left'}>
                            <i>{"by "} {roomPost.userId}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:3}} variant='h3' textAlign={'left'}>
                            {"$ "}{roomPost.pricingAndLeaseDetails.monthlyRent} {"- per month"}
                        </Typography>
                        <Typography sx={{paddingBottom:3}} variant='h4' textAlign={'left'}>
                            {roomPost.roomAndPropertyDetails.numBeds} Bed 
                            {" "}{roomPost.roomAndPropertyDetails.numBaths} Bath
                            {" - "}{roomPost.roomAndPropertyDetails.houseType}
                        </Typography>
                    </Grid>
                    ):(
                        // If the post is about a roommate
                    <Grid xs={4} spacing={5} className='postOverView' item>
                        <Typography sx={{paddingBottom:15}} variant='h2' textAlign={'left'}>
                            {roomPost.lookingForRoom.name} 
                        </Typography>
                        <Typography sx={{paddingBottom:2, marginTop:'auto'}} variant='h5' textAlign={'left'}>
                            <i>{"Looking For A Room Under "}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:3}} variant='h3' textAlign={'left'}>
                            {"$ "}{roomPost.pricingAndLeaseDetails.monthlyRent} {"- per month"}
                        </Typography>
                        <Typography sx={{paddingBottom:3}} variant='h4' textAlign={'left'}>
                            {roomPost.roomAndPropertyDetails.numBeds} Bed 
                            {" "}{roomPost.roomAndPropertyDetails.numBaths} Bath
                            {" - "}{roomPost.roomAndPropertyDetails.houseType}
                        </Typography>
                    </Grid>
                    )}
                </Grid>

                <Grid container
                direction={'column'}
                 sx={{backgroundColor: '#EEE7DA'}} className='parentGrid'  >
                    <Grid item>
                    
                    {(isRoom)?(
                    <div>
                        <Typography sx={{paddingBottom:3}} variant='h3' textAlign={'left'}>
                            {"Property Description: "}
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Address: "} <br /> <i>{roomPost.lookingForRoom.locationAddress}</i>
                        </Typography>
                        
                    </div>
                    
                    ):(
                    <Typography sx={{paddingBottom:1}} variant='h4' textAlign={'left'}>
                        {"Would prefer a localitiy like: "}
                    </Typography>
                    )}

                    <Typography className='propDesc' variant='body1' >
                        {roomPost.lookingForRoom.description}
                        </Typography>
                    </Grid>

                    {(isRoom)?(
                    <div>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            <b>{"Per Month Rent : "}{(roomPost.pricingAndLeaseDetails.monthlyRent)}</b>
                            {(roomPost.pricingAndLeaseDetails.utilitiesIncluded)?(" - Utilities Included"):(" - Excluding Utilities")}
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Security Deposit : "} {(roomPost.pricingAndLeaseDetails.securityDeposit)}
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                        {" House Type : "} <i>{(roomPost.roomAndPropertyDetails.houseType)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Number of beds : "} <i>{(roomPost.roomAndPropertyDetails.numBeds)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Number of baths : "} <i>{(roomPost.roomAndPropertyDetails.numBaths)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Furnished: "} <i>{(roomPost.roomAndPropertyDetails.furnished[0])}</i>
                        </Typography>
                        </div>
                    ):(
                    <div>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            <b>{"Preffered Per Month Rent Under: $"}{(roomPost.pricingAndLeaseDetails.monthlyRent)}</b>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Preffered House Type : "} <i>{(roomPost.roomAndPropertyDetails.houseType.join(", "))}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Preffered Number of beds : "} <i>{(roomPost.roomAndPropertyDetails.numBeds)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Preffered Number of baths : "} <i>{(roomPost.roomAndPropertyDetails.numBaths)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Would preffered if the house is "} <i>{(roomPost.roomAndPropertyDetails.furnished.join(" or "))}</i> {"Furnished"}
                        </Typography>
                        
                    </div>
                    )}
                </Grid>

                <Grid container
                direction={'column'}
                 sx={{backgroundColor: '#F2F1EB'}} className='parentGrid'  >
                    <Grid item>
                    <Typography sx={{paddingBottom:8}} variant='h3' textAlign={'left'}>
                        Amenities and Preferences:
                    </Typography>
                    </Grid>
                    <Typography sx={{paddingBottom:5}} variant='h5' textAlign={'left'}>
                        {(isRoom)?(
                            "Utilities Included: "):(
                                " Would prefere these utilities if included: " 
                            )}
                        
                        <ul className='listDisplay'>
                        {roomPost.roomAndPropertyDetails.utilities.map((utility: string) => (
                            <li key={utility}><b><i>{utility}</i></b></li>
                        ))}
                    </ul>
                    </Typography>
                    <Typography sx={{paddingBottom:5}} variant='h5' textAlign={'left'}>

                        {(isRoom)?(
                            "Amenities Included: "):(
                                "Looking for amenities: " 
                            ) }
                        
                        <ul className='listDisplay'>
                        {roomPost.roomAndPropertyDetails.amenities.map((amenity: string) => (
                            <li key={amenity}><b><i>{amenity}</i></b></li>
                        ))}
                    </ul>
                    </Typography>
                    
                    <Typography sx={{paddingBottom:5}} variant='h5' textAlign={'left'}>
                            {(isRoom)?(
                            "Preferences in potential roommates : "):(
                                "Preferences of "+roomPost.lookingForRoom.name+" in potential roommate: "
                            ) }
                        <ul className='listDisplay'>
                        {roomPost.preferences.preferences.map((prefs: string) => (
                            <li key={prefs}><b><i>{prefs}</i></b></li>
                        ))}
                    </ul>
                    </Typography>

                    {(roomPost.preferences.moreDescription)?(
                        <Typography className='propDesc' variant='body1'>
                            {"Would love to share with someone who: "} 
                            <br />
                            {roomPost.preferences.moreDescription}
                        </Typography>
                    ):(null)}
                       
                </Grid>
                <Grid container
                direction={'column'}
                 sx={{backgroundColor: '#EEE7DA'}} className='parentGrid'  >

                        <Grid item>
                        <Typography sx={{paddingBottom:8}} variant='h4' textAlign={'left'}>
                            <i>If you want to make an enquiry about this room, you can contact the posted user at: </i>
                        </Typography>
                        </Grid>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Email : "} <i>{(roomPost.contactInfo.email)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {"Phone : "} <i>{(roomPost.contactInfo.phone)}</i>
                        </Typography>
                        <Typography sx={{paddingBottom:1}} variant='h5' textAlign={'left'}>
                            {(roomPost.Posttype ==="Roomie")?(roomPost.lookingForRoom.name):("He/She")}{" is available during : "} <i>{(roomPost.contactInfo.contactAvailability)}</i>
                        </Typography>
                </Grid>

                <Grid container
                direction={'column'}
                 sx={{backgroundColor: '#EEE7DA'}} className='parentGrid'  >

                       <MapComponent address={roomPost.lookingForRoom.locationAddress} ></MapComponent>
                </Grid>
                
            </Grid>
        </Paper>
    );
}
export default RoomDisplay;