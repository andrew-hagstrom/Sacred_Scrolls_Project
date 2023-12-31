import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { useState} from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { api } from "../utilities/ApiUtilities"

function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const [wrongCredential, setWrongCredential] = useState(false)

    const {setUser} = useOutletContext()

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
                if (err.response.status===400){
                    localStorage.removeItem("token")
                    setWrongCredential(true)
                  }
            })

        if (response.status === 201) {
            setUser(response.data.email);
            localStorage.setItem("token", response.data.token);
            api.defaults.headers.common[
            "Authorization"
            ] = `Token ${response.data.token}`;
            navigate("/");
        } else {
            localStorage.clear()
            alert ('something happened')
        }
    }

    return (
        <>
        <div className='form-page'>
        <h1 className='form-page-headers' style={{top:'-20% '}}>Registration</h1>
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
            <Button className='form-buttons' as="input" variant='none' type="submit" value="Create Account"/>{' '}
        </Form>
        <div style={{color:'#FF000D', fontSize:'20px', alignSelf:'center', margin:'0px'}}>
        {wrongCredential ? 
        'Username or Email Already In Use.'
        :
        null
        }
        </div>
        <div style={{justifySelf:'center'}}>
            Already have an account? <Link to={'/login/'}>Click here</Link> to sign in.
        </div>
        </div>
        </>
    )
}

export default RegisterPage