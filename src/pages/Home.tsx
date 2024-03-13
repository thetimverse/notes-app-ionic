import {IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {Button} from "@/components/ui/button";
import styled from "@emotion/styled";
import {Route} from "react-router-dom";
import Note from "@/pages/Note";

const StIonContent = styled(IonContent)`
    display: flex;
    align-items: center;
    justify-content: center;
    --padding-start: 2em;
    --padding-top: 2em;
    --background: darkgray;
`
const StContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2em;
    gap: 20px;
`
const Home: React.FC = () => {
    function noteId() {
        return Math.floor(Math.random() * Date.now()).toString(16);
    }
    console.log(noteId())

    return (
        <IonPage>
            <StIonContent>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle size="large">Home</IonTitle>
                    </IonToolbar>
                    <IonToolbar>
                        <IonSearchbar animated={true} placeholder="Animated" showClearButton="always" autocapitalize={"yes"} color={"light"}></IonSearchbar>
                    </IonToolbar>
                </IonHeader>

                <StContent>
                    <h1>Titre</h1>
                    <Button>
                        <a href={`/note/${noteId()}`}>New Note</a>
                    </Button>
                </StContent>

            </StIonContent>
        </IonPage>
    );
};

export default Home;
