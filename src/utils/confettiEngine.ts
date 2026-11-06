import confetti from 'canvas-confetti';

export function fireConfettiExplosion(x = 0.5, y = 0.5) {
  // Pastel streamers & golden stars detonating upon lid release
  const count = 120;
  const defaults = {
    origin: { x, y },
    colors: ['#DDD6FE', '#F472B6', '#FDE047', '#A7F3D0', '#C084FC', '#FDA4AF']
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.4),
    spread: 60,
    startVelocity: 45
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 100,
    decay: 0.91,
    scalar: 1.2
  });

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    shapes: ['circle', 'square']
  });
}

export function fireGrandFinaleConfetti() {
  const duration = 2500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#DDD6FE', '#F472B6', '#FBBF24', '#60A5FA']
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#F472B6', '#C084FC', '#FDE047', '#34D399']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

export function fireHeartSparkles(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 30,
    spread: 70,
    origin: { x, y },
    colors: ['#F472B6', '#FDA4AF', '#E879F9'],
    scalar: 1.3
  });
}
