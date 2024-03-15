import './ExploreContainer.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css'
//import {useFileStore} from "@/stores/FileStore";
import {Directory, Encoding, Filesystem} from "@capacitor/filesystem";
import {Button} from "@/components/ui/button";
import {Autosave} from "@ckeditor/ckeditor5-autosave";
import {useNoteStore} from "@/stores/FileStore";
import {useParams} from "react-router";

interface ContainerProps {
    name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
    const updateContent = useNoteStore((s) => s.addNote);
    const { id } = useParams<{ id: string; }>();
    console.log(id);

    return (
        <div className="container">
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
                data="<p>Write here</p>"
                onReady={editor => {
                }}
                onChange={(event) => {
                    console.log(event);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                    const data = editor.getData();
                    const updatedAt = new Date().toISOString();
                    console.log(data);
                    updateContent(id, data, updatedAt);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
};

export default ExploreContainer;
