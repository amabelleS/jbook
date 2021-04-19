import MonacoEditor from '@monaco-editor/react'

const codeEditor = () => {
    return <MonacoEditor 
    height="220px" 
    language="javascript" 
    theme="dark"
    options={{
        wordWrap: 'on',
    }}
    />
}

export default codeEditor