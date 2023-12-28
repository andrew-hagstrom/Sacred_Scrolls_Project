import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import SacredScrollsLogo from '../Images/SacredScrollsBlackBackground.png'
import { api } from "../utilities/ApiUtilities.js"

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const {user, setUser} = useOutletContext()

    const createUser = async(e) => {
        e.preventDefault()
        let data = {
            "username": username,
            "email": email,
            "password": password,
        }
        let response = await api
            .post("user/signup/", data)
            .catch((err) => {
                console.log(err)
            })
        console.log(response)
        if (response.status === 201) {
            setUser(response.data.username)
            localStorage.setItem('token', response.data.token);
            api.defaults.headers.common[
                "Authorization"
            ] = `Token ${response.data.token}`
            navigate("/")
        } else {
            alert ('something happened')
        }
    }

    return (
        <>
        <h2>
            RegisterPage
        </h2>
        <img style={{width:'400px', height:'250px'}} src={SacredScrollsLogo}/>
        <Form onSubmit={(e)=>createUser(e)}>
        <FloatingLabel
            controlId="floatingInput"
            label="Username" 
            className="mb-3"
            >
                <Form.Control type="username" placeholder="" onChange={(e)=>setUsername(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Email address" 
            className="mb-3"
            >
                <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </FloatingLabel>
            <Button as="input" type="submit" value="Register"/>{' '}
        </Form>
        Already have an account? <Link to={'/login/'}>Click here</Link> to sign in.
        </>
    )
}

export default RegisterPage