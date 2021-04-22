import './code-editor.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
// import codeShift from 'jscodeshift';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import {parse} from "@babel/parser";
import traverse from "@babel/traverse";


interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}


const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });


    // Minimal Babel setup for React JSX parsing:
      const babelParse = (code: any) => parse(code, {
        sourceType: "module",
        plugins: ["jsx"]
      });

      // Instantiate the highlighter    
    const defaultOptions = {
      parser: 'babel', // for reference only, only babel is supported right now
      isHighlightGlyph: true, // if JSX elements should decorate the line number gutter
      iShowHover: true, // if JSX types should  tooltip with their type info
      isUseSeparateElementStyles: true, // if opening elements and closing elements have different styling
      isThrowJSXParseErrors: false, // Only JSX Syntax Errors are not thrown by default when parsing, true will throw like any other parsign error
      };

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,
      babelParse,
      traverse,
      monacoEditor,
      defaultOptions
    );

      // Activate highlighting (debounceTime default: 100ms)
      monacoJSXHighlighter.highLightOnDidChangeModelContent(100);
      // Activate JSX commenting
      monacoJSXHighlighter.addJSXCommentCommand();
      // Done =)

    // highlighter.highLightOnDidChangeModelContent(
    //   () => {},
    //   () => {},
    //   undefined,
    //   () => {}
    // );
  };

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
