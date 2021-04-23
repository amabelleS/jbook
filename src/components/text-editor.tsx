import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("**Hello world!!!**");

    useEffect(() => {
        const listner = () => {
            setEditing(false)
        }
        document.addEventListener('click', listner, {capture: true})

        return () => {
            document.removeEventListener('click', listner, {capture: true})
        }
    }, [])

    if (editing) {
        return <div>
            <MDEditor value={value}/>
        </div>
    }
    return <div onClick={() => setEditing(true)}>
        <MDEditor.Markdown source={value} />
    </div>
}

export default TextEditor