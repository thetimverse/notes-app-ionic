import './ExploreContainer.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css';
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";
import {IonInput, IonItem} from "@ionic/react";
import React, {useEffect, useMemo, useState} from "react";

const Note: React.FC = () => {
    const updateContent = useNoteStore((s) => s.updateNote);
    const notes = useNoteStore((s) => s.notes);
    const {id} = useParams<{ id: string; }>();
    const note = useMemo(() => {
        return notes.find((n)=> {
            return n.id === id;
        })
    }, [notes, id]);
    const [title, setTitle] = useState(note?.title || "New Note");
    const [content, setContent] = useState(note?.content || "");

    const updateNote = () => {
        updateContent(id, title, content);
    };
    useEffect(()=> {
        // setTitle(title);
        // setContent(content);
        updateNote();
    }, [id, title, content]);

    return (
        <div className="container">
            <IonItem>
                <IonInput label="Title" labelPlacement="floating"
                          onIonChange={(e: any) => setTitle(e.target.value)} value={title}></IonInput>
            </IonItem>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: {
                        items: [
                            'undo', 'redo',
                            '|', 'heading',
                            '|', 'bold', 'italic',
                            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                        ]
                    },
                }}
                data={content}
                onChange={() => {

                }}
                onBlur={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                }}
                onFocus={() => {

                }}
            />
        </div>
    );
};

export default Note;
