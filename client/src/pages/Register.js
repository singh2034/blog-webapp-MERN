import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {Box, Typography, TextField, Button} from "@mui/material";
import toast from 'react-hot-toast';

const Register = () => {
  // Navigate
  const navigate = useNavigate();
  // state
  const [inputs, setInputs] = useState({
    name: '',
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
      const {data} = await axios.post('/api/v1/user/register',
      {username: inputs.name, 
        email: inputs.email, 
        password:inputs.password});
      if(data.success){
        toast.success("User Registered Successfully");
        navigate("/login");
      }
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
          Register
        </Typography>

        <TextField placeholder="name" value={inputs.name} 
        onChange={handleChange} name="name"
        margin="normal" type={"text"} required/>

        <TextField placeholder="Email" value={inputs.email} 
        onChange={handleChange} name="email"
        margin="normal" type={"email"} required/>

        <TextField placeholder="Password" value={inputs.password} 
        onChange={handleChange} name="password"
        margin="normal" type={"password"} required/>

        <Button  variant="contained" type="submit"
        color="primary" sx={{borderRadius: 3, marginTop: 3}} >
          Register
        </Button>

        <Button onClick={() => navigate('/login')} type="submit" color="primary" 
        sx={{borderRadius: 3, marginTop: 3}}>
        Already Registered ? Please Login
        </Button>

      </Box>
      </form>
    </>
  )
}

export default Register