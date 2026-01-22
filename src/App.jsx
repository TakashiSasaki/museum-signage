import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import './App.css';

const scenes = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1582215979946-857A441a4a3e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '愛媛大学ミュージアムへようこそ',
    description: '地球と生命の46億年の歴史を、その手で感じてください。',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1599511634901-d6a1310d6c6f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '四国の昆虫標本',
    description: '地域固有の種から希少種まで、多様な昆虫の世界を探検します。',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1623439976769-23473b98357f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '化石が語る物語',
    description: 'アンモナイトや三葉虫の化石から、太古の海の様子を紐解きます。',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1611628335239-2d83e223ee18?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '鉱物の結晶美',
    description: '自然が創り出した完璧な形状と、息をのむほどの色彩をご覧ください。',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1587321422791-1c409c9f2015?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '瀬戸内の植物',
    description: '愛媛の豊かな自然が育んだ、美しい植物の標本を展示しています。',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'ご利用案内',
    description: '開館時間: 10:00-16:30 (入館は16:00まで) / 休館日: 土日祝日',
  },
];

const KenBurnsImage = ({ src, active }) => {
  return (
    <motion.div
      className="ken-burns-image"
      style={{ backgroundImage: `url(${src})` }}
      initial={{ scale: 1, x: 0, y: 0 }}
      animate={active ? { scale: [1.1, 1], x: [10, -10], y: [-10, 10] } : {}}
      transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    />
  );
};

const ProgressBar = ({ duration, isPaused, onComplete }) => {
  return (
    <div className="progress-bar-container">
      <motion.div
        className="progress-bar"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: isPaused ? Infinity : duration, ease: 'linear' }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
};

function App() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const DURATION = 10;

  const handleNextScene = () => {
    setIndex((prevIndex) => (prevIndex === scenes.length - 1 ? 0 : prevIndex + 1));
  };
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNextScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel, memo = index }) => {
    if (down && distance > window.innerWidth / 4) {
      const direction = xDir > 0 ? -1 : 1;
      setIndex((prevIndex) => {
        const newIndex = prevIndex + direction;
        if (newIndex < 0) return scenes.length - 1;
        if (newIndex >= scenes.length) return 0;
        return newIndex;
      });
      cancel();
    }
    return memo;
  });

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(1);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex(index + newDirection);
  };
  
  return (
    <div
      className="App"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="scene"
          {...bind()}
          style={{ touchAction: 'none' }}
        >
          <KenBurnsImage src={scenes[index].image} active={!isPaused} />
          <div className="overlay">
            <h1 className="title">{scenes[index].title}</h1>
            <p className="description">{scenes[index].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <ProgressBar 
        key={index}
        duration={DURATION} 
        isPaused={isPaused}
        onComplete={() => !isPaused && handleNextScene()} 
      />
    </div>
  );
}

export default App;
