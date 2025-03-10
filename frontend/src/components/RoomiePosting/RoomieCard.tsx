import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RoommatePost from "../../models/roomPost";
import ImageViewer from "../../pages/testPages/imageViewer";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSProperties, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ShareIcon from "@mui/icons-material/Share";
import PreviewIcon from '@mui/icons-material/Preview';

import { addWishListId } from "../../redux/slices/user-slice";
import DirectionsIcon from '@mui/icons-material/Directions';
import axios from "axios";

type Props = {
  roommate: RoommatePost;
  style?: CSSProperties; // Add style prop
};

const RoomieCard: React.FC<Props> = ({ roommate, style }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const sessionUser = useSelector((state: RootState) => state.user);

  const getCardBackgroundColor = (postType: string) => {
    switch (postType) {
      case "Roomie":
        return "rgba(151, 40, 178, 0.7)";
      case "Room":
        return "rgba(50, 119, 213, 0.7)";
    }
  };

  const cardStyle = {
    maxHeight: 400,
    maxWidth: 350,
    mb: 2,
    backgroundColor: getCardBackgroundColor(roommate.Posttype),
  };

  const handlePostOpen = (post: RoommatePost) => {
    navigate(`/listings/${post.postId}`, { state: { roomPost: post } });
    console.log(post.postId);
  };

  const [isClicked, setIsClicked] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleWishlishClick = () => {
    setIsClicked(!isClicked);

    if (isClicked) {
      dispatch(addWishListId(roommate.postId));
    }
  };

  const handleEditClick = () => {
    // Add your edit functionality here
    const propsToSend={
        id:roommate._id
    }
    navigate('/modify-listing-form', { state: propsToSend });
    console.log('Edit clicked for post ID:', roommate.postId);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    // Add your delete functionality here
    deletePost(roommate._id);
    console.log('Delete clicked for post ID:', roommate.postId);
    handleMenuClose();
  };

  const deletePost = async (id:string) =>{
    const apiURL = `${process.env.REACT_APP_API_BASE_URL}/roomposts/${id}`;
    axios
        .delete(apiURL)
        .then((response)=>{
            console.log(response.data);
            alert(response.data.message);
        })
        .catch((error)=>{
            console.log(error.response);
        })
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();

  // Conditionally render the settings icon based on the pathname
  const isMyListingsPage = location.pathname === "/mylistings";

  return (
    <Grid item xs={12} sm={6} md={4} style={{}}>
      <Card sx={cardStyle}>
          <CardHeader
            avatar={
              <Avatar aria-label="roomie">
                {roommate.lookingForRoom.name.charAt(0)}
              </Avatar>
            }
            action={
                isMyListingsPage ? ( // Only render if it's the /mylistings page
                <div>
                  <IconButton aria-label="settings" onClick={handleMenuClick} style={{color: 'Black'}}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
                  </Menu>
                </div>
              ) : (          <IconButton 
                aria-label="View"
                onClick={(e) => handlePostOpen(roommate)}
                style={{ color: "black" }}
                >
                  <PreviewIcon />
                </IconButton>)
            }
            title={roommate.lookingForRoom.name}
          />

          <div
            className="image-container"
            style={{ height: "200px", width: "100%" }}
            onClick={(e) => handlePostOpen(roommate)}
          >
            <ImageViewer
              imageId={roommate.photos[0]}
              style={{ height: "100% ", width: "100% " }}
            />
          </div>

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {roommate.lookingForRoom.locationAddress}
            </Typography>
          </CardContent>

        <CardActions disableSpacing   style={{ justifyContent: 'space-between' }}>
          <IconButton
            aria-label="add to wishlist"
            onClick={handleWishlishClick}
            style={{ color: isClicked ? "red" : "black" }}
          >
            <FavoriteIcon />
          </IconButton>
          <Box>
          <IconButton aria-label="Share" style={{ color: "black" }}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="Map" style={{ color: "black" }}>
            <DirectionsIcon />
          </IconButton>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RoomieCard;
