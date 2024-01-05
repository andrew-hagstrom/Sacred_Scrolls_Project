import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import { Link, useOutletContext } from 'react-router-dom'
import LogoWithoutText from '../Images/LogoWithoutText.png'
import { api } from "../utilities/ApiUtilities"
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const {setUser} = useOutletContext()
  const navigate = useNavigate()

  const login = async(e) => {
    e.preventDefault()
    let response = await api
    .post("user/login/", {
      username: username,
      password: password
    })
    .catch((err)=>{
      if (err.message.status === 401){
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
      localStorage.clear()
      alert('something went wrong')
    }
  }

  return (
      <>
      <div className='form-page'>
      <h1 className='form-page-headers'>Sign In</h1>
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
            <Button className='form-buttons' as="input" type="submit" value="Login"/>{' '}
        </Form>
        <div style={{justifySelf:'center'}}>
        {"Don't have an account?"} {<Link to={'/register/'}>Click here</Link>} to register.
        </div>
      </div>

      </>
  )
}

export default LoginPage