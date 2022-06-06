import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoggedIn.scss';

export function LoggedIn(){

    const navigate = useNavigate()



    const [documents, setDocuments] = useState();

    const LS = JSON.parse(localStorage.getItem('user') || '');

    useEffect(() => {

        axios.post('http://localhost:3000/documents/retrieve', {userNanoid: LS})
            .then(res => {

                console.log(res.data);
                

            })
            .catch(err => {
                console.error(err); 
            });

    }, [])












    function logout(){
        localStorage.removeItem('user');
        navigate('/');
    }

    function createNewDocument(){
        navigate('/createDocument');
    }


    return(
        <main>
            <h1>Welcome!</h1>

            <div>
                {documents}
            </div>

            <input type="button" value="Create New Document" onClick={createNewDocument}></input>
            <input type="button" value="Logout" onClick={logout}></input>
        </main>
    );
}