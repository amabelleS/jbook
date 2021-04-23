import './preview.css'
import {useEffect, useRef} from 'react';

interface PreviewProps {
    code: string;
    err: string
}

const html = `
    <html>
    <head>
    <style>html {background-color: white;}</style>
    </head>
    <body>
    <div id="root"></div>
    <script>
    const handelError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red; background-color: yellow; padding: 0.5rem"><h4>Runtime Error</h4>' + err + '</div>'
      console.error(err)
    }
     window.addEventListener('error', (event) => {
       event.preventDefault()
      handelError(event.error)
     })
    window.addEventListener('message', event => {
      try {
         eval(event.data)
      } catch (err) {
        handelError(err)
      }
     
    }, false)
    </script>
    </body>
    </html>
    `

const Preview: React.FC<PreviewProps> = ({code, err}) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html
        setTimeout(() => {
          iframe.current.contentWindow.postMessage(code, '*')
        }, 50)
    }, [code])

    console.log(err);
    
       return (
        <div className="preview-wrapper">
        <iframe 
          title="preview" 
          ref={iframe} 
          sandbox="allow-scripts" 
          srcDoc={html}
        />
        {err && <div className='preview-error'>{err}</div>}
        </div>
      );
}

export default Preview