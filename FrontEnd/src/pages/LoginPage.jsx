import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import { Link } from 'react-router-dom'


function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async(e) => {
    e.preventDefault()
    console.log(`email:${email} , password:${password}`)
    return
  }

  return (
      <>
      <h2>
          Login Page
      </h2>
      <Form onSubmit={(e)=>login(e)}>
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
            <Button as="input" type="submit" value="Login"/>{' '}
        </Form>
        Do not have an account? <Link to={'/register/'}>Click here</Link> to register.
      </>
  )
}

export default LoginPage