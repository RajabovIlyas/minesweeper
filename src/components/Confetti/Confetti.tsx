import ConfettiUI from 'react-confetti';
import { FC, memo, useEffect, useState } from 'react';


const Confetti: FC = () => {
  const [startConfetti, setStartConfetti] = useState(true);
  const width = window.innerWidth, height = window.innerHeight;

  useEffect(() => {
    setTimeout(() => setStartConfetti(false), 5000);

  }, []);


  return (
    <ConfettiUI
      width={width}
      height={height}
      recycle={startConfetti}
    />
  );
};

export default memo(Confetti);
