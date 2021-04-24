import { useEffect } from 'react';

import CodeEditor from './code-editor'
import Preview from './preview'
import {Cell} from '../state'
import {useActions} from '../hooks/use-actions'
import {useTypedSelector} from '../hooks/use-typed-selector'

import Resizable from './resizable'

interface CodeCellProps {
  cell: Cell
}
const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const {updateCell, createBundle} = useActions()
  const bundle = useTypedSelector(state => state.bundles[cell.id])
 
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content)
      return
    }

    const timer = setTimeout( async() => {
      createBundle(cell.id, cell.content)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle])

     
  return (
      <Resizable direction='vertical'>
    <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
      <Resizable direction='horizontal'>
      <CodeEditor 
      initialValue={cell.content}
      onChange= {(value) => {
        updateCell(cell.id, value)
      }} />
     </Resizable>
     {
       !bundle  || bundle.loading
        ? <div>Loading...</div>
        : <Preview err={bundle.err} code={bundle.code}/>
     }
      
    </div>
    </Resizable>
  );
};


export default CodeCell
