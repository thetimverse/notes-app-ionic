import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import Note from "@/components/Note";
import {useNoteStore} from "@/stores/FileStore";

const Page: React.FC = () => {
    const newTitle = (title: string) => {
        return title;
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        {
                            //newTitle()
                        }
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">{
                            //newTitle()
                        }</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <Note />
            </IonContent>
        </IonPage>
    );
};

export default Page;
