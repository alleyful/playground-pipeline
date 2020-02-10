import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const getSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };

  const onResize = () => {
    setWindowSize(getSize());
  };

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };

    // eslint-disable-next-line
  }, []);

  return windowSize;
};

export default useWindowSize;
