import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../../fasteats.png'
import { AuthContext } from '../../utils/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);

    const [outletCode, setOutletCode] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Move the useNavigate hook outside of the handleSubmit function

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(outletCode, password);
        await login(outletCode, password);
        navigate('/'); // Use the navigate function directly
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            navigate('/');
        }
    });

    return (
        <div className={styles.login}>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Outlet Code</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Outlet Code" 
                        value={outletCode} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOutletCode(e.target.value)} 
                        className={styles.formControl}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className={styles.formGroup}>
                    <Form.Label className={styles.formLabel}>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
                        className={styles.formControl}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className={styles.btnPrimary}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login;
