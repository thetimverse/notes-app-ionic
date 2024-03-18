import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import Note from "@/components/Note";
import {useNoteStore} from "@/stores/FileStore";

const Page: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Note />
            </IonContent>
        </IonPage>
    );
};

export default Page;
