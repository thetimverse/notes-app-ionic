import {useNoteStore} from "@/stores/FileStore";
import {useMemo} from "react";
import {useParams} from "react-router";
import {
    IonButtons,
    IonCard, IonCardContent,
    IonCardHeader, IonCardTitle,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import './NotesList.css'
import { convert } from 'html-to-text';
import truncate from "lodash/truncate";

const NotesList : React.FC = () => {
    const notes = useNoteStore((s) => s.notes);
    const {tag} = useParams<{ tag: string }>();

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return note?.tags?.includes(tag)
        })
    }, [notes, tag])

    return (
        <IonPage>
            <IonHeader collapse="fade">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide={true}></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Notes</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Notes</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className={"notes-list"}>
                    {
                        filteredNotes.map((note, index) =>{
                            return (
                                <IonCard key={index} button={true} href={`/notes/${note.id}`}>
                                    <IonCardHeader>
                                        <IonCardTitle>{note.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        {
                                            truncate(convert(note.content), {
                                                'length': 230,
                                                'separator': /,? +/
                                            })
                                        }
                                    </IonCardContent>
                                </IonCard>
                            )
                        })
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NotesList