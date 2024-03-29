import {
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem, IonItemOption, IonItemOptions, IonItemSliding,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote, IonTitle, IonToolbar, useIonRouter,
} from '@ionic/react';

import {useLocation} from 'react-router-dom';
import {
    arrowForward,
    listCircle,
    trashOutline,
    trashSharp,
} from 'ionicons/icons';
import './Menu.css';
import {useNoteStore} from "@/stores/FileStore";
import styled from "@emotion/styled";
import {v4 as uuid} from 'uuid';
import {formatDistanceStrict} from 'date-fns';
import {useMemo} from "react";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

const StIonButton = styled(IonButton)`
    margin-bottom: 20px;
`

const Menu: React.FC = () => {
    const location = useLocation();
    const navigate = useIonRouter();
    const addNote = useNoteStore((s) => s.addNote);
    const deleteTheNote = useNoteStore((s) => s.deleteNote);
    const notes = useNoteStore((s) => s.notes);
    const state = useNoteStore();
    const notesToSort = [...state.notes];
    const sortedNotes = notesToSort.sort((a, b) => {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    });

    const addNewNote = () => {
        const id = uuid();
        const title = "New Note";
        const content = "";
        addNote(id, title, content);
        navigate.push(`/notes/${id}`);
    };
    const deleteNote = (id: string) => {
        deleteTheNote(id);
        navigate.push("/deleted");
    };
    const tagList = useMemo(() => {
        return uniq(flatten(notes.map((note) => note.tags)))
    }, [notes])

    return (
        <IonMenu contentId="main" type="push">
            <IonContent>
                <IonList id="inbox-list" inset={true}>
                    <IonListHeader>Notes</IonListHeader>
                    <IonMenuToggle autoHide={false}>
                        <StIonButton onClick={addNewNote}>New Note</StIonButton>
                    </IonMenuToggle>
                    {
                        sortedNotes.toReversed().map((note, index) => {
                            const timeSinceUpdate = formatDistanceStrict(note.updatedAt, new Date(), {
                                addSuffix: true
                            })

                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItemSliding>
                                        <IonItem className={location.pathname === `/notes/${note.id}` ? 'selected' : ''}
                                                 routerLink={`/notes/${note.id}`} routerDirection="none" detail={true}
                                                 lines={"inset"}>
                                            <IonLabel>
                                                <h2>{note.title}</h2>
                                                <p>{timeSinceUpdate}</p>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItemOptions slot="end">
                                            <IonItemOption color="danger" expandable={true}
                                                           onClick={() => deleteNote(`${note.id}`)}>
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
                        tagList.map((tag, index) => {
                            // const notesWithTag = note?.tags?.filter(
                            //     (t) => t === "hello"
                            // );
                            return (
                                <IonMenuToggle key={index} autoHide={false}>
                                    <IonItem className={location.pathname === `/tags/${tag}` ? 'selected' : ''}
                                            routerLink={`/tags/${tag}`} routerDirection="none" detail={true}>
                                        <IonIcon color="primary" slot="start" icon={listCircle} size="large"></IonIcon>
                                        <IonLabel>
                                            <h2>{tag}</h2>
                                        </IonLabel>
                                    </IonItem>
                                </IonMenuToggle>
                            )
                        })
                    }
                </IonList>

            </IonContent>
        </IonMenu>
    );
};

export default Menu;
