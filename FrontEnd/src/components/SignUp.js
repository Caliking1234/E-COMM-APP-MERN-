import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


const SignUp = ()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setconfirmPassword]=useState("");
    const [email,setEmail]=useState("");
    const [error,setError]=useState(false);
    const [errorPass,setErrorPass]=useState(false);
    const [uniqueEmail,setuniqueEmail]=useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){navigate('/login')}
    },[])

    const validateMail = async ()=>{
        let valmail = await fetch("http://localhost:5000/valid-mail")
        valmail = await valmail.json();
        valmail.map((item)=>{
            console.log(item.email);
            if(item.email === email){
                setuniqueEmail(true);
                console.log(uniqueEmail);
            }
        })
    }

    const collectData = async ()=>{
        if(!email || !name || !password || !confirmPassword){
            setError(true);
            return(false);
        }
        else if(password!=confirmPassword){
            setErrorPass(true);
            return(false);
        }
        validateMail();
        console.log(uniqueEmail);
        if(uniqueEmail){
            let result = await fetch("http://localhost:5000/register",{
                method:"post",
                body:JSON.stringify({name,email,password,confirmPassword}),
                headers:{
                    'Content-Type':'application/json'
                },
            });
            result = await result.json();
            console.warn(result);
            
                console.warn(result);
                localStorage.setItem("user",JSON.stringify(result));
                navigate('/login')
        }
    }
    return(
        <div className="signupBody">
            <h1 className="heading">Register</h1>
            <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Enter Name'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={name} 
                required
                onChange={(e)=>setName(e.target.value)}
                />
        </div>
        <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Enter Email'
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                margin="dense"
                value={email} 
                required
                onChange={(e)=>setEmail(e.target.value)}
                />
        </div>
        <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label='Password'
                type="password"
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                value={password} 
                margin="dense"
                required
                onChange={(e)=>setPassword(e.target.value)}
                />
        </div>
        <div style={{ margin:"auto",width:"70%"}}>
            <TextField 
                style={{marginTop:20}}
                label=' Confirm Password'
                type="password"
                fullWidth
                color="primary"
                variant="outlined"
                size="small"
                value={confirmPassword} 
                margin="dense"
                required
                onChange={(e)=>setconfirmPassword(e.target.value)}
                />
            {/* <TextField inputProps={{ readOnly: true}} variant="contained" color="error" defaultValue='*All feilds are required'/> */}
        </div>
            <Button  variant="outlined" style={{ margin:30,background:"#282c34",color:"aquamarine",width:"50%"}} type="button" onClick={collectData}>Sign-Up</Button>
            {(error && (!password || !email || !confirmPassword || !name)) && <span className="error-msg">*All feilds are required</span>}
            {errorPass &&<span className="error-msg">Please Confirm Password</span>}
            {uniqueEmail &&<span className="error-msg">*Email has already been Used,try with another account</span>}
        </div>
    )
}

export default SignUp;