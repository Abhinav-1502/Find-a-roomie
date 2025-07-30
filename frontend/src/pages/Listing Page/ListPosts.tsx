import React, { useState } from "react";
import RoomPost from "../../models/roomPost";
import RoomieCard from "../../components/RoomiePosting/RoomieCard";
import {
  Typography,
  Paper,
  Container,
  Grid,
  Pagination,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility';
interface ListPostsProps {
  posts: RoomPost[];
  handlePostOpen: (post: RoomPost) => void;
}

const ListPosts: React.FC<ListPostsProps> = ({ posts, handlePostOpen }) => {
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const sessionUser = useSelector((state: RootState) => state.user);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleOpenChat = (room: RoomPost): void => {
    const roomname = room.lookingForRoom.name;
    const username = sessionUser.firstName;
    navigate(`/chat/${roomname}/${username}`);
    // Add any additional logic for opening chat here
  };

  return (
    <>
      {Array.isArray(currentPosts) ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            padding: "20px",
          }}
        >
          {currentPosts.map((room) => (
            <div
              key={room.postId}
              style={{ marginBottom: "20px", maxHeight: "400" }}
            >
              <Container
                className="LPcontainer"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  maxWidth: "90vw",
                  width: "100%",
                }}
              >
                <Grid
                  container
                  className="LPgrid1"
                  direction={"column"}
                  spacing={1}
                  columns={2}
                  style={{ height: "400px" }}
                >
                  <Grid
                    item
                    className="LPgrid2"
                    xs={1}
                    style={{ width: "350px" }}
                  >
                    <RoomieCard roommate={room} />
                  </Grid>
                  <Grid
  item
  xs={12}
  md={6} // Adjust the grid size based on your layout requirements
  style={{
    width: "70vw",
    height: "400px",
    position: "relative",
  }}
>
  <Paper
    elevation={3}
    style={{
      height: "100%",
      overflow: "hidden",
      position: "relative",
      padding: "16px",
      background: 'linear-gradient(to bottom, #FDFEFE, #EEE7D9)',
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        marginBottom: "16px",
        display: "flex",
        justifyContent: "flex-end",
        gap: "8px",
      }}
    >
            <Button
        variant="outlined"
        onClick={() => handleOpenChat(room)}
        startIcon={<ChatIcon />}
        style={{
          color: "black",
          borderColor: "black",
        }}
      >
        Live Connect
      </Button>
      <Button
        variant="contained"
        onClick={() => handlePostOpen(room)}
        endIcon={<VisibilityIcon  />}
      >
        View Details
      </Button>

    </div>
    <div>
    <Typography
        sx={{ paddingBottom: 1, textAlign: "right" }}
        variant="h5"
        textAlign={"right"}
      >

        <b>{"Per Month Rent : "}</b>
        {room.pricingAndLeaseDetails.monthlyRent}
        {room.pricingAndLeaseDetails.utilitiesIncluded
          ? " - Utilities Included"
          : " - Excluding Utilities"}
      </Typography>
    </div>
    <div style={{ flexGrow: 1 }}>
      <Typography
        sx={{ paddingBottom: 1, textAlign: "justify" }}
        variant="h3"
        textAlign={"left"}
      >
        <b>Looking For A {room.Posttype}</b>
      </Typography>
      <Typography
        sx={{ paddingBottom: 1, textAlign: "justify" }}
        variant="h5"
        textAlign={"left"}
      >
        <i>
          {room.Posttype === "Roomie"
            ? "Posted by"
            : "Property Name"}: {room.lookingForRoom.name}
        </i>
        , Address: {room.lookingForRoom.locationAddress}
      </Typography>
      {/*<Typography
        sx={{ paddingBottom: 1, textAlign: "justify" }}
        variant="h3"
        textAlign={"left"}
      >
        <b>Property Description:</b>
      </Typography>
      <Typography
        sx={{ paddingBottom: 1, textAlign: "justify" }}
        variant="h5"
        textAlign={"left"}
      >
        {room.lookingForRoom.description}
        </Typography>*/}
      <Typography
        sx={{ paddingBottom: 1, textAlign: "justify" }}
        variant="h4"
        textAlign={"left"}
      >
        <b>House Features:</b>
      </Typography>
      <Typography
        sx={{ paddingBottom: 1 }}
        variant="h5"
        textAlign={"left"}
      >
        {"Number of beds: "} <i>{room.roomAndPropertyDetails.numBeds}</i>
      </Typography>
      <Typography
        sx={{ paddingBottom: 1 }}
        variant="h5"
        textAlign={"left"}
      >
        {"Number of baths: "} <i>{room.roomAndPropertyDetails.numBaths}</i>
      </Typography>
      <Typography
        sx={{ paddingBottom: 1 }}
        variant="h5"
        textAlign={"left"}
      >
        {"Furnished: "} <i>{room.roomAndPropertyDetails.furnished[0]}</i>
      </Typography>
    </div>
    <div>

    </div>
  </Paper>
</Grid>


                </Grid>
              </Container>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={Math.ceil(posts.length / postsPerPage)}
              page={currentPage}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
              size="large"
              color="primary"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ListPosts;
