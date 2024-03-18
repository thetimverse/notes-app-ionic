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
    const updateNote = (id: string, title: string | undefined, content: string | undefined) => {
        const updatedAt = new Date().toISOString();
        updateContent(id, title, content, updatedAt);
        console.log(updateContent);
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
                    
                }}
                onChange={(event) => {

                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                    const data = editor.getData();
                    const updatedAt = new Date().toISOString();
                    const title = getTitle("newTitle");

                    console.log(data);
                    updateContent(id, title, data, updatedAt);
                    updateNote(id, title, data);
                    console.log(updateContent);
                }}
                onFocus={(event, editor) => {

                }}
            />
        </div>
    );
};

export default Note;
