import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import './App.css';

const timelines = {
  timeline1: [
    { id: 1, type: 'image', image: 'https://picsum.photos/seed/timeline1-1/1920/1080', title: 'Timeline 1 - Scene 1', description: '地球、生命、そして私たち。46億年の時を超え、壮大な進化の物語が今、幕を開ける。無数の偶然と必然が織りなす奇跡の連鎖を、その目でご覧ください。最初の生命のささやきから、多様な種が花開く現在まで、驚きに満ちた発見の旅が、あなたを待っています。' },
    { id: 2, type: 'video', video: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Timeline 1 - Scene 2', description: 'This is a video scene.' },
  ],
  timeline2: [
    { id: 3, type: 'image', image: 'https://picsum.photos/seed/timeline2-1/1920/1080', title: 'Timeline 2 - Scene 1', description: 'かつてこの星を支配した、巨大な生物たちの時代。彼らはどのように生き、どのようにして姿を消したのか。化石として残された静かなる証言が、失われた世界の驚異と謎を力強く語りかけます。遥か太古の記憶を辿り、生命のダイナミズムを感じてみましょう。' },
    { id: 4, type: 'video', video: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Timeline 2 - Scene 2', description: 'This is a video scene.' },
  ],
  timeline3: [
    { id: 5, type: 'image', image: 'https://picsum.photos/seed/timeline3-1/1920/1080', title: 'Timeline 3 - Scene 1', description: '知恵と創造の光。人類が道具を手にし、文明を築き上げた軌跡は、挑戦と克服の歴史そのものです。芸術、科学、そして社会。私たちの祖先が未来へと託した、数々の偉大な遺産とその精神に触れることで、現代に続く文化の源流を紐解きます。' },
    { id: 6, type: 'video', video: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Timeline 3 - Scene 2', description: 'This is a video scene.' },
  ],
  timeline4: [
    { id: 7, type: 'image', image: 'https://picsum.photos/seed/timeline4-1/1920/1080', title: 'Timeline 4 - Scene 1', description: '過去から学び、未来を創造する。技術革新が加速する現代において、私たちはどこへ向かうのでしょうか。この展示は、生命と地球環境の持続可能性を問いかけます。過去の選択が現在を形作ったように、今の私たちの選択が未来を創るのです。' },
    { id: 8, type: 'video', video: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Timeline 4 - Scene 2', description: 'This is a video scene.' },
  ],
};

// HomeScreen no longer renders the outer div. It returns a fragment.
const HomeScreen = ({ onSelectTimeline, timelines }) => (
  <>
    <h1 className="home-title">物語を選択</h1>
    <div className="panel-container">
      {Object.keys(timelines).map((timelineId, index) => {
        const timeline = timelines[timelineId];
        const panelImage = timeline[0].type === 'image' ? timeline[0].image : ''; // Use first image as background
        return (
          <div
            key={timelineId}
            className="panel"
            onClick={() => onSelectTimeline(timelineId)}
            style={{ backgroundImage: `url(${panelImage})` }}
          >
            <div className="panel-overlay">
              <h2>Timeline {index + 1}</h2>
            </div>
          </div>
        );
      })}
    </div>
  </>
);

const TimelineIndicator = ({ total, current }) => (
  <div className="timeline-indicator">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className={`indicator-dot ${i === current ? 'active' : ''}`} />
    ))}
  </div>
);


const SceneContent = ({ scene, active, onVideoEnd }) => {
  if (scene.type === 'video') {
    return (
      <video
        className="video-background"
        src={scene.video}
        autoPlay
        muted
        playsInline
        key={scene.id}
        onEnded={onVideoEnd}
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
  const [currentTimeline, setCurrentTimeline] = useState(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(true);

  const handleSelectTimeline = (timelineId) => {
    setCurrentTimeline(timelineId);
    setSceneIndex(0);
  };

  const DURATION = 15; // Image scene duration
  const [direction, setDirection] = useState(1);

  const changeScene = (newDirection) => {
    if (!currentTimeline) return;

    const timeline = timelines[currentTimeline];
    const newIndex = sceneIndex + newDirection;

    if (newIndex < 0) {
      setCurrentTimeline(null);
    } else if (newIndex >= timeline.length) {
      setCurrentTimeline(null);
    } else {
      setSceneIndex(newIndex);
      setDirection(newDirection);
    }
  };

  const handleNextScene = useCallback(() => changeScene(1), [currentTimeline, sceneIndex]);
  const handlePrevScene = () => changeScene(-1);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        handleNextScene();
      } else if (event.key === 'ArrowLeft') {
        handlePrevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNextScene]);

  const bind = useGesture({
    onDrag: ({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (down && distance > window.innerWidth / 4) {
        const direction = xDir > 0 ? -1 : 1;
        changeScene(direction);
        cancel();
      }
    },
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

  const currentScene = currentTimeline ? timelines[currentTimeline][sceneIndex] : null;

  return (
    <div
      className="App"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {isFocused && (
        <svg className="marching-ants-svg">
          <rect width="100%" height="100%" />
        </svg>
      )}
      <AnimatePresence initial={false}>
        {!currentTimeline ? (
          <motion.div
            key="home"
            className="home-screen" // The className is now on the motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeScreen onSelectTimeline={handleSelectTimeline} timelines={timelines} />
          </motion.div>
        ) : (
          <motion.div
            key={sceneIndex}
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
            <TimelineIndicator total={timelines[currentTimeline].length} current={sceneIndex} />
            <SceneContent scene={currentScene} active={!isPaused} onVideoEnd={handleNextScene} />
            <div className="overlay">
              <h1 className="title">{currentScene.title}</h1>
              <p className="description">{currentScene.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {currentTimeline && (
        <>
          <button
            className="nav-button prev-button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevScene();
            }}
            aria-label="Previous Scene"
          />
          <button
            className="nav-button next-button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextScene();
            }}
            aria-label="Next Scene"
          />
          {currentScene.type === 'image' && (
            <ProgressBar
              key={currentTimeline + '-' + sceneIndex}
              duration={DURATION}
              isPaused={isPaused}
              onComplete={() => !isPaused && handleNextScene()}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
