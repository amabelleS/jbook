import MonacoEditor from '@monaco-editor/react'

interface codeEditorProps  {
    initialValue: string;
    onChange(value: string): void;
} 


const codeEditor: React.FC<codeEditorProps> = ({onChange, initialValue}) => {
    
    const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
      monacoEditor.onDidChangeModelContent(() => {
       onChange(getValue())
     })
    }

    return <MonacoEditor 
    editorDidMount={onEditorDidMount}
    value= {initialValue}
    height="220px" 
    language="javascript" 
    theme="dark"
    options={{
        wordWrap: 'on',
        minimap: {enabled: false},
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true
    }}
    />
}

export default codeEditor