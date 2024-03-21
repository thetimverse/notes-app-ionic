import {useNoteStore} from "@/stores/FileStore";
import {useMemo} from "react";
import {useParams} from "react-router";
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import Note from "@/components/Note";

const NotesList : React.FC = () => {
    const notes = useNoteStore((s) => s.notes);
    const {tag} = useParams<{ tag: string }>();

    const filteredNotes = useMemo(() => {
        return notes.filter((note) => {
            return note.tags.includes(tag)
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
                <div className={"container"}>
                    {
                        filteredNotes.map((note, index) =>{
                            return (
                                <h2 key={index}>{note.title}</h2>
                            )
                        })
                    }
                </div>
            </IonContent>
        </IonPage>
    )
}

export default NotesList