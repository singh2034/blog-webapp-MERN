import React, {useState} from 'react'; // It is a Hook (useState)
import { useNavigate } from 'react-router-dom'; // It is a Hook
import axios from "axios";
import {Box, Typography, TextField, Button} from "@mui/material";
import {useDispatch} from "react-redux"; // It is a Hook
import {authActions} from "../redux/store";
import toast from 'react-hot-toast';


const Login = () => {
  // Navigate
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch();
  // state
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  // Handle Input Change
  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };  

  // form handle
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/v1/user/login',
      {
        email: inputs.email, 
        password:inputs.password});
      if(data.success){
        localStorage.setItem('userId', data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        navigate("/home");
      };
    } catch (error) {
      console.log(error);
    }
  };
  return (
  <>
    <form onSubmit={handleSubmit}>
      <Box 
      maxWidth={450} display="flex"
      flexDirection={'column'} alignItems="center"
      justifyContent={"center"} margin="auto"
      marginTop={5} boxShadow="10px 10px 20px #000"
      padding={3} borderRadius={10}>

        <Typography variant="h4" padding={3} 
          textAlign="center" sx={{textTransform: "uppercase"}}>
          Login
        </Typography>

        <TextField placeholder="Email" value={inputs.email} 
        onChange={handleChange} name="email"
        margin="normal" type={"email"} required/>

        <TextField placeholder="Password" value={inputs.password} 
        onChange={handleChange} name="password"
        margin="normal" type={"password"} required/>

        <Button  variant="contained" type="submit"
          color="primary" sx={{borderRadius: 3, marginTop: 3}} >
          Login
        </Button>

        <Button onClick={() => navigate('/register')} type="submit" color="primary" 
          sx={{borderRadius: 3, marginTop: 3}}>
          Not a User? Please Register
        </Button>

      </Box>
    </form>
  </>
  )
}

export default Login