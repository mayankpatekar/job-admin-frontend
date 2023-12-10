import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const loginForm = async () => {
        try {
            console.log(email, pass);
            const response = await fetch('http://localhost:5002/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    pass: pass
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const { token,message } = data;
                localStorage.setItem(`Token`, token);
                alert(message);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email,pass,userType);
        loginForm();
    }

    useEffect(()=>{
        if(localStorage.getItem("Token")){
            navigate("/")
        }else{

        }
    })

  return (
    <main>
            <div className='bg-slate-200 h-screen grid place-content-center'>
                <form onSubmit={handleSubmit} className="max-w-md bg-white p-4 rounded-sm">

                    <h1 className='font-bold text-3xl pb-3 pt-3'>Login</h1>
                    <div className='pb-3 pt-3'>
                        <input className="border-2 rounded-lg p-2" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter email' type='email' />
                    </div>
                    <div className='pb-3 pt-3'>
                        <input className="border-2 rounded-lg p-2" value={pass} onChange={(e) => { setPass(e.target.value) }} placeholder='Enter password' type='password' />
                    </div>
                    
                    <div className='pt-2 pb-2 w-full text-left '><Link className='text-blue-700 hover:text-blue-950' to="/forgetpassword">
                        Forgot password ?
                    </Link>
                    </div>
                    <div className='pt-2 pb-2 w-full text-left '><Link className='text-blue-700 hover:text-blue-950' to="/register">
                        New here ?
                    </Link>
                    </div>
                    <div>
                        <button type='submit' className="bg-sky-500 w-full text-white p-2 rounded-lg hover:bg-sky-950">Login</button>
                    </div>

                </form>
            </div>
        </main>
  )
}

export default LoginPage