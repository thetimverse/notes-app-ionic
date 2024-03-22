import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Deleted.css';
import styled from "@emotion/styled";

const StTitle = styled.h2`
    padding: 2em;
    font-size: 18px;
`

const Deleted: React.FC = () => {
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
                <div className="container">
                    <StTitle>Note successfully deleted!</StTitle>
                    <p>Write a new note</p>
                </div>
            </IonContent>
        </IonPage>
);
};

export default Deleted;
