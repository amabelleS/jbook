import MonacoEditor from '@monaco-editor/react'

const codeEditor = () => {
    return <MonacoEditor 
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