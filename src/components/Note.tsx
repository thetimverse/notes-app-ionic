import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css';
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";
import {IonButton, IonIcon, IonInput, IonItem} from "@ionic/react";
import React, {useEffect, useMemo, useState} from "react";
import { TagsInput } from '@ark-ui/react'
import {closeOutline, closeSharp} from "ionicons/icons";

let nextId = 0;
const Note: React.FC = () => {
    const {id} = useParams<{ id: string; }>();
    const updateContent = useNoteStore((s) => s.updateNote);
    const deleteTheTag = useNoteStore((s) => s.deleteTag);
    const notes = useNoteStore((s) => s.notes);
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
        updateContent(id, title, content, tags);
    };

    const setNewTags = (newTagName: string) => {
        function f() {
            setTags([
                ...tags,
                { id: nextId++, name: newTagName, note: id }
            ])
        }
        f();
        return tags;
    };

    const deleteTag = (id: string, tagId: number) => {
        tags.find((tag)=>{
            return tag.id === tagId;
        });
        deleteTheTag(id, tagId);
        console.log(tagId, tags)
    }

    useEffect(()=> {
        updateNote();
        // deleteTag(id, tagId);
    }, [id, title, content, tags]);

    return (
        <div className="container">
            <IonItem lines={"none"}>
                <IonInput label="Title" labelPlacement="floating"
                          onIonChange={(e: any) => setTitle(e.target.value)} value={title}
                ></IonInput>
            </IonItem>
            <div className={"tags-input"}>
                <TagsInput.Root blurBehavior={"add"}>
                    {() => (
                        <>
                            <TagsInput.Control>
                                {
                                    tags.map((tag, index) => (
                                        <TagsInput.Item key={index} index={index} value={tag.name}>
                                            <TagsInput.ItemInput />
                                            <TagsInput.ItemText>{tag.name} </TagsInput.ItemText>
                                            <TagsInput.ItemDeleteTrigger onClick={()=> deleteTag(id, tag.id)}><IonIcon slot="icon-only" ios={closeOutline} md={closeSharp}></IonIcon></TagsInput.ItemDeleteTrigger>
                                        </TagsInput.Item>
                                    ))
                                }
                            </TagsInput.Control>
                            <TagsInput.Input placeholder="New tag" onChange={(e: any) => setTagName(e.target.value)} />
                        </>
                    )}
                </TagsInput.Root>
                <IonButton onClick={() => setNewTags(`${tagName}`)}>Add tag</IonButton>
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
                onBlur={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                }}
            />
        </div>
    );
};

export default Note;
