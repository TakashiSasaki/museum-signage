import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import './App.css';

const timelines = {
  timeline1: [
    {
      id: 1,
      type: 'image',
      image: 'space.jpg',
      title: '宇宙・航空事業部',
      description: '当社の宇宙・航空事業部では、最先端の精密加工技術と新素材開発の知見を融合させ、次世代の衛星構造体やロケットエンジン部品の開発に取り組んでいます。過酷な宇宙環境に耐えうる超軽量・高強度のコンポーネントは、国内外の主要な宇宙プロジェクトで採用されており、人類のフロンティア拡大を技術で支えています。また、培った航空技術を活かし、eVTOL（空飛ぶクルマ）などの次世代都市交通インフラにおける基幹部品の供給を行い、空の移動の民主化と持続可能な空のインフラ構築に貢献しています。未来の空と宇宙を、当社の技術が繋ぎます。'
    },
    {
      id: 2,
      type: 'video',
      video: 'Artifficial-Satellite.mp4',
      title: '宇宙・航空事業部 - Vision',
      description: '広大なフロンティアへ向けた、当社の挑戦。'
    }
  ],
  timeline2: [
    {
      id: 3,
      type: 'image',
      image: 'bio.jpg',
      title: 'バイオ・ライフサイエンス事業部',
      description: '生命の神秘を工学の視点で紐解くバイオ・ライフサイエンス事業部では、ゲノム編集技術や幹細胞工学を応用した創薬支援プラットフォームの開発から、機能性新素材の創出まで幅広く手掛けています。当社の微細加工技術によって実現した高精度なバイオチップは、迅速な診断と効率的な治療計画の策定を可能にし、個別化医療の進展に寄与しています。また、バイオプラスチックや微生物を用いた環境浄化ソリューションの開発を通じて、人々の健康と地球の健全性を同時に守る「持続可能な豊かさ」の実現を目指しています。技術を通じて、生命の可能性を最大限に引き出します。'
    },
    {
      id: 4,
      type: 'video',
      video: 'Bio_Chip_Laser_Scan_Video.mp4',
      title: 'バイオ・ライフサイエンス - Tech',
      description: 'ナノレベルの精密さと、生命への敬意。'
    }
  ],
  timeline3: [
    {
      id: 5,
      type: 'image',
      image: 'robot.jpg',
      title: 'AI・ロボティクス開発本部',
      description: 'AI・ロボティクス開発本部では、ディープラーニングと高度なセンシング技術を統合し、自律的に状況を判断し行動する次世代産業用ロボットの開発を推進しています。人間と協調して働くコボット（協働ロボット）は、複雑な組立工程や物流現場での負荷を劇的に軽減し、生産性の向上と安全性の確保を高いレベルで両立させています。さらに、現場のビッグデータをリアルタイムで解析する産業用AIプラットフォームにより、故障の予兆検知やプロセスの自動最適化を実現。製造業のデジタルツイン化を強力にバックアップし、スマートファクトリーの未来を技術の力で切り拓いていきます。'
    },
    {
      id: 6,
      type: 'video',
      video: 'Robotic_Arm_Assembling_Circuit_Board.mp4',
      title: 'AI・ロボティクス - Innovation',
      description: '知能と物理の融合が、産業の形を変える。'
    }
  ],
  timeline4: [
    {
      id: 7,
      type: 'image',
      image: 'energy.jpg',
      title: 'グリーンエネルギー事業推進室',
      description: '気候変動問題の解決をミッションに掲げるグリーンエネルギー事業推進室は、再生可能エネルギーの主力電源化を目指し、次世代太陽電池や超大型風力発電機用コンポーネントの研究開発を行っています。特に、エネルギーを高効率で蓄える全固体電池技術や、水素製造・貯蔵システムの構築において、当社の触媒技術と材料工学が決定的な役割を果たしています。スマートグリッドによる電力需給の最適化ソリューションも展開し、カーボンニュートラルな社会の実現に向けたトータルエネルギーマネジメントを提供。クリーンなエネルギーが社会を巡る、循環型の未来を確かな技術力で描いています。'
    },
    {
      id: 8,
      type: 'video',
      video: 'Solar-Panel.mp4',
      title: 'グリーンエネルギー - Sustainable',
      description: '地球と共生する、新しいエネルギーの循環。'
    }
  ],
};

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
  const [currentTimeline, setCurrentTimeline] = useState('timeline1');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const DURATION = 15; // Image scene duration
  const [direction, setDirection] = useState(1);
  const timelineIds = Object.keys(timelines);

  const changeScene = (newDirection) => {
    if (!currentTimeline) return;

    const timeline = timelines[currentTimeline];
    const newIndex = sceneIndex + newDirection;

    if (newIndex < 0) {
      const currentTimelineIndex = timelineIds.indexOf(currentTimeline);
      const prevTimelineIndex = (currentTimelineIndex - 1 + timelineIds.length) % timelineIds.length;
      const prevTimelineId = timelineIds[prevTimelineIndex];
      setCurrentTimeline(prevTimelineId);
      setSceneIndex(timelines[prevTimelineId].length - 1); // last scene of prev
      setDirection(-1);
    } else if (newIndex >= timeline.length) {
      const currentTimelineIndex = timelineIds.indexOf(currentTimeline);
      const nextTimelineIndex = (currentTimelineIndex + 1) % timelineIds.length;
      const nextTimelineId = timelineIds[nextTimelineIndex];
      setCurrentTimeline(nextTimelineId);
      setSceneIndex(0); // first scene of next
      setDirection(1);
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
      <div className="main-content">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentTimeline + sceneIndex} // Ensure re-render on timeline change
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
            {currentScene && (
              <>
                <TimelineIndicator total={timelines[currentTimeline].length} current={sceneIndex} />
                <SceneContent scene={currentScene} active={!isPaused} onVideoEnd={handleNextScene} />
                <div className="overlay">
                  <h1 className="title">{currentScene.title}</h1>
                  <p className="description">{currentScene.description}</p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        {currentScene && (
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
      <div className="footer-banner">
        <div className="footer-content">
          <div className="footer-logo-section">
            <img src="museum-mark.png" alt="NEXUS Logo" className="footer-logo" />
            <div>
              <p className="footer-tagline">Museum of Science & Technology</p>
              <h2 className="footer-company-name">NEXUS</h2>
            </div>
          </div>
          <div className="footer-qr-section">
            <img src="qrcode.png" alt="QR Code" className="footer-qr-code" />
            <p className="footer-qr-text">Visit our Website</p>
          </div>
        </div>
        <button className="reload-button" onClick={() => window.location.reload()} aria-label="Reload Page">
          &#x21bb; 
        </button>
      </div>
    </div>
  );
}

export default App;
