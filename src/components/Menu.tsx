import {
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
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
    heartSharp,
    mailOutline,
    mailSharp,
    paperPlaneOutline,
    paperPlaneSharp,
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
    const navigate = useIonRouter();

    const addNewNote = () => {
        const id = uuid();
        const updatedAt = new Date().toISOString();
        addNote(id, updatedAt);
        navigate.push(`/notes/${id}`);
    };

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Notes App</IonListHeader>

                    <StIonButton onClick={addNewNote}>New Note</StIonButton>
                    {
                        notes.map((note, index) => {
                            const deleteNote = () => {
                                console.log("note deleted")
                                deleteTheNote(`${note.id}`);
                            };

                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItem className={location.pathname === note.id ? 'selected' : ''} routerLink={`/notes/${note.id}`} routerDirection="none" lines="none" detail={false}>
                                        <IonLabel>{note.id}</IonLabel>
                                        <IonIcon aria-hidden="true" slot="end" ios={clipboardOutline} md={clipboardSharp} />
                                        <IonButton onClick={deleteNote}>
                                            <IonIcon aria-hidden="true" slot="end" ios={trashOutline} md={trashSharp}  />
                                        </IonButton>
                                    </IonItem>
                                </IonMenuToggle>
                            );
                        })
                    }
                </IonList>

                <IonList id="labels-list">
                    <IonListHeader>Tags</IonListHeader>
                    {labels.map((label, index) => (
                        <IonItem lines="none" key={index}>
                            <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
                            <IonLabel>{label}</IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    );
};

export default Menu;
