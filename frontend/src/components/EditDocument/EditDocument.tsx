import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDocument.scss';

export function EditDocument(){

    interface document{
        title:string;
        description:string;
        content:string;
    }

    let {userNanoid} = useParams();
    let {documentId} = useParams();

    const navigate = useNavigate()
    
    const [saved, setSaved] = useState<any>();

    const [post, setPost] = useState({
        userNanoid:{userNanoid},
        title:'',
        description:'',
        content:''
    });




    useEffect(() => {

        axios.post<document>('http://localhost:3000/documents/getOne', {userNanoid: {userNanoid}, documentId: {documentId}})
            .then(res => {

                setPost({...post,
                    title: res.data.title,
                    description: res.data.description,
                    content: res.data.content
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
                <input type="text" name="title" placeholder="Title" value={post.title} onChange={handleChange}></input>
                
                <label htmlFor="desciption">Description</label>
                <input type="text" name="description" placeholder="Description" value={post.description} onChange={handleChange}></input>

                <Editor
                    id='textEditor'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
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