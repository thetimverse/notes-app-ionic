import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import Note from "@/components/Note";

const Page: React.FC = () => {
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
                <>
                <Note />
                </>
            </IonContent>
        </IonPage>
    );
};

export default Page;
