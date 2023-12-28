import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import { Link } from 'react-router-dom'
import SacredScrollsLogo from '../Images/SacredScrollsBlackBackground.png'

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const createUser = async(e) => {
        e.preventDefault()
        console.log(`email:${email} , password:${password}`)
        alert('function not done yet goober')
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