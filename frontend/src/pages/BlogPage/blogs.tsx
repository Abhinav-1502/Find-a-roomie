import { Box, Button, Fab, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";

import BlogCard from "../../components/BlogComponents/blogCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppStore, RootState } from "../../redux/store";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import BlogData from "../../models/blogData";
import { error } from "console";
import { BlogsState, loadBlogList } from "../../redux/slices/blogSlice";

import './blogPage.css';

const BlogPage: React.FC = ():ReactElement=>{

   
    const dispatch = useDispatch<AppDispatch>();
    const sessionUser = useSelector((state: RootState)=> state.user);
    const reduxBlogList = useSelector((state: RootState) => state.blogs);
    const [blogList, setBlogList] = useState<BlogsState>(reduxBlogList);

    useEffect(()=>{
        const fetch = async () =>{
            const apiURL = `${process.env.REACT_APP_API_BASE_URL}/blogs/`;
            axios
                .get(apiURL)
                .then((response)=>{
                    console.log(response.data);
                    dispatch(loadBlogList(response.data.data));
                })
                .catch((error)=>{
                    console.log(error.response);
                })
        }
        fetch();
    },[dispatch])

    useEffect(() => {
        setBlogList(reduxBlogList);
      }, [reduxBlogList]);

    const [blogFormData, setBlogData] = useState({
        title:"",
        content:""
    })

    const [toggleOverlay, setToggler] = useState("");
    const [toggleCreateBlog, setTogglerPost] = useState("create-blog");
    const handlePostBtn = () =>{
        setToggler("active");

        setTogglerPost("create-blog-active");
    }

    const getPostCallData = () =>{
        const data = {
            blogId: `${sessionUser.userId} ${Math.random()}`,
            userId: `${sessionUser.userId}`,
            title: blogFormData.title,
            author: `${sessionUser.firstName} ${sessionUser.lastName}`,
            blogContent: blogFormData.content
        }
        return data;
    }

    const hanldePostBlog = () =>{
        const apiData =  getPostCallData();
        const apiPostURL = `${process.env.REACT_APP_API_BASE_URL}/blogs`;
        axios
            .post(apiPostURL, apiData)
            .then((response)=>{
                console.log(response.data);
                alert(response.data.message);
            })
            .catch((error)=>{
                console.log(error.response);
            })
    }

    const handleClosePost = () =>{
        setToggler("");
        setTogglerPost("create-blog");
    }
    
   return (<div className="blogs-body">
        <Grid
            className="blogs grid container"
            container
            direction="column"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item>
                <Typography variant="h4">
                    Want to share something regarding roomhunt?
                </Typography>
                <Typography variant="h6">
                    Or you can share about roommates? Just blog away
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="outlined" size="large" onClick={handlePostBtn}>
                    Post a blog
                </Button>
            </Grid>
           
           {/* Displaying list of blogs */}
            {Array.isArray(blogList)?(
                    <Grid container direction={'column-reverse'} className="blogCardGridItem">
                        {blogList.map((blog)=>(
                            <BlogCard blogCardData={blog} />
                        ))}
                    </Grid>
                ):(null)}
            
                    
            
        </Grid>

        <Grid className={toggleCreateBlog} 
        container 
        alignItems={'center'}
        justifyContent={'center'}>
            <Paper elevation={2} sx={{paddingTop:3}}>
            <Grid className="post-body" container direction={'column'} gap={4} alignItems={'flex-start'}>
                
                <Grid item alignSelf={'flex-end'}>
                <Fab color="inherit" sx={{zoom:0.5, display:'inline'}} aria-label="edit" onClick={handleClosePost}>
                    <CloseIcon />
                </Fab>
                </Grid>
                <Grid item>
                <Typography variant="h4">
                    Share Your Thoughts 
                </Typography>
                </Grid>

                <Grid item>
                <TextField 
                    label="Title of your blog"
                    type="text" 
                    variant="outlined"
                    onChange={(e)=>setBlogData(
                                    (prevData)=>({
                                        ...prevData,
                                        title: e.target.value
                                    })
                                )} />
                </Grid>

                <Grid item width={'100%'}>
                <TextField
                    label= "and what's in your mind?"
                    type="text"
                    multiline
                    rows={10}
                    fullWidth
                    onChange={(e)=>setBlogData(
                        (prevData)=>({
                            ...prevData,
                            content: e.target.value
                        })
                    )}
                    />
                    </Grid>
                <Grid item>
                    <Button variant="outlined" size="large" onClick={hanldePostBlog}>
                        Post
                    </Button>
                </Grid>
                </Grid>



            </Paper>
        </Grid>

        <div id="overlay" className={toggleOverlay}>

        </div>

    </div>
)}

export default BlogPage;