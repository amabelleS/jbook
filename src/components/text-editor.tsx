import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
    const [value, setValue] = useState("**Hello world!!!**");
    return <div>
        <MDEditor
        value={value}
        // onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
}

export default TextEditor