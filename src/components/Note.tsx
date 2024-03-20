import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css';
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";
import {IonButton, IonIcon, IonInput, IonItem} from "@ionic/react";
import React, {useEffect, useMemo, useState} from "react";
import {Tag} from "@/types";
import { TagsInput } from '@ark-ui/react'
import {closeOutline, closeSharp, trashOutline, trashSharp} from "ionicons/icons";

let nextId = 0;
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
    const [tags, setTags] = useState(note?.tags || []);
    const [tagName, setTagName] = useState('');

    const updateNote = () => {
        // let tagId = 0;
        // const currentTagIndex = note?.tags.findIndex((tag) => {
        //     return tag.id === tagId;
        // });
        // const updatedTags = {...tags[currentTagIndex]};
        // const newTags = [
        //     ...tags.slice(0, currentTagIndex),
        //     updatedTags,
        //     ...tags.slice(currentTagIndex + 1)
        // ];
        // setTags(newTags);
        updateContent(id, title, content, tags);
    };

    // function handleChange(index, property, value) {
    //     const new_working_hours = [...data.working_hours]; // copy the array
    //     const new_working_hour = { ...data.working_hours[index] }; // copy the array item to change
    //
    //     new_working_hour[property] = value; // set the new value
    //     new_working_hours[index] = new_working_hour; // assign the new item to the copied array
    //
    //     setData({ working_hours: new_working_hours }); // return a new data object
    // }

    useEffect(()=> {
        updateNote();
        console.log(tags);
        console.log(note?.tags);
    }, [id, title, content, tags]);

    return (
        <div className="container">
            <IonItem lines={"none"}>
                <IonInput label="Title" labelPlacement="floating"
                          onIonChange={(e: any) => setTitle(e.target.value)} value={title}
                ></IonInput>
            </IonItem>
            <div className={"tags-input"}>
                <TagsInput.Root>
                    {() => (
                        <>
                            <TagsInput.Control>
                                {tags.map((tag, index) => (
                                    <TagsInput.Item key={index} index={index} value={tag.name}>
                                        <TagsInput.ItemInput />
                                        <TagsInput.ItemText>{tag.name} </TagsInput.ItemText>
                                        <TagsInput.ItemDeleteTrigger><IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon></TagsInput.ItemDeleteTrigger>
                                    </TagsInput.Item>
                                ))}
                            </TagsInput.Control>
                            <TagsInput.Input placeholder="New tag" onChange={(e: any) => setTagName(e.target.value)} />
                        </>
                    )}
                </TagsInput.Root>
                <IonButton onClick={() => {
                    setTags([
                        ...tags,
                        { id: nextId++, name: tagName }
                    ])
                }}>Add tag</IonButton>
            </div>

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
                    setTags(tags);
                }}
                onFocus={() => {

                }}
            />
        </div>
    );
};

export default Note;
