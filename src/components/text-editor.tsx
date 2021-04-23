import { useState, useEffect, useRef } from "react";
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null)
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("**Hello world!!!**");

   useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

    if (editing) {
        return <div ref={ref}>
            <MDEditor value={value}/>
        </div>
    }
    return <div onClick={() => setEditing(true)}>
        <MDEditor.Markdown source={value} />
    </div>
}

export default TextEditor