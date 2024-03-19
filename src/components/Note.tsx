import './ExploreContainer.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css';
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";
import {IonButton, IonInput, IonItem} from "@ionic/react";
import React, {useEffect, useMemo, useState} from "react";
import {Tag} from "@/types";

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
    const [tags, setTags] = useState([] as Array<Tag>|| []);
    const [tag, setTag] = useState([] as Array<Tag>|| []);
    const [tagName, setTagName] = useState('');
    const [tagId, setTagId] = useState('');
    let nextId = 0;

    const updateNote = () => {
        updateContent(id, title, content);
    };

    // const addTag = (tag, id) => {
    //     setTag((prev) => produce(prev, (draft) => {
    //         const index = draft.findIndex((el) => el.id === id)
    //         draft[index].tags.push(tag)
    //     }))
    // }

    // const handleMarkComplete = () => {
    //     let id = 0;
    //     // 1. Find the todo with the provided id
    //     const currentTodoIndex = tags.findIndex((tag) => tag.id === id);
    //     // 2. Mark the todo as complete
    //     const updatedTodo = {...tags[currentTodoIndex]};
    //     // 3. Update the todo list with the updated todo
    //     const newTodos = [
    //         ...tags.slice(0, currentTodoIndex),
    //         updatedTodo,
    //         ...tags.slice(currentTodoIndex + 1)
    //     ];
    //     setTags(newTodos);
    // };

    useEffect(()=> {
        updateNote();
        console.log(tags);
    }, [id, title, content, tags]);

    return (
        <div className="container">
            <IonItem lines={"none"}>
                <IonInput label="Title" labelPlacement="floating"
                          onIonChange={(e: any) => setTitle(e.target.value)} value={title}
                ></IonInput>
            </IonItem>
            <IonItem lines={"none"}>
                <IonInput label="Tags" labelPlacement="floating"
                          onIonChange={(e: any) => setTagName(e.target.value)} value={tagName}
                ></IonInput>
            </IonItem>
            <IonButton onClick={() => {
                setTags([
                    ...tags,
                    { id: nextId++, name: tagName }
                ])
            }}>New tag</IonButton>
            <CKEditor
                editor={ClassicEditor}
                config={{
                    toolbar: {
                        items: [
                            'undo', 'redo',
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
                    console.log(tags);
                }}
                onFocus={() => {

                }}
            />
        </div>
    );
};

export default Note;
