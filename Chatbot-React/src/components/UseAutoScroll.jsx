import { useRef, useEffect } from 'react'

export function UseAutoScroll(dependencies){
  const containerRef = useRef(null);

  useEffect(() =>{
    const containerElement = containerRef.current;
    if(containerElement) {
      // smooth transition of scrolling
      requestAnimationFrame(() =>{
        containerElement.scrollTo({
          top: containerElement.scrollHeight,
          behavior: 'smooth'
        });
      });
    };
  }, [dependencies]);

  return containerRef;
}