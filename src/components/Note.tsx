import './ExploreContainer.css';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './Note.css'
import {useFileStore} from "@/stores/FileStore";

interface ContainerProps {
    name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
    const note = useFileStore((state) => state.content)
    const updateNoteData = useFileStore((state) => state.updateData)
    let date = useFileStore(state => state.date)

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
                    }
                }}
                data="<p>Write here</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event) => {
                    console.log(event);
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                    const data = editor.getData();
                    date = new Date();
                    console.log(data);
                    console.log(date);
                    //updateNoteData(data);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
};

export default ExploreContainer;
