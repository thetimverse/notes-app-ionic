import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css';
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";
import {IonButton, IonIcon, IonInput, IonItem, useIonRouter} from "@ionic/react";
import React, {useEffect, useMemo, useState} from "react";
import {TagsInput} from '@ark-ui/react'
import {closeOutline, closeSharp, trashOutline, trashSharp} from "ionicons/icons";
import pull from "lodash/pull";
import cloneDeep from "lodash/cloneDeep";

const Note: React.FC = () => {
    const {id} = useParams<{ id: string; }>();
    const navigate = useIonRouter();
    const updateContent = useNoteStore((s) => s.updateNote);
    const deleteTheTag = useNoteStore((s) => s.deleteTag);
    const deleteTheNote = useNoteStore((s) => s.deleteNote);
    const notes = useNoteStore((s) => s.notes);
    const note = useMemo(() => {
        return notes.find((n) => {
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
                newTagName
            ])
        }
        f();
        return tags;
    };

    const deleteNote = (id: string) => {
        deleteTheNote(id);
        navigate.push("/deleted");
    };

    const deleteTag = (tag: string) => {
        deleteTheTag(tag);
        const newTags = cloneDeep(tags);
        pull(newTags, tag);
        setTags(newTags);
    }

    useEffect(() => {
        updateNote();
    }, [id, title, content, tags]);

    return (
        <div className="container">
            <>
                <div className={"controls"}>
                    <IonItem lines={"none"}>
                        <IonInput label="Title" labelPlacement="floating"
                                 onIonChange={(e: any) => setTitle(e.target.value)} value={title}
                        ></IonInput>
                    </IonItem>
                    <IonButton onClick={() => deleteNote(id)} color={"danger"}>
                        Delete note
                        <IonIcon slot="end" ios={trashOutline} md={trashSharp}></IonIcon>
                    </IonButton>
                </div>
                <div className={"tags-input"}>
                    <TagsInput.Root blurBehavior={"add"}>
                        {() => (
                            <>
                                <TagsInput.Control>
                                    {
                                        tags.map((tag, index) => (
                                            <TagsInput.Item key={index} index={index} value={tag}>
                                                <TagsInput.ItemText>{tag} </TagsInput.ItemText>
                                                <TagsInput.ItemDeleteTrigger
                                                    onClick={() => deleteTag(tag)}>
                                                    <IonIcon slot="icon-only"
                                                             ios={closeOutline}
                                                             md={closeSharp}></IonIcon>
                                                </TagsInput.ItemDeleteTrigger>
                                            </TagsInput.Item>
                                        ))
                                    }
                                </TagsInput.Control>
                                <TagsInput.Input placeholder="New tag"
                                                 onChange={(e: any) => setTagName(e.target.value)}/>
                            </>
                        )}
                    </TagsInput.Root>
                    <IonButton onClick={() => setNewTags(`${tagName}`)}>Add tag</IonButton>
                </div>

                {
                    typeof 'string' &&
                        <CKEditor
                            editor={ClassicEditor}
                            config={{
                                toolbar: {
                                    items: [
                                        'undo', 'redo',
                                        // '|', 'Heading',
                                        '|', 'bold', 'italic',
                                        '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                                    ]
                                },
                            }}
                            data={content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data);
                            }}
                        />
                }
            </>
        </div>
    );
};

export default Note;
