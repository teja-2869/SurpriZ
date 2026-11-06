import React from 'react';
import { motion } from 'motion/react';

interface ParticleStageProps {
  effects?: string[]; // 'confetti' | 'hearts' | 'petals' | 'sparkles'
  reducedMotion?: boolean;
}

export const ParticleStage: React.FC<ParticleStageProps> = ({
  effects = ['hearts', 'sparkles'],
  reducedMotion = false
}) => {
  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Hearts */}
      {effects.includes('hearts') && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              initial={{
                y: '105vh',
                x: `${15 + i * 15}vw`,
                opacity: 0,
                scale: 0.6 + (i % 3) * 0.2
              }}
              animate={{
                y: '-10vh',
                x: `${15 + i * 15 + (i % 2 === 0 ? 30 : -30)}px`,
                opacity: [0, 0.45, 0.6, 0]
              }}
              transition={{
                duration: 12 + i * 2.5,
                repeat: Infinity,
                delay: i * 2,
                ease: 'easeInOut'
              }}
              className="absolute text-xl"
            >
              {i % 2 === 0 ? '💜' : '🌸'}
            </motion.div>
          ))}
        </>
      )}

      {/* Twinkling Stardust Sparkles */}
      {effects.includes('sparkles') && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{
                top: `${10 + (i * 12) % 80}%`,
                left: `${5 + (i * 14) % 90}%`,
                scale: 0.2,
                opacity: 0
              }}
              animate={{
                scale: [0.2, 1, 0.2],
                opacity: [0, 0.7, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeInOut'
              }}
              className="absolute text-amber-300 text-sm select-none"
            >
              ✦
            </motion.div>
          ))}
        </>
      )}

      {/* Cascading Flower Petals */}
      {effects.includes('petals') && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`petal-${i}`}
              initial={{
                y: '-5vh',
                x: `${20 + i * 12}vw`,
                rotate: 0,
                opacity: 0
              }}
              animate={{
                y: '105vh',
                x: `${20 + i * 12 + Math.sin(i) * 50}px`,
                rotate: 360,
                opacity: [0, 0.5, 0.6, 0]
              }}
              transition={{
                duration: 14 + i * 2,
                repeat: Infinity,
                delay: i * 1.8,
                ease: 'linear'
              }}
              className="absolute text-rose-300 text-lg select-none"
            >
              🌸
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
};
