import React, {useState} from "react"
import {Form, Container} from 'react-bootstrap'
import FormGroup from "../Components/Forms/FormGroup"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import {create} from '../Services/UserServices'

function RegisterPages() {
    const [form,setForm]=useState({name:'',email:'',password:''});
    const [loading,setLoading] = useState(false);
    const handleChange = (e)=>{ //e = elemento sobre el que se modifica/escribe
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }
    
    const handleSubmit = (e)=>{
        setLoading(true)
        create(form)
        .then(data=>{
            console.log("Data",data)
            setLoading(false)
        },
        error=>{
            console.log("error",error)
            setLoading(false)
        })
        e.preventDefault()
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormGroup label="Name" type="text" placeholder="Enter your name" name="name" value={form.name} change={handleChange}/>           
                <FormGroup label="Email" type="email" placeholder="Enter your email" name="email" value={form.email} change={handleChange}/>                
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
                <FormGroup label="Password" type="password" placeholder="Enter your password" name="password" value={form.password} change={handleChange}/>
                <ButtonWithLoading text="Register" loading={loading} onClick="handleSubmit"/>
            </Form>
        </Container>
    )
}

export default RegisterPages;