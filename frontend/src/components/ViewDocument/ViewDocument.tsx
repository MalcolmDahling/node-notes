import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IDocument } from '../../models/IDocument';
import './ViewDocument.scss';

export function ViewDocument(){

    let {userNanoid} = useParams();
    let {documentId} = useParams();

    const navigate = useNavigate();

    const [document, setDocument] = useState<any>();

    useEffect(() => {

        axios.post<IDocument[]>('http://localhost:3000/documents/getOne', {userNanoid: userNanoid, id: documentId})
            .then(res => {

                setDocument(

                    res.data.map((document:IDocument) => {

                        return(
                            <div key={document.id}>
                                <h2>{document.title}</h2>
                                <p className="description">{document.description}</p>
                                <p className="content" dangerouslySetInnerHTML={{ __html: document.content }}></p>
                            </div>
                        )
                    })
                );
                

            })
            .catch(err => console.error(err));
            
    }, []);


    
    function goBack(){
        navigate('/loggedIn');
    }



    return(
        <main>
            {document}
            
            <input type="button" value="Go back" onClick={goBack}></input>
        </main>
    );
}

