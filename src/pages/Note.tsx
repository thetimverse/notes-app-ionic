import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Note.css';
import {useParams} from "react-router";

const Note: React.FC = () => {
    let params = useParams();
    console.log(params)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Note</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ExploreContainer name="Tab 2 page"/>
            </IonContent>
        </IonPage>
    );
};

export default Note;
