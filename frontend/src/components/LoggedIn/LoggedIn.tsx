import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoggedIn.scss';

export function LoggedIn(){

    const navigate = useNavigate()


    interface IDocument{
        id:number;
        title:string;
        description:string;
        content:string;
    }
    


    const [documents, setDocuments] = useState<any>('You have no documents, try creating a new one!');

    const LS = JSON.parse(localStorage.getItem('user') || '');

    useEffect(() => {
        getAll();
    }, []);



    function getAll(){

        axios.post('http://localhost:3000/documents/getAll', {userNanoid: LS})
            .then(res => {

                if(res.data[0]){

                    setDocuments(

                        res.data.map((document:IDocument, i:number) => {

                            return(
                                <div className="document" key={document.id}>
                                    <h2>{document.title}</h2>
                                    <p>{document.description}</p>

                                    <div className="buttonContainer">
                                        <Link to={"/viewDocument/" + LS + "/" + document.id} className="documentButton">View</Link>
                                        <Link to={"/editDocument/" + LS + "/" + document.id} className="documentButton">Edit</Link>
                                        <input type="button" value="Delete" className="documentButton" id={document.id.toString()} onClick={deleteDocument}></input>
                                    </div>
                                    
                                </div>
                            )
                        })
                    );
                }

                else{
                    setDocuments('You have no documents, try creating a new one!');
                }
                

            })
            .catch(err => {
                console.error(err); 
            });
    }




    function deleteDocument(e:any){

        axios.post('http://localhost:3000/documents/delete', {userNanoid:LS, id:e.target.id})
            .then(res => {

                if(res.data == 'OK'){
                    getAll();
                }
            })
            .catch(err => console.error(err));
    }





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