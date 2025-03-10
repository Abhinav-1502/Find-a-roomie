import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { loadPostList } from "../redux/slices/PostList";



export const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/roomposts/`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };