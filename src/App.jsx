import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import './App.css';

const scenes = [
  {
    id: 1,
    type: 'image',
    image: 'https://picsum.photos/seed/eum/1920/1080',
    title: '愛媛大学ミュージアムへようこそ',
    description: '地球と生命の46億年の歴史を、その手で感じてください。',
  },
  {
    id: 2,
    type: 'image',
    image: 'https://picsum.photos/seed/insects/1920/1080',
    title: '四国の昆虫標本',
    description: '地域固有の種から希少種まで、多様な昆虫の世界を探検します。',
  },
  {
    id: 7,
    type: 'image',
    image: 'https://picsum.photos/seed/dna/1920/1080',
    title: '生命の進化',
    description: '分子レベルから見る、生命の起源と進化の軌跡。',
  },
  {
    id: 3,
    type: 'image',
    image: 'https://picsum.photos/seed/fossils/1920/1080',
    title: '化石が語る物語',
    description: 'アンモナイトや三葉虫の化石から、太古の海の様子を紐解きます。',
  },
  {
    id: 4,
    type: 'image',
    image: 'https://picsum.photos/seed/minerals/1920/1080',
    title: '鉱物の結晶美',
    description: '自然が創り出した完璧な形状と、息をのむほどの色彩をご覧ください。',
  },
  {
    id: 5,
    type: 'image',
    image: 'https://picsum.photos/seed/plants/1920/1080',
    title: '瀬戸内の植物',
    description: '愛媛の豊かな自然が育んだ、美しい植物の標本を展示しています。',
  },
  {
    id: 6,
    type: 'image',
    image: 'https://picsum.photos/seed/info/1920/1080',
    title: 'ご利用案内',
    description: '開館時間: 10:00-16:30 (入館は16:00まで) / 休館日: 土日祝日',
  },
];

const SceneContent = ({ scene, active }) => {
  if (scene.type === 'video') {
    return (
      <video
        className="video-background"
        src={scene.video}
        autoPlay
        muted
        loop
        playsInline
        key={scene.id}
      />
    );
  }

  return (
    <motion.div
      className="ken-burns-image"
      style={{ backgroundImage: `url(${scene.image})` }}
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
  const [isFocused, setIsFocused] = useState(true);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

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
        {isFocused && (
        <svg className="marching-ants-svg">
          <rect width="100%" height="100%" />
        </svg>
      )}
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
          <SceneContent scene={scenes[index]} active={!isPaused} />
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
