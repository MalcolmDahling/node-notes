import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IDocument } from '../../models/IDocument';
import './EditDocument.scss';

export function EditDocument(){

    let {userNanoid} = useParams();
    let {documentId} = useParams();

    const navigate = useNavigate();
    
    const [saved, setSaved] = useState<any>('');

    const [post, setPost] = useState({
        id:0,
        userNanoid:userNanoid,
        title:'',
        description:'',
        content:''
    });




    

    useEffect(() => {

        axios.post<IDocument[]>('http://localhost:3000/documents/getOne', {userNanoid: userNanoid, id: documentId})
            .then(res => {     

                setPost({...post,
                    id: res.data[0].id,
                    title: res.data[0].title,
                    description: res.data[0].description,
                    content: res.data[0].content
                });

            })
            .catch(err => console.error(err));

    }, []);









    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setPost({...post, [e.target.name]: e.target.value});
    }

    const editorRef:any = useRef(null);

    function handleChangeEditor(e:any){
        setPost({...post, content: e});
    }


    function save(){
        axios.post('http://localhost:3000/documents/update', post)
            .then(res => {

                if(res.data == 'OK'){

                    setSaved(
                        <div className="saved">
                            <h2>Document saved</h2>
                        </div>
                    );
            
                    setTimeout(() => {
                        setSaved('');
                    }, 2000);
                }
                

            })
            .catch(err => console.error(err));   
    }








    function goBack(){
        navigate('/loggedIn');
    }







    return(
        <>
            {saved}

            <main>

                <h1>Edit Document</h1>

                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder="Title" maxLength={32} value={post.title} onChange={handleChange}></input>
                
                <label htmlFor="desciption">Description</label>
                <input type="text" name="description" placeholder="Description" maxLength={64} value={post.description} onChange={handleChange}></input>

                <Editor
                    id='textEditor'
                    onInit={(evt, editor) => editorRef.current = editor}
                    value={post.content}
                    init={{
                    height: 500,
                    menubar: false,
                    // plugins: [
                    //     'advlist autolink lists link image charmap print preview anchor',
                    //     'searchreplace visualblocks code fullscreen',
                    //     'insertdatetime media table paste code help wordcount'
                    // ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}'
                    }}
                    onEditorChange={handleChangeEditor}
                />

                <input type="button" value="Save" onClick={save}></input>
                <input type="button" value="Go back" onClick={goBack}></input>  
            </main>
        </>
    );
}