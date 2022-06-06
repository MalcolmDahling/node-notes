import axios from 'axios';
import { FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

export function Home(){

    const navigate = useNavigate();

    const [loginFailed, setLoginFailed] = useState<any>('');
    const[post, setPost] = useState({username:'', password:''});


    //if already logged in, redirect.
    useEffect(() => {

        if(localStorage.getItem('user') != null){
            navigate('/loggedIn');
        }

    }, []);



    


    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setPost({...post, [e.target.name]: e.target.value});
    }


    function login(e:FormEvent){
        e.preventDefault();

        axios.post('http://localhost:3000/login', post)
            .then(res => {

                if(res.data == ""){
                    setLoginFailed(<p>Wrong email or password</p>);
                    setPost({username:'', password:''});

                    setTimeout(() => {
                        setLoginFailed('');
                    }, 2000)
                }

                else{
                    localStorage.setItem('user', JSON.stringify(res.data[0].nanoid));
                    navigate('/loggedIn')
                }

            })
            .catch(err => {
                console.error(err); 
            });
    }





    return(
        <>
            <form onSubmit={login}>
                <h1>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Username" className="inputField" required onChange={handleChange} value={post.username}></input>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="•••••" className="inputField" required onChange={handleChange} value={post.password}></input>

                <input type="submit" value="Login"></input>

                {loginFailed}
            </form>
        </>
    );
}