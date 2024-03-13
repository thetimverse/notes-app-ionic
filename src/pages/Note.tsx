import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Note.css';
import {useParams} from "react-router";
import styled from "@emotion/styled";
import {useBearStore} from '../stores/FileStore'

const StIonContent = styled(IonContent)`
    --padding-start: 2em;
    --padding-top: 2em;
    --background: darkgray;
`

const Note: React.FC = () => {
    let params = useParams();
    console.log(params)
    const { bears, addABear } = useBearStore()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Note</IonTitle>
                </IonToolbar>
            </IonHeader>
            <StIonContent fullscreen>
                <div className="container">
                    <strong>Note</strong>
                    <p>Write here</p>
                    <div>
                        <span>{bears}</span>
                        <button onClick={addABear}>one up</button>
                    </div>
                </div>
            </StIonContent>
        </IonPage>
    );
};

export default Note;
