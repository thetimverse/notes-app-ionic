import {
    IonButtons,
    IonContent,
    IonHeader,
    IonListHeader,
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
const StText = styled.h2`
    padding-left: 2em;
`

const Deleted: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <StTitle>Note successfully deleted!</StTitle>
                <StText>Write a new note now</StText>
            </IonContent>
        </IonPage>
    );
};

export default Deleted;