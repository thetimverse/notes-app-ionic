import './ExploreContainer.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css';
import {Button} from "@/components/ui/button";
import {Autosave} from "@ckeditor/ckeditor5-autosave";
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";
import {IonButton, IonInput, IonItem} from "@ionic/react";

interface ContainerProps {
    name: string;
    // TODO: what is the correct way to write this?
    note: NoteState["notes"];
}

const Note: React.FC<ContainerProps> = ({name, note}) => {
    const updateContent = useNoteStore((s) => s.updateNote);
    const {id} = useParams<{ id: string; }>();

    const getTitle = (title: string) => {
        return title;
    }
    const updateNote = () => {
        const updatedAt = new Date().toISOString();
        const title = getTitle("title");
        const content = "Hello";

        updateContent(id, title, content, updatedAt);
        console.log(title);
    }

    return (
        <div className="container">
            <IonItem>
                <IonInput label="Title" labelPlacement="floating"
                          onIonChange={(e: any) => getTitle(e.target.value)}></IonInput>
            </IonItem>
            <CKEditor

                editor={ClassicEditor}
                config={{
                    toolbar: {
                        items: [
                            'undo', 'redo',
                            '|', 'heading',
                            '|', 'bold', 'italic',
                            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                        ]
                    },
                }}
                data={`${note.content}`}
                onReady={editor => {
                    console.log(note.content)
                }}
                onChange={(event) => {

                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                    const data = editor.getData();
                    const updatedAt = new Date().toISOString();
                    console.log(data);
                    updateContent(id, data, updatedAt);
                    console.log(updateContent);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <IonButton onClick={updateNote}>Update content</IonButton>
        </div>
    );
};

export default Note;
