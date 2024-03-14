import {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
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

interface AppPage {
    url: string;
    iosIcon: string;
    mdIcon: string;
    title: string;
}

function noteId() {
    return Math.floor(Math.random() * Date.now()).toString(16);
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
        url: `/note/${noteId()}`,
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

const Menu: React.FC = () => {
    const location = useLocation();
    const addANote = useNoteStore((s) => s.addANote);
    const notes = useNoteStore((s) => s.notes)

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    <IonListHeader>Notes App</IonListHeader>
                    <Button onClick={addANote}>New Note</Button>
                    <p className={"mx-4 mb-2"}>{notes} notes</p>
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
