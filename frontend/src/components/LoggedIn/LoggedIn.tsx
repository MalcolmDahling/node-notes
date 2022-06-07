import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoggedIn.scss';

export function LoggedIn(){

    const navigate = useNavigate()


    interface document{
        id:number;
        title:string;
        description:string;
        content:string;
    }
    


    const [documents, setDocuments] = useState();

    const LS = JSON.parse(localStorage.getItem('user') || '');

    useEffect(() => {

        axios.post('http://localhost:3000/documents/getAll', {userNanoid: LS})
            .then(res => {

                setDocuments(
                    res.data.map((document:document,) => {
                        return(
                            <Link to={"/editDocument/" + LS + "/" + document.id} className="document" key={document.id}>
                                <h2>{document.title}</h2>
                                <p>{document.description}</p>
                            </Link>
                        )
                    })
                );
                

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

            <div className="documentContainer">
                {documents}
            </div>

            <input type="button" value="Create New Document" onClick={createNewDocument}></input>
            <input type="button" value="Logout" onClick={logout}></input>
        </main>
    );
}