import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { escape } from "querystring";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import './blogCard.css';
import BlogData from "../../models/blogData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addComment } from "../../redux/slices/blogSlice";
import { stat } from "fs";
import axios from "axios";

type Props={
    blogCardData: BlogData
}

const BlogCard: React.FC<Props> = (props):ReactElement =>{
    const dispatch = useDispatch<AppDispatch>();
    const sessionUser = useSelector((state: RootState)=>state.user);
    const [newComment, setNewComment] = useState("");
    const blogData:BlogData = props.blogCardData;
    const [contentDisplay, setDisplay] = useState(false);
    const [btnText, setBtnText] = useState("Show this blog");
    const [realTimeComments, setComments] = useState(blogData.blogComments);
    
    useEffect(() => {
        setComments(blogData.blogComments);
      }, [blogData.blogComments]);
    
    const handleAddComment = () =>{
        dispatch(addComment({blogId: blogData.blogId, userId: sessionUser.userId, comment:newComment}));
        
        const apiURL = `${process.env.REACT_APP_API_BASE_URL}/blogs/${blogData._id}`
        const apiData = {
            $push:{
                blogComments:{
                    user: sessionUser.userId,
                    comment: newComment
                }
            }
        }
        axios
            .put(apiURL, apiData)
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error)=>{
                console.log(error.response);
            })
    }


    return (
        <Paper sx={{borderRadius:5,
            ':hover': {
              boxShadow: 5,
              cursor: "pointer",
               // theme.shadows[20]
            },
          }} className="blogPaper" elevation={2}>
            <Accordion>
                <AccordionSummary>
                    <Grid sx={{marginTop:3, padding: 4}} container direction="column" spacing={1}>
                        <Grid item>
                            <Typography variant="h4"> {blogData.title}</Typography>
                        </Grid>
                        <Grid item  alignSelf="flex-end">
                        <Typography variant="caption" fontSize="1rem" fontStyle="italic"> {blogData.author}</Typography>
                        </Grid>
                        <Grid item  alignSelf="flex-end">
                        <Typography variant="caption"  fontSize="1rem" fontStyle="italic"> {blogData.dateOfCreation}</Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{padding:3}}>
                <Typography style={{padding:5, opacity: 1,transition: 'opacity 0.5s ease-in-out', textAlign:'justify'}} variant="body1"  fontSize="1rem" fontStyle="inherit">
                    {blogData.blogContent}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{backgroundColor:"whitesmoke"}}>
                <AccordionSummary>
                <Typography variant="button">
                    Open Comments
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container direction={'column'} gap={2}>
                        {Array.isArray(blogData.blogComments) &&
                        realTimeComments.map((comment, index) => (
                            <Grid item className="commentBody">
                            <Typography >
                                {comment.comment}
                                {" ~ "}
                                {comment.user}
                            </Typography>
                            </Grid>
                        ))}
                        <Grid>
                            <TextField
                                type="text"
                                fullWidth
                                multiline
                                label="Drop a comment"
                                onChange={(e)=>setNewComment(e.target.value)}
                                />
                            <Button size="large" variant="contained" type="submit"color="primary" onClick={handleAddComment}> Comment</Button> 
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
                

            
        </Paper>
    )
    
};

export default BlogCard;