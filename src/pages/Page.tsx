import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import Note from "@/components/Note";
import {useNoteStore} from "@/stores/FileStore";

const Page: React.FC = () => {
    const { name } = useParams<{ name: string; }>();
    const notes = useNoteStore((s) => s.notes);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {
                    notes.map((note, index) => {
                        return <Note name={name} key={index} note={note}/>
                    })
                }
            </IonContent>
        </IonPage>
    );
};

export default Page;
