import {
    IonButton,
    IonContent,
    IonIcon,
    IonItem, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote, useIonRouter,
} from '@ionic/react';

import {Route, useLocation} from 'react-router-dom';
import {
    archiveOutline,
    archiveSharp,
    bookmarkOutline,
    clipboardOutline, clipboardSharp,
    heartOutline,
    heartSharp, listCircle,
    mailOutline,
    mailSharp,
    paperPlaneOutline,
    paperPlaneSharp, pin, share, trash,
    trashOutline,
    trashSharp,
    warningOutline,
    warningSharp
} from 'ionicons/icons';
import './Menu.css';
import {useNoteStore} from "@/stores/FileStore";
import {Button} from "@/components/ui/button";
import Page from "@/pages/Page";
import styled from "@emotion/styled";
import { v4 as uuid } from 'uuid';
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import * as dayjs from 'dayjs';
import {format, formatDistanceStrict} from 'date-fns';

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

const appPages: AppPage[] = [
    {
        title: 'Note',
        url: '/notes',
        iosIcon: clipboardOutline,
        mdIcon: clipboardSharp
    },
    {
        title: 'New Note',
        url: `/notes/:id`,
        iosIcon: paperPlaneOutline,
        mdIcon: paperPlaneSharp
    },
    {
        title: 'Favorites',
        url: '/favorites',
        iosIcon: heartOutline,
        mdIcon: heartSharp
    },
    {
        title: 'Trash',
        url: '/trash',
        iosIcon: trashOutline,
        mdIcon: trashSharp
    },
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const StIonButton = styled(IonButton)`
    margin-left: 1em;
    margin-bottom: 20px;
`

const Menu: React.FC = () => {
    const location = useLocation();
    const addNote = useNoteStore((s) => s.addNote);
    const deleteTheNote = useNoteStore((s) => s.deleteNote);
    const notes = useNoteStore((s) => s.notes);
    const state = useNoteStore();
    const notesToSort = [...state.notes];
    const sortedNotes = notesToSort.sort((a,b) => {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    });
    const {id} = useParams<{ id: string; }>();
    const note = useMemo(() => {
        return notes.find((n)=> {
            return n.id === id;
        })
    }, [notes, id]);
    const navigate = useIonRouter();

    const addNewNote = () => {
        const id = uuid();
        const updatedAt = new Date().toISOString();
        const title = "New Note";
        const content = "";
        addNote(id, title, content, updatedAt);
        navigate.push(`/notes/${id}`);
    };
    const deleteNote = () => {
        deleteTheNote(id);
        navigate.push("/deleted");
    };

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list" inset={true}>
                    <IonListHeader>Notes App</IonListHeader>

                    <StIonButton onClick={addNewNote}>New Note</StIonButton>
                    {
                        sortedNotes.toReversed().map((note, index) => {
                            const timeSinceUpdate = formatDistanceStrict(note.updatedAt, new Date(), {
                                addSuffix: true
                            })

                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItemSliding>
                                        <IonItem className={location.pathname === `/notes/${note.id}` ? 'selected' : ''} routerLink={`/notes/${note.id}`} routerDirection="none" detail={true} lines={"inset"}>
                                            <IonLabel>
                                                <h2>{ note.title }</h2>
                                                <p>{ timeSinceUpdate }</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItemOptions slot="end">
                                            <IonItemOption color="danger" expandable={true} onClick={deleteNote}>
                                                <IonIcon slot="icon-only" ios={trashOutline} md={trashSharp}></IonIcon>
                                            </IonItemOption>
                                        </IonItemOptions>
                                    </IonItemSliding>
                                </IonMenuToggle>
                            );
                        })
                    }
                </IonList>

                <IonList inset={true} id="labels-list">
                    <IonListHeader>Tags</IonListHeader>
                    {
                        sortedNotes?.map((note, index) => {
                            return (
                                note?.tags?.map((tag, index) => {
                                    return (
                                        <IonItem button={true} key={index} className={location.pathname === `/notes/${tag.note}` ? 'selected' : ''} routerLink={`/notes/${tag.note}`}>
                                            <IonIcon color="danger" slot="start" icon={listCircle} size="large"></IonIcon>
                                            <IonLabel>{tag.name}</IonLabel>
                                            <IonNote slot="end">
                                                {
                                                    note?.tags?.length
                                                }
                                            </IonNote>
                                        </IonItem>
                                    )
                                })
                            )
                        })
                    }
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
