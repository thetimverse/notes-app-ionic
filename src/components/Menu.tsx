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
import note from "@/components/Note";
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
        url: '/note',
        iosIcon: clipboardOutline,
        mdIcon: clipboardSharp
    },
    {
        title: 'New Note',
        url: `/note/:id`,
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
    const addANote = useNoteStore((s) => s.addANote);
    const navigate = useIonRouter();

    const addNewNote = () => {
        const id = uuid();
        addANote(id);
        navigate.push(`/notes/${id}`);
    };

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Notes App</IonListHeader>

                    <StIonButton onClick={addNewNote}>New Note</StIonButton>

                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
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
