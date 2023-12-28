import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import { Link, Navigate, useOutletContext } from 'react-router-dom'
import SacredScrollsLogo from '../Images/SacredScrollsBlackBackground.png'
import { api } from "../utilities/ApiUtilities.jsx"
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {user, setUser} = useOutletContext()
  const navigate = useNavigate()

  const login = async(e) => {
    e.preventDefault()
    let response = await api.post("api/v1/user/login/", {
      username: username,
      password: password
    })
    .catch((err)=>{
      if (err.message.status === 404){
        console.log('wrong credentials')
      }
    })
    if (response.status === 200) {
      setUser(response.data.username);
      localStorage.setItem("token", response.data.token)
      api.defaults.headers.common[
        "Authorization"
      ] = `Token ${response.data.token}`;
      navigate("/")
    } else {
      alert('something went wrong')
    }
  }

  return (
      <>
      <h2>
          Login Page
      </h2>
      <img style={{width:'400px', height:'250px'}} src={SacredScrollsLogo}/>
      <Form onSubmit={(e)=>login(e)}>
            <FloatingLabel
            controlId="floatingInput"
            label="Username" 
            className="mb-3"
            >
                <Form.Control type="username" placeholder="name@example.com" onChange={(e)=>setUsername(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </FloatingLabel>
            <Button as="input" type="submit" value="Login"/>{' '}
        </Form>
        {"Don't have an account?"} {<Link to={'/register/'}>Click here</Link>} to register.
      </>
  )
}

export default LoginPage