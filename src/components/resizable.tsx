import { useEffect, useState } from 'react'
import './resizable.css'

// const ResizableBox = require('react-resizable').ResizableBox;
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHight] = useState(window.innerHeight)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth * 0.75)

  useEffect(() => {
    let timer: any;
    
    const listner = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHight(window.innerHeight)
        setInnerWidth(window.innerWidth)

        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75)
        }
    }, 100)
     
    }
    window.addEventListener('resize', listner)

    return () => {
      window.removeEventListener('resize', listner)
    }
  }, [])

  if (direction === 'horizontal') {
    resizableProps = {
    className: 'resize-horizontal',
    minConstraints:[innerWidth * 0.2, Infinity],
    maxConstraints: [innerWidth * 0.75, Infinity],
    height: Infinity, 
    width,
    resizeHandles: ['e'],
    onResizeStop: (event, data) => {
      setWidth(data.size.width)
      }
    }
  } else {
    resizableProps = {
    minConstraints:[Infinity, 24],
    maxConstraints: [Infinity, innerHeight * 0.9],
    height: 300, 
    width: Infinity,
    resizeHandles: ['s']
    }
  }

  return (
    <ResizableBox {...resizableProps} >
      {children}
    </ResizableBox>
  );
};

export default Resizable;